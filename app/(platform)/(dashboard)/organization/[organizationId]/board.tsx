'use client';
import React from 'react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { useStore } from '@/lib/store';
import { Column } from './column';

interface BoardProps {
  id: string;
  title: string;
}

export const Board = () => {
  const { columns, tasks, columnOrder, setColumns, setTasks, setColumnOrder } =
    useStore();

  // Initialize state with initialData
  React.useEffect(() => {
    setColumns({
      'column-1': {
        id: 'column-1',
        title: 'To do',
        taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
      },
    });

    setTasks({
      'task-1': { id: 'task-1', content: 'Take out the garbage' },
      'task-2': { id: 'task-2', content: 'Watch my favorite show' },
      'task-3': { id: 'task-3', content: 'Charge my phone' },
      'task-4': { id: 'task-4', content: 'Cook dinner' },
    });

    setColumnOrder(['column-1']);
  }, [setColumns, setTasks, setColumnOrder]);

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (type === 'column') {
      const newColumnOrder = Array.from(columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      setColumnOrder(newColumnOrder);
      return;
    }

    const start = columns[source.droppableId];
    const finish = columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      setColumns({
        ...columns,
        [start.id]: {
          ...start,
          taskIds: newTaskIds,
        },
      });
    } else {
      const startTaskIds = Array.from(start.taskIds);
      startTaskIds.splice(source.index, 1);
      const newStart = {
        ...start,
        taskIds: startTaskIds,
      };

      const finishTaskIds = Array.from(finish.taskIds);
      finishTaskIds.splice(destination.index, 0, draggableId);
      const newFinish = {
        ...finish,
        taskIds: finishTaskIds,
      };

      setColumns({
        ...columns,
        [start.id]: newStart,
        [finish.id]: newFinish,
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='board' direction='horizontal' type='column'>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {columnOrder.map((columnId, index) => {
              const column = columns[columnId];
              const columnTasks = column.taskIds.map((taskId) => tasks[taskId]);

              return (
                <Column
                  key={column.id}
                  column={column}
                  tasks={columnTasks}
                  index={index}
                />
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
