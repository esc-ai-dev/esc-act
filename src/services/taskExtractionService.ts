// services/taskExtractionService.ts

import OpenAI from 'openai';
import { createClient } from '@supabase/supabase-js';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

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
  task_title: string;
  assignee: string | null;
  deadline: string | null;
  context_summary: string;
}

/**
 * Extracts tasks from a message using OpenAI
 */
export async function extractTasksFromMessage(
  userId: string,
  messageData: MessageData
): Promise<void> {
  try {
    console.log(`Processing message from ${messageData.source}: ${messageData.sourceId}`);
    
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
    if (!content) {
      console.log('No content in OpenAI response');
      return;
    }

    let extractedTasks: ExtractedTask[] = [];
    try {
      const parsedContent = JSON.parse(content);
      extractedTasks = Array.isArray(parsedContent) ? parsedContent : [parsedContent];
    } catch (error) {
      console.error('Failed to parse OpenAI response:', error);
      return;
    }

    console.log(`Extracted ${extractedTasks.length} tasks from message`);

    // Save each extracted task to the database
    for (const task of extractedTasks) {
      const { error } = await supabase.from('tasks').insert({
        user_id: userId,
        title: task.task_title,
        description: '',
        status: 'incoming',
        source_type: messageData.source,
        source_id: messageData.sourceId,
        source_link: messageData.sourceLink,
        context_summary: task.context_summary,
        assignee: task.assignee,
        deadline: task.deadline,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

      if (error) {
        console.error('Error inserting task into database:', error);
      } else {
        console.log(`Task "${task.task_title}" saved to database`);
      }
    }
  } catch (error) {
    console.error('Error extracting tasks:', error);
  }
}
