// Task.tsx
'use client';
import React from 'react';

interface TaskProps {
  task: {
    id: string;
    content: string;
  };
  index: number;
}

export const Task: React.FC<TaskProps> = ({ task, index }: TaskProps) => {
  return (
    <div
      style={{
        userSelect: 'none',
        padding: '16px',
        margin: '0 0 8px 0',
        minHeight: '50px',
        backgroundColor: 'white',
        borderRadius: '4px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      }}
    >
      {task.content}
    </div>
  );
};
