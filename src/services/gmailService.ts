// services/gmailService.ts

import { google } from 'googleapis';
import { createClient } from '@supabase/supabase-js';
import { extractTasksFromMessage } from './taskExtractionService';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
);

/**
 * Processes Gmail messages for a user and extracts tasks
 */
export async function processGmailMessages(userId: string) {
  try {
    console.log(`Processing Gmail messages for user ${userId}`);
    
    // Get the user's Gmail connection
    const { data: connection, error } = await supabase
      .from('connections')
      .select('credentials')
      .eq('user_id', userId)
      .eq('type', 'gmail')
      .single();

    if (error || !connection) {
      console.error('Gmail connection not found:', error);
      throw new Error('Gmail connection not found');
    }

    oauth2Client.setCredentials(connection.credentials as any);

    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

    // Fetch the list of messages
    const res = await gmail.users.messages.list({
      userId: 'me',
      q: 'is:unread', // Process only unread messages
      maxResults: 10, // Limit to 10 messages at a time
    });

    const messages = res.data.messages;
    if (!messages || messages.length === 0) {
      console.log('No new messages to process.');
      return;
    }

    console.log(`Found ${messages.length} unread messages`);

    for (const message of messages) {
      try {
        const msg = await gmail.users.messages.get({
          userId: 'me',
          id: message.id!,
          format: 'full',
        });

        const { snippet, id, internalDate } = msg.data;
        const headers = msg.data.payload?.headers || [];
        const subject = headers.find(h => h.name === 'Subject')?.value || '';
        const from = headers.find(h => h.name === 'From')?.value || '';
        const to = headers.find(h => h.name === 'To')?.value || '';
        
        // Extract email body
        let body = '';
        if (msg.data.payload?.parts) {
          // Multipart message
          for (const part of msg.data.payload.parts) {
            if (part.mimeType === 'text/plain' && part.body?.data) {
              body += Buffer.from(part.body.data, 'base64').toString('utf-8');
            }
          }
        } else if (msg.data.payload?.body?.data) {
          // Simple message
          body = Buffer.from(msg.data.payload.body.data, 'base64').toString('utf-8');
        }

        // If no body was found, use the snippet
        if (!body) {
          body = snippet || '';
        }

        // Combine subject and body for better context
        const content = `Subject: ${subject}\n\n${body}`;
        
        // Create a link to the message in Gmail
        const messageId = message.id!;
        const sourceLink = `https://mail.google.com/mail/u/0/#inbox/${messageId}`;
        
        // Extract tasks from the message
        await extractTasksFromMessage(userId, {
          content,
          source: 'gmail',
          sourceId: messageId,
          sourceLink,
          timestamp: new Date(parseInt(internalDate || '0')),
          sender: from,
          recipient: to,
        });

        // Mark the message as read
        await gmail.users.messages.modify({
          userId: 'me',
          id: message.id!,
          requestBody: {
            removeLabelIds: ['UNREAD'],
          },
        });
        
        console.log(`Processed email: ${subject}`);
      } catch (error) {
        console.error(`Error processing message ${message.id}:`, error);
      }
    }
  } catch (error) {
    console.error('Error processing Gmail messages:', error);
  }
}
