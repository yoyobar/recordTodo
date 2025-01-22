export interface UserType {
  id: string;
  email: string;
}

export interface UserStoreType {
  userData: {
    id: string;
    email: string;
  };
  initUserData: (userData: UserType) => void;
}

export interface TodoType {
  id: string;
  user_id: string;
  description: string;
  created_at: string;
  updated_at: string;
  marked: boolean;
}

export interface HistoryType {
  id: string;
  user_id: string;
  description: string;
  created_at: string;
  deleted_at: string;
  marked: boolean;
}

export interface TodoStoreType {
  todo: TodoType[];
  history: HistoryType[];
  updateTodo: (todoData: TodoType[], historyData: HistoryType[]) => void;
}

export interface ModalStoreType {
  editModal: boolean;
  deleteConfirmModal: boolean;
  moveConfirmModal: boolean;
  restoreConfirmModal: boolean;
  editModalContent: {
    id: string;
    description: string;
  };

  handleEditModal: (bool: boolean) => void;
  handleEditModalContent: (form: { id: string; description: string }) => void;
  handleDeleteConfirmModal: (bool: boolean) => void;
  handleMoveConfirmModal: (bool: boolean) => void;
  handleRestoreConfirmModal: (bool: boolean) => void;
}
