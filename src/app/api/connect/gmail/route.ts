// pages/api/connect/gmail.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `${process.env.NEXT_PUBLIC_BASE_URL}/api/connect/gmail/callback`
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user_id } = req.query;
  
  if (!user_id) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  const scopes = [
    'https://www.googleapis.com/auth/gmail.readonly',
  ];

  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    state: user_id as string,
  });

  res.redirect(authUrl);
}
