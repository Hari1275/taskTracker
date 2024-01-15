'use client';
import React from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import { Button } from '@/components/ui/button';
import { MdDelete } from 'react-icons/md';
interface Task {
  id: string;
  content: string;
  status: string;
  timestamp?: Date;
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
              width: '300px',
            }}
            className='shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] rounded-md bg-white'
          >
            <h3>{column.title}</h3>
            <Droppable droppableId={column.id} type='task'>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{
                    padding: '4px',
                    minHeight: '100px',
                  }}
                  className='bg-sky-500/10'
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
                            margin: '0 0 8px 0px',
                            minHeight: '50px',
                            backgroundColor: 'white',
                            borderRadius: '4px',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                            ...provided.draggableProps.style,
                          }}
                        >
                          <div className='flex flex-row items-center justify-between'>
                            <p> {task.content}</p>
                            <MdDelete onClick={() => onDeleteTask(task.id)} />
                          </div>
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
