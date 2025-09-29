// services/gmailService.ts

import { google } from 'googleapis';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!)

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
);

export async function processGmailMessages(userId: string) {
  try {
    // Get the user's Gmail connection
    const { data: connection, error } = await supabase
      .from('connections')
      .select('credentials')
      .eq('user_id', userId)
      .eq('type', 'gmail')
      .single();

    if (error || !connection) {
      throw new Error('Gmail connection not found');
    }

    oauth2Client.setCredentials(connection.credentials as any);

    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

    // Fetch the list of messages
    const res = await gmail.users.messages.list({
      userId: 'me',
      q: 'is:unread', // Process only unread messages
    });

    const messages = res.data.messages;
    if (!messages || messages.length === 0) {
      console.log('No new messages to process.');
      return;
    }

    for (const message of messages) {
      const msg = await gmail.users.messages.get({
        userId: 'me',
        id: message.id!,
      });

      const { snippet, id, internalDate } = msg.data;
      const subject = msg.data.payload?.headers?.find(h => h.name === 'Subject')?.value || '';

      // TODO: Implement task extraction logic here
      console.log(`Processing email: ${subject}`);

      // Mark the message as read
      await gmail.users.messages.modify({
        userId: 'me',
        id: message.id!,
        requestBody: {
          removeLabelIds: ['UNREAD'],
        },
      });
    }
  } catch (error) {
    console.error('Error processing Gmail messages:', error);
  }
}
