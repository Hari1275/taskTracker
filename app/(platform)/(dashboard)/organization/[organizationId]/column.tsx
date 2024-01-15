'use client';
import React from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';

interface Task {
  id: string;
  content: string;
}

interface ColumnProps {
  column: {
    id: string;
    title: string;
    taskIds: string[];
  };
  tasks: Task[];
  index: number;
}

export const Column: React.FC<ColumnProps> = ({
  column,
  tasks,
  index,
}: ColumnProps) => {
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div
            style={{
              border: '1px solid lightgrey',
              borderRadius: '2px',
              padding: '8px',
            }}
          >
            <h3>{column.title}</h3>
            <Droppable droppableId={column.id} type='task'>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{
                    background: 'lightgrey',
                    padding: '4px',
                    minHeight: '100px',
                  }}
                >
                  {tasks.map((task, taskIndex) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={taskIndex}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            userSelect: 'none',
                            padding: '16px',
                            margin: '0 0 8px 0',
                            minHeight: '50px',
                            backgroundColor: 'white',
                            borderRadius: '4px',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                            ...provided.draggableProps.style,
                          }}
                        >
                          {task.content}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </div>
      )}
    </Draggable>
  );
};
