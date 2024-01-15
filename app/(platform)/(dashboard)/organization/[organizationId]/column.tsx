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
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    borderRadius: '2px',
    padding: '8px',
    minWidth: '350px',
  };

  const emptyColumnStyle: React.CSSProperties = {
    ...columnStyle,
    background: 'white',
    minHeight: '350px',
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
                  className=' rounded-md min-h-[100px] p-4'
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
                            ...provided.draggableProps.style,
                          }}
                          className='flex justify-between items-center p-4 mb-4 h-min-[100px] shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] rounded-md'
                        >
                          <div className='flex flex-wrap w-[350px]'>
                            {task.content}
                          </div>
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
