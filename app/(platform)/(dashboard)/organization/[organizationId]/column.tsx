'use client';
import React from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';

interface Task {
  id: string;
  content: string;
  status: string;
  timestamp?: Date; // Timestamp when task transitions to 'inprogress'
}

interface ColumnProps {
  column: {
    id: string;
    title: string;
    taskIds: string[];
  };
  tasks: Task[];
  index: number;
  status: 'todo' | 'inprogress' | 'done';
  onDeleteTask: (taskId: string) => void;
}

export const Column: React.FC<ColumnProps> = ({
  column,
  tasks,
  index,
  onDeleteTask,
  status,
}: ColumnProps) => {
  const columnStyle: React.CSSProperties = {
    border: '1px solid lightgrey',
    borderRadius: '2px',
    padding: '8px',
    minWidth: '200px', // Set your desired minimum width here
  };

  const emptyColumnStyle: React.CSSProperties = {
    ...columnStyle,
    background: 'lightgrey',
    minHeight: '100px',
  };

  return (
    <Draggable draggableId={column.id} index={index} key={column.id}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={tasks.length ? columnStyle : emptyColumnStyle}
        >
          <div>
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
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            ...provided.draggableProps.style,
                          }}
                        >
                          <div>{task.content}</div>
                          <button onClick={() => onDeleteTask(task.id)}>
                            Delete
                          </button>
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
