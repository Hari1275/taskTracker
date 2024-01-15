// store.js
import create from 'zustand';

interface Store {
  columns: { [key: string]: { id: string; title: string; taskIds: string[] } };
  tasks: { [key: string]: { id: string; content: string } };
  columnOrder: string[];
  setColumns: (columns: {
    [key: string]: { id: string; title: string; taskIds: string[] };
  }) => void;
  setTasks: (tasks: { [key: string]: { id: string; content: string } }) => void;
  setColumnOrder: (columnOrder: string[]) => void;
}

export const useStore = create<Store>((set) => ({
  columns: {},
  tasks: {},
  columnOrder: [],
  setColumns: (columns) => set({ columns }),
  setTasks: (tasks) => set({ tasks }),
  setColumnOrder: (columnOrder) => set({ columnOrder }),
}));
