// src/components/TaskCard.tsx

'use client';

import { useState } from 'react';
import { format } from 'date-fns';

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

  // Determine the icon based on source type
  const sourceIcon = {
    gmail: '📧',
    slack: '💬',
    whatsapp: '📱',
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
