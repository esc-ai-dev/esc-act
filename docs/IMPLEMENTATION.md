# Technical Implementation Plan: Ambient Task-Capture Engine

**Author:** Manus AI  
**Version:** 1.0  
**Date:** September 29, 2025

## Introduction

This document provides a comprehensive technical implementation plan for building the Ambient Task-Capture Engine as specified in the Product Requirements Document. This plan is designed for a day-1 engineering intern with no prior experience, working on a Mac Studio M3 Ultra. It breaks down the development process into manageable steps, explains the technology choices, and provides detailed instructions for setting up the development environment and implementing each component.

## System Architecture Overview

The Ambient Task-Capture Engine will be built as a modern web application with the following high-level architecture:

1. **Frontend**: A responsive web interface built with Next.js and React
2. **Backend**: A Node.js API server using Express.js
3. **Database**: Supabase (PostgreSQL) for data storage
4. **AI Processing**: Integration with OpenAI's API for task extraction
5. **External Integrations**: Connections to Gmail, Slack, and WhatsApp (via 2chat.io)

![System Architecture Diagram](https://mermaid.ink/img/pako:eNqNkk1PwzAMhv9KlBOIbdI-tKnSBBJiB8QFceCyS9S6a0XaVGlSoKr633FSWKExwS6J_T72a8ddUmkNSUYl3jtTGdypJ6O9o1bZnVEOHR2MqfFJO7TUWr3VFp3VJdp3ckY9NeiMbxvnTUmNrqgzDYIxhkpT0_OAXtNOO3xpvDfVMU3TJE1Jt1RjgZZKU6GtaQnHIBjnOQQzCOYQpBDMIJj-Yl4URVqURVoWaVGm-SJN8yIv0nme5cU8y_NFPv8fZnGFzYvZbJYVs3k2z7NiMZ_NF8UiTYt5VhTzRZYtsnLxjZlDcAXBJQTXEFxBcAnBDIIrCC4huIHgGoIbCK4huITg-hdmDsE1BDcQ3EBwCcENBFMIbiG4g-AWgjsI7iC4g-AGgrtjzI_Gm0r7ULdKO7-kVjf4aA0-hD3DUPdh2MO-Dz3sYQ973MOe9LCnPexpD3vWw571sGc97HkPe97DXvSwFz3sZQ972cNe9rBXx5iRZKF3JBkdPkjWGLWlg9JbOmjVUmm0C_9FyYd3Uoe_QrLwbUlmtFORZOFvlOzQNZJkn5-7Jw?type=png)

## Technology Stack Selection

For a beginner-friendly yet powerful implementation, we've selected the following technologies:

### Frontend
- **Next.js**: A React framework that provides server-side rendering, routing, and many built-in optimizations
- **React**: For building interactive user interfaces with reusable components
- **Tailwind CSS**: For rapid UI development with utility classes
- **Shadcn/UI**: Pre-built accessible UI components that work with Tailwind

### Backend
- **Node.js**: JavaScript runtime for server-side code
- **Express.js**: Minimal and flexible Node.js web application framework
- **Supabase**: Open-source Firebase alternative with PostgreSQL database

### AI and Integration
- **OpenAI API**: For natural language processing and task extraction
- **Gmail API**: For email integration
- **Slack API**: For Slack integration
- **2chat.io API**: For WhatsApp integration

### Development Tools
- **TypeScript**: For type safety and better developer experience
- **ESLint**: For code linting
- **Prettier**: For code formatting
- **Git**: For version control

## Setup Instructions

### Prerequisites
- Mac Studio M3 Ultra (already available)
- Terminal access
- Internet connection

### Step 1: Install Development Tools

Open Terminal and run the following commands:

```bash
# Install Homebrew (package manager for macOS)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Add Homebrew to PATH (follow instructions from the Homebrew installation)
# Then install Node.js and npm
brew install node

# Install Visual Studio Code (recommended IDE)
brew install --cask visual-studio-code

# Install Git
brew install git

# Configure Git (replace with your information)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### Step 2: Create a New Next.js Project

```bash
# Navigate to your preferred directory
cd ~/Documents

# Create a new Next.js project with TypeScript
npx create-next-app@latest task-extraction-app --typescript --tailwind --eslint

# Navigate into the project directory
cd task-extraction-app

# Install additional dependencies
npm install @supabase/supabase-js openai axios react-hook-form @hookform/resolvers zod date-fns

# Install UI components
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-tabs @radix-ui/react-toast lucide-react

# Start the development server
npm run dev
```

Visit `http://localhost:3000` in your browser to see the default Next.js application.

## Implementation Plan

We'll break down the implementation into phases, each focusing on a specific aspect of the system:

### Phase 1: Project Structure and Basic UI (Week 1)

1. **Set up project structure**:
   - Create folders for components, pages, API routes, and utilities
   - Set up TypeScript interfaces for data models

2. **Implement basic UI components**:
   - Create a responsive layout with navigation
   - Implement the task board UI with columns (Incoming, To Do, In Progress, Done)
   - Create task card components

3. **Set up authentication**:
   - Implement user authentication using Supabase Auth
   - Create login and registration pages

### Phase 2: Database Setup and API Layer (Week 2)

1. **Set up Supabase**:
   - Create a new Supabase project
   - Design and create database tables for users, tasks, and source connections
   - Set up row-level security policies

2. **Create API routes**:
   - Implement CRUD operations for tasks
   - Create endpoints for task management (move between columns, edit, delete)

3. **Connect frontend to API**:
   - Implement data fetching hooks
   - Add state management for tasks

### Phase 3: External Service Integrations (Week 3-4)

1. **Gmail Integration**:
   - Set up OAuth 2.0 authentication for Gmail
   - Implement API routes for connecting and fetching emails
   - Create a service to process emails

2. **Slack Integration**:
   - Register a Slack app and set up OAuth
   - Implement webhook endpoints for Slack events
   - Create a service to process Slack messages

3. **WhatsApp Integration (via 2chat.io)**:
   - Set up 2chat.io API connection
   - Implement webhook endpoints for WhatsApp messages
   - Create a service to process WhatsApp messages

### Phase 4: AI Task Extraction (Week 5)

1. **Set up OpenAI integration**:
   - Create a service for communicating with OpenAI API
   - Design and implement prompts for task extraction

2. **Implement task extraction pipeline**:
   - Create a unified processing pipeline for all message sources
   - Implement task extraction logic using OpenAI
   - Add task classification and prioritization

3. **Add task context preservation**:
   - Store and display source context with tasks
   - Implement direct links back to source messages

### Phase 5: Testing, Refinement, and Deployment (Week 6)

1. **Implement testing**:
   - Add unit tests for critical components
   - Perform integration testing for the entire pipeline

2. **Refine user experience**:
   - Optimize UI for different screen sizes
   - Add loading states and error handling

3. **Prepare for deployment**:
   - Set up environment variables
   - Configure production settings
   - Deploy to Vercel (for frontend) and a suitable hosting service for the backend

## Detailed Implementation Guide

### Setting Up the Database Schema

Create the following tables in Supabase:

1. **users**:
   - id (UUID, primary key)
   - email (string, unique)
   - created_at (timestamp)

2. **connections**:
   - id (UUID, primary key)
   - user_id (UUID, foreign key to users)
   - type (enum: 'gmail', 'slack', 'whatsapp')
   - credentials (JSON, encrypted)
   - status (enum: 'active', 'inactive', 'error')
   - created_at (timestamp)
   - updated_at (timestamp)

3. **tasks**:
   - id (UUID, primary key)
   - user_id (UUID, foreign key to users)
   - title (string)
   - description (text)
   - status (enum: 'incoming', 'todo', 'in_progress', 'done')
   - source_type (enum: 'gmail', 'slack', 'whatsapp')
   - source_id (string)
   - source_link (string)
   - context_summary (text)
   - assignee (string, nullable)
   - deadline (timestamp, nullable)
   - created_at (timestamp)
   - updated_at (timestamp)

### Implementing the Task Extraction Logic

Here's a simplified version of the task extraction logic using OpenAI:

```typescript
// services/taskExtraction.ts

import { OpenAI } from 'openai';
import { supabase } from '../lib/supabaseClient';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface MessageData {
  content: string;
  source: 'gmail' | 'slack' | 'whatsapp';
  sourceId: string;
  sourceLink: string;
  timestamp: Date;
  sender: string;
  recipient: string;
}

interface ExtractedTask {
  title: string;
  description: string;
  assignee: string | null;
  deadline: Date | null;
  contextSummary: string;
}

export async function extractTasksFromMessage(
  userId: string,
  messageData: MessageData
): Promise<void> {
  try {
    // Create a prompt for the OpenAI API
    const prompt = `
      You are an expert executive assistant. Your job is to analyze the following text and extract any tasks or action items.
      For each task you find, provide a response in the following JSON format:
      {
        "task_title": "A short, clear title for the task.",
        "assignee": "The person responsible for the task, or null if not specified.",
        "deadline": "The deadline in ISO format if mentioned, or null.",
        "context_summary": "A one-sentence summary of why this task was created."
      }
      If no tasks are found, return an empty array.
      
      Text to analyze:
      ${messageData.content}
    `;

    // Call the OpenAI API
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.2,
    });

    // Parse the response
    const content = response.choices[0].message.content;
    if (!content) return;

    let extractedTasks: ExtractedTask[] = [];
    try {
      const parsedContent = JSON.parse(content);
      extractedTasks = Array.isArray(parsedContent) ? parsedContent : [parsedContent];
    } catch (error) {
      console.error('Failed to parse OpenAI response:', error);
      return;
    }

    // Save each extracted task to the database
    for (const task of extractedTasks) {
      await supabase.from('tasks').insert({
        user_id: userId,
        title: task.title,
        description: task.description || '',
        status: 'incoming',
        source_type: messageData.source,
        source_id: messageData.sourceId,
        source_link: messageData.sourceLink,
        context_summary: task.contextSummary,
        assignee: task.assignee,
        deadline: task.deadline,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
    }
  } catch (error) {
    console.error('Error extracting tasks:', error);
  }
}
```

### Setting Up External Service Integrations

#### Gmail Integration

1. Create a project in the Google Cloud Console
2. Enable the Gmail API
3. Set up OAuth 2.0 credentials
4. Implement the authentication flow:

```typescript
// pages/api/connect/gmail.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';
import { supabase } from '../../../lib/supabaseClient';

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
```

#### Slack Integration

1. Create a Slack app in the Slack API Console
2. Add the necessary scopes
3. Set up OAuth and event subscriptions
4. Implement the authentication flow and webhook handler:

```typescript
// pages/api/connect/slack.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../lib/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user_id } = req.query;
  
  if (!user_id) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  const slackAuthUrl = `https://slack.com/oauth/v2/authorize?client_id=${
    process.env.SLACK_CLIENT_ID
  }&scope=channels:history,groups:history,im:history,mpim:history&user_scope=&redirect_uri=${
    encodeURIComponent(`${process.env.NEXT_PUBLIC_BASE_URL}/api/connect/slack/callback`)
  }&state=${user_id}`;

  res.redirect(slackAuthUrl);
}
```

#### WhatsApp Integration (via 2chat.io)

1. Create an account on 2chat.io
2. Set up a WhatsApp connection
3. Configure webhooks for message events
4. Implement the webhook handler:

```typescript
// pages/api/webhooks/whatsapp.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { extractTasksFromMessage } from '../../../services/taskExtraction';
import { supabase } from '../../../lib/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { body } = req;
    
    // Verify the webhook signature (implementation depends on 2chat.io's requirements)
    
    // Process the incoming message
    const { message, sender, recipient, timestamp } = body;
    
    // Find the user associated with this WhatsApp number
    const { data: connection } = await supabase
      .from('connections')
      .select('user_id')
      .eq('type', 'whatsapp')
      .eq('credentials->phone_number', recipient)
      .single();
    
    if (!connection) {
      return res.status(404).json({ error: 'Connection not found' });
    }
    
    // Extract tasks from the message
    await extractTasksFromMessage(connection.user_id, {
      content: message.text,
      source: 'whatsapp',
      sourceId: message.id,
      sourceLink: '', // WhatsApp doesn't provide direct links to messages
      timestamp: new Date(timestamp),
      sender,
      recipient,
    });
    
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error processing WhatsApp webhook:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
```

## Frontend Implementation

### Task Board Component

```tsx
// components/TaskBoard.tsx

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import TaskCard from './TaskCard';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'incoming' | 'todo' | 'in_progress' | 'done';
  source_type: 'gmail' | 'slack' | 'whatsapp';
  context_summary: string;
  assignee: string | null;
  deadline: string | null;
}

export default function TaskBoard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const { data, error } = await supabase
          .from('tasks')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setTasks(data || []);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchTasks();
    
    // Set up real-time subscription
    const subscription = supabase
      .channel('tasks')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tasks' }, (payload) => {
        fetchTasks();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const columns = [
    { id: 'incoming', title: 'Incoming' },
    { id: 'todo', title: 'To Do' },
    { id: 'in_progress', title: 'In Progress' },
    { id: 'done', title: 'Done' },
  ];

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData('taskId', taskId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (e: React.DragEvent, status: string) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    
    try {
      const { error } = await supabase
        .from('tasks')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', taskId);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8">Loading tasks...</div>;
  }

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {columns.map((column) => (
        <div
          key={column.id}
          className="bg-gray-100 rounded-lg p-4"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, column.id)}
        >
          <h2 className="font-bold text-lg mb-4">{column.title}</h2>
          <div className="space-y-4">
            {tasks
              .filter((task) => task.status === column.id)
              .map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onDragStart={(e) => handleDragStart(e, task.id)}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
```

### Task Card Component

```tsx
// components/TaskCard.tsx

import { useState } from 'react';
import { format } from 'date-fns';
import { Mail, MessageSquare, Phone } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  source_type: 'gmail' | 'slack' | 'whatsapp';
  source_link: string;
  context_summary: string;
  assignee: string | null;
  deadline: string | null;
}

interface TaskCardProps {
  task: Task;
  onDragStart: (e: React.DragEvent) => void;
}

export default function TaskCard({ task, onDragStart }: TaskCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const sourceIcon = {
    gmail: <Mail className="h-4 w-4" />,
    slack: <MessageSquare className="h-4 w-4" />,
    whatsapp: <Phone className="h-4 w-4" />,
  }[task.source_type];

  return (
    <div
      className="bg-white rounded-lg shadow p-4 cursor-pointer"
      draggable
      onDragStart={onDragStart}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex justify-between items-start">
        <h3 className="font-medium">{task.title}</h3>
        <div className="bg-blue-100 p-1 rounded">{sourceIcon}</div>
      </div>
      
      {isExpanded && (
        <div className="mt-4 space-y-2 text-sm">
          {task.description && <p>{task.description}</p>}
          
          <div className="bg-gray-50 p-2 rounded">
            <p className="text-gray-600">{task.context_summary}</p>
          </div>
          
          {task.assignee && (
            <p className="text-gray-600">
              <span className="font-medium">Assignee:</span> {task.assignee}
            </p>
          )}
          
          {task.deadline && (
            <p className="text-gray-600">
              <span className="font-medium">Deadline:</span>{' '}
              {format(new Date(task.deadline), 'MMM d, yyyy')}
            </p>
          )}
          
          {task.source_link && (
            <a
              href={task.source_link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline block mt-2"
              onClick={(e) => e.stopPropagation()}
            >
              View source
            </a>
          )}
        </div>
      )}
    </div>
  );
}
```

## Deployment Strategy

1. **Frontend Deployment**:
   - Deploy the Next.js application to Vercel
   - Configure environment variables in the Vercel dashboard

2. **Backend Deployment**:
   - Use Supabase for database and authentication
   - Set up serverless functions for API endpoints

3. **Monitoring and Maintenance**:
   - Set up error tracking with Sentry
   - Implement logging for debugging
   - Create a maintenance schedule for updates

## Next Steps and Future Enhancements

1. **Automatic Task Completion Detection**:
   - Implement logic to detect when tasks are completed based on follow-up messages

2. **Integration with Task Managers**:
   - Add support for exporting tasks to popular task management tools

3. **Mobile Application**:
   - Develop a mobile app version for on-the-go task management

4. **Advanced Analytics**:
   - Add reporting and analytics features to track productivity

## Conclusion

This implementation plan provides a comprehensive roadmap for building the Ambient Task-Capture Engine. By following these steps, a day-1 engineering intern can successfully create a functional task extraction system that integrates with email, Slack, and WhatsApp. The plan emphasizes modern, beginner-friendly technologies while ensuring the resulting application is robust and scalable.

Remember that software development is an iterative process. Start with the core functionality, test thoroughly, and gradually add more features as you become more comfortable with the technologies involved.
