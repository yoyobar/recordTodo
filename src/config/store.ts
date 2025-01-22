import { create } from 'zustand';
import { UserType, UserStoreType, TodoType, TodoStoreType, HistoryType, ModalStoreType } from './types';

export const userInfoStore = create<UserStoreType>(set => ({
  userData: {
    id: '',
    email: '',
  },

  initUserData: (userData: UserType) => set({ userData: userData }),
}));

export const todoInfoStore = create<TodoStoreType>(set => ({
  todo: [],
  history: [],
  updateTodo: (todoData: TodoType[], historyData: HistoryType[]) => set({ todo: todoData, history: historyData }),
}));

export const modalStore = create<ModalStoreType>(set => ({
  editModal: false,
  deleteConfirmModal: false,
  moveConfirmModal: false,
  restoreConfirmModal: false,
  editModalContent: {
    id: '',
    description: '',
  },

  handleEditModal: (bool: boolean) => set({ editModal: bool }),
  handleEditModalContent: (form: { id: string; description: string }) => set({ editModalContent: form }),
  handleDeleteConfirmModal: (bool: boolean) => set({ deleteConfirmModal: bool }),
  handleMoveConfirmModal: (bool: boolean) => set({ moveConfirmModal: bool }),
  handleRestoreConfirmModal: (bool: boolean) => set({ restoreConfirmModal: bool }),
}));
