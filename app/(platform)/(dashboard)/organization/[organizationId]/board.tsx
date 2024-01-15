'use client';
import React, { useState } from 'react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { useStore } from '@/lib/store';
import { Column } from './column';

interface BoardProps {
  id: string;
  title: string;
}

export const Board = () => {
  const [showModal, setShowModal] = useState(false);
  const [newTaskContent, setNewTaskContent] = useState('');

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setNewTaskContent('');
  };

  const handleNewTaskSubmit = () => {
    // Generate a new unique task ID
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
    closeModal();
  };

  const [showColumnModal, setShowColumnModal] = useState(false);
  const [newColumnName, setNewColumnName] = useState('');

  const openColumnModal = () => {
    setShowColumnModal(true);
  };

  const closeColumnModal = () => {
    setShowColumnModal(false);
    setNewColumnName('');
  };

  const handleNewColumnSubmit = () => {
    // Generate a new unique column ID
    const newColumnId = `column-${Object.keys(columns).length + 1}`;

    // Add the new column to the column order
    const newColumnOrder = [...columnOrder, newColumnId];

    // // Add the new column to the columns list
    // const newColumns = {
    //   ...columns,
    //   [newColumnId]: {
    //     id: newColumnId,
    //     title: newColumnName,
    //     status:'todo',
    //     taskIds: [],
    //   },
    // };

    // setColumnOrder(newColumnOrder);
    // setColumns(newColumns);
    closeColumnModal();
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
      'task-1': { id: 'task-1', content: 'Take out the garbage' },
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
        console.log('new ', newTask);
      }

      setColumns({
        ...columns,
        [start.id]: newStart,
        [finish.id]: newFinish,
      });
    }
  };

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='board' direction='horizontal' type='column'>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{ display: 'flex', gap: '16px' }}
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

      <button onClick={openModal}>Add Task</button>
      <button onClick={openColumnModal}>Add Column</button>

      {showModal && (
        <div className='modal'>
          <div className='modal-content'>
            <span className='close' onClick={closeModal}>
              &times;
            </span>
            <h2>Add New Task</h2>
            <input
              type='text'
              value={newTaskContent}
              onChange={(e) => setNewTaskContent(e.target.value)}
            />
            <button onClick={handleNewTaskSubmit}>Submit</button>
          </div>
        </div>
      )}

      {showColumnModal && (
        <div className='modal'>
          <div className='modal-content'>
            <span className='close' onClick={closeColumnModal}>
              &times;
            </span>
            <h2>Add New Column</h2>
            <input
              type='text'
              value={newColumnName}
              onChange={(e) => setNewColumnName(e.target.value)}
            />
            <button onClick={handleNewColumnSubmit}>Submit</button>
          </div>
        </div>
      )}

      <style jsx>{`
        .modal {
          display: flex;
          align-items: center;
          justify-content: center;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.4);
        }

        .modal-content {
          background-color: #fefefe;
          padding: 20px;
          border: 1px solid #888;
          width: 300px;
        }

        .close {
          color: #aaa;
          float: right;
          font-size: 28px;
          font-weight: bold;
          cursor: pointer;
        }

        .close:hover {
          color: black;
        }
      `}</style>
    </div>
  );
};
