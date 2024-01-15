// store.ts
import create from 'zustand';

interface Store {
  columns: {
    [key: string]: {
      status: 'todo' | 'inprogress' | 'done';
      id: string;
      title: string;
      taskIds: string[];
    };
  };
  tasks: { [key: string]: { id: string; content: string } };
  columnOrder: string[];
  setColumns: (columns: {
    [key: string]: {
      status: 'todo' | 'inprogress' | 'done';
      id: string;
      title: string;
      taskIds: string[];
    };
  }) => void;
  setTasks: (tasks: { [key: string]: { id: string; content: string } }) => void;
  setColumnOrder: (columnOrder: string[]) => void;
  deleteTask: (taskId: string) => void;
}

export const useStore = create<Store>((set) => ({
  columns: {},
  tasks: {},
  columnOrder: [],
  setColumns: (columns) => set({ columns }),
  setTasks: (tasks) => set({ tasks }),
  setColumnOrder: (columnOrder) => set({ columnOrder }),
  deleteTask: (taskId) => {
    set((state) => {
      // Create a copy of the tasks object and remove the task with the given ID
      const newTasks = { ...state.tasks };
      delete newTasks[taskId];

      // Create a copy of the columns object and remove the task from all columns
      const newColumns = { ...state.columns };
      for (const columnId in newColumns) {
        const taskIndex = newColumns[columnId].taskIds.indexOf(taskId);
        if (taskIndex !== -1) {
          newColumns[columnId].taskIds.splice(taskIndex, 1);
        }
      }

      return {
        tasks: newTasks,
        columns: newColumns,
      };
    });
  },
}));
