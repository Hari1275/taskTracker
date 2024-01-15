'use client';
import React, { ChangeEvent, useState } from 'react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { useStore } from '@/lib/store';
import { Column } from './column';
import { Button } from '@/components/ui/button';
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
import { Input } from '@/components/ui/input';

interface BoardProps {
  id: string;
  title: string;
}

export const Board = () => {
  const [showModal, setShowModal] = useState(false);
  const [newTaskContent, setNewTaskContent] = useState('');
  const [newColumnName, setNewColumnName] = useState('');

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setNewTaskContent('');
  };

  const handleNewTaskSubmit = () => {
    // Generate a new unique task ID
    console.log('logged');
    const newTaskId = `task-${Object.keys(tasks).length + 1}`;

    // Add the new task to the 'To Do' column
    const newColumns = {
      ...columns,
      'column-1': {
        ...columns['column-1'],
        taskIds: [...columns['column-1'].taskIds, newTaskId],
      },
    };

    // Add the new task to the tasks list
    const newTasks = {
      ...tasks,
      [newTaskId]: { id: newTaskId, content: newTaskContent },
    };

    setColumns(newColumns);
    setTasks(newTasks);
    setNewTaskContent('');
  };

  const handleNewColumnSubmit = () => {
    // Generate a new unique column ID
    const newColumnId = `column-${Object.keys(columns).length + 1}`;

    // Add the new column to the column order
    const newColumnOrder = [...columnOrder, newColumnId];

    // Add the new column to the columns list
    const newColumns: {
      [key: string]: {
        status: 'todo' | 'inprogress' | 'done';
        id: string;
        title: string;
        taskIds: string[];
      };
    } = {
      ...columns,
      [newColumnId]: {
        status: 'todo', // Set default status for the new column
        id: newColumnId,
        title: newColumnName,
        taskIds: [],
      },
    };

    setColumnOrder(newColumnOrder);
    setColumns(newColumns);
  };
  const {
    columns,
    tasks,
    columnOrder,
    setColumns,
    setTasks,
    setColumnOrder,
    deleteTask,
  } = useStore();

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
        status: 'todo',
        taskIds: [],
      },
      'column-3': {
        id: 'column-3',
        title: 'Done',
        status: 'done',
        taskIds: [],
      },
    });

    setTasks({
      'task-1': {
        id: 'task-1',
        content:
          'Take out the garbage Take out the garbage Take out the garbage',
      },
      'task-2': { id: 'task-2', content: 'Watch my favorite show' },
      'task-3': { id: 'task-3', content: 'Charge my phone' },
      'task-4': { id: 'task-4', content: 'Cook dinner' },
    });

    setColumnOrder(['column-1', 'column-2', 'column-3']);
  }, [setColumns, setTasks, setColumnOrder]);
  const onDeleteTask = (taskId: string) => {
    // Call the deleteTask function from the store
    deleteTask(taskId);
  };
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
      if (start.id === 'column-1' && finish.id === 'column-2') {
        const newTask = {
          ...tasks[draggableId],
          status: 'inprogress',
          timestamp: Date.now(),
        };
        setTasks({ ...tasks, [draggableId]: newTask });
      }

      setColumns({
        ...columns,
        [start.id]: newStart,
        [finish.id]: newFinish,
      });
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTaskContent(event.target.value);
  };
  const handleInputChangeColumn = (event: ChangeEvent<HTMLInputElement>) => {
    setNewColumnName(event.target.value);
  };
  return (
    <div>
      <div className='flex justify-between items-center pb-4'>
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
                  id='title'
                  name='title'
                  value={newTaskContent}
                  onChange={handleInputChange}
                  placeholder='Task title '
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
                  id='newColumn'
                  name='newColumn'
                  value={newColumnName}
                  onChange={handleInputChangeColumn}
                  placeholder='Add newColumn '
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
        {/* <Button onClick={openModal}>Add Task</Button> */}
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='board' direction='horizontal' type='column'>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className='gap-4 sm:flex sm:flex-shrink-0 sm:flex-nowrap '
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
    </div>
  );
};
