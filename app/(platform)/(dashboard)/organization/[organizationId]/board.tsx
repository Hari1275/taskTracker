'use client';
import React, { useState } from 'react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { useStore } from '@/lib/store';
import { Column } from './column';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface BoardProps {
  id: string;
  title: string;
}

export const Board = () => {
  const {
    columns,
    tasks,
    columnOrder,
    setColumns,
    setTasks,
    setColumnOrder,
    deleteTask,
  } = useStore();
  const [newTaskInput, setNewTaskInput] = useState('');
  const [newColumnName, setNewColumnName] = useState('');

  const handleNewTaskInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskInput(e.target.value);
  };
  const handleNewTaskSubmit = () => {
    // Create a new task and add it to the first column
    const newTaskId = `task-${Object.keys(tasks).length + 1}`;
    const newTasks = {
      ...tasks,
      [newTaskId]: { id: newTaskId, content: newTaskInput },
    };

    const firstColumnId = columnOrder[0];
    const firstColumn = columns[firstColumnId];
    const newColumn = {
      ...firstColumn,
      taskIds: [...firstColumn.taskIds, newTaskId],
    };

    setTasks(newTasks);
    setColumns({ ...columns, [firstColumnId]: newColumn });
    setNewTaskInput(''); // Clear the input after submission
  };

  // Initialize state with initialData
  React.useEffect(() => {
    setColumns({
      'column-1': {
        id: 'column-1',
        title: 'To do',
        status: 'todo',
        taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
      },
      'column-2': {
        id: 'column-2',
        title: 'In Progress',
        status: 'inprogress',
        taskIds: [],
      },
    });

    setTasks({
      'task-1': { id: 'task-1', content: 'Take out the garbage' },
      'task-2': { id: 'task-2', content: 'Watch my favorite show' },
      'task-3': { id: 'task-3', content: 'Charge my phone' },
      'task-4': { id: 'task-4', content: 'Cook dinner' },
    });

    setColumnOrder(['column-1', 'column-2']);
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
  const handleNewColumnNameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewColumnName(e.target.value);
  };
  const handleNewColumnSubmit = () => {
    // Create a new column
    const newColumnId = `column-${Object.keys(columns).length + 1}`;
    const newColumn = {
      id: newColumnId,
      title: newColumnName,
      status: 'todo' as 'todo' | 'inprogress' | 'done',
      taskIds: [],
    };
    setColumns({ ...columns, [newColumnId]: newColumn });
    setColumnOrder([...columnOrder, newColumnId]);
    setNewColumnName('');
  };
  const onDeleteTask = (taskId: string) => {
    deleteTask(taskId);
  };
  return (
    <>
      <div className='flex gap-4'>
        <Dialog>
          <DialogTrigger asChild>
            <Button type='submit'> Create Task</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Task</DialogTitle>
              <DialogDescription>
                What do you want to get done today?
              </DialogDescription>
            </DialogHeader>

            <div className='grid gap-4 py-4'>
              <div>
                {/* <Text htmlFor="name" className="text-right">
              Name
            </Text> */}
                <Input
                  type='text'
                  placeholder='Enter task'
                  value={newTaskInput}
                  onChange={handleNewTaskInputChange}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button onClick={handleNewTaskSubmit}>Add Task</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <Button type='submit'> Create Column</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Column</DialogTitle>
              {/* <DialogDescription>
                What do you want to get done today?
              </DialogDescription> */}
            </DialogHeader>

            <div className='grid gap-4 py-4'>
              <div>
                {/* <Text htmlFor="name" className="text-right">
              Name
            </Text> */}
                <Input
                  type='text'
                  placeholder='Enter column name'
                  value={newColumnName}
                  onChange={handleNewColumnNameChange}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button onClick={handleNewColumnSubmit}>Add Column</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='board' direction='horizontal' type='column'>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className=' flex flex-1 gap-4'
            >
              {columnOrder.map((columnId, index) => {
                const column = columns[columnId];
                const columnTasks = column.taskIds.map((taskId) => ({
                  ...tasks[taskId],
                  status: 'todo',
                  timestamp: new Date(),
                }));

                return (
                  <Column
                    key={column.id}
                    column={column}
                    tasks={columnTasks}
                    index={index}
                    onDeleteTask={onDeleteTask}
                    status={column.status}
                  />
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};
