// src/app/api/cron/process-gmail/route.ts

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { processGmailMessages } from '@/services/gmailService';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

/**
 * API route to process Gmail messages for all users
 * This can be triggered by a cron job
 */
export async function GET() {
  try {
    // Get all users with active Gmail connections
    const { data: connections, error } = await supabase
      .from('connections')
      .select('user_id')
      .eq('type', 'gmail')
      .eq('status', 'active');

    if (error) {
      console.error('Error fetching Gmail connections:', error);
      return NextResponse.json({ error: 'Failed to fetch connections' }, { status: 500 });
    }

    if (!connections || connections.length === 0) {
      return NextResponse.json({ message: 'No active Gmail connections found' });
    }

    // Process messages for each user
    const uniqueUserIds = [...new Set(connections.map(conn => conn.user_id))];
    const processingPromises = uniqueUserIds.map(userId => processGmailMessages(userId));
    
    await Promise.allSettled(processingPromises);

    return NextResponse.json({ 
      message: `Processed Gmail messages for ${uniqueUserIds.length} users` 
    });
  } catch (error) {
    console.error('Error in Gmail processing cron job:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
