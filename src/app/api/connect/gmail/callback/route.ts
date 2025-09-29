// pages/api/connect/gmail/callback.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!)

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `${process.env.NEXT_PUBLIC_BASE_URL}/api/connect/gmail/callback`
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { code, state } = req.query;
  const userId = state as string;

  try {
    const { tokens } = await oauth2Client.getToken(code as string);
    oauth2Client.setCredentials(tokens);

    // Store the tokens in the database
    const { error } = await supabase.from('connections').insert({
      user_id: userId,
      type: 'gmail',
      credentials: tokens,
      status: 'active',
    });

    if (error) throw error;

    res.redirect('/dashboard'); // Redirect to a success page
  } catch (error) {
    console.error('Error getting Gmail tokens:', error);
    res.status(500).json({ error: 'Failed to connect to Gmail' });
  }
}
