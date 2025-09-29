// src/app/dashboard/page.tsx

import { createClient } from '@/utils/supabase/server';
import TaskBoard from '@/components/TaskBoard';
import Link from 'next/link';

export default async function Dashboard() {
  const supabase = await createClient();
  
  // Check if user is authenticated
  const { data: { user } } = await supabase.auth.getUser();
  
  // Get the user's connections
  const { data: connections } = await supabase
    .from('connections')
    .select('*')
    .eq('user_id', user?.id);
  
  const hasGmailConnection = connections?.some(conn => conn.type === 'gmail' && conn.status === 'active');
  
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Task Dashboard</h1>
        
        <div className="flex gap-4 mb-6">
          {!hasGmailConnection && (
            <Link 
              href="/api/connect/gmail?user_id=user?.id" 
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Connect Gmail
            </Link>
          )}
          
          <Link 
            href="/api/cron/process-gmail" 
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            Process Gmail Now
          </Link>
        </div>
      </header>
      
      <main>
        <TaskBoard />
      </main>
    </div>
  );
}
