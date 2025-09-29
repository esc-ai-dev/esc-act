// src/app/page.tsx

import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl font-bold mb-6">Ambient Task-Capture Engine</h1>
        <p className="text-xl mb-8">
          Automatically extract tasks from your emails, Slack messages, and WhatsApp chats.
          Never miss an action item again.
        </p>
        <Link
          href="/dashboard"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-medium"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
