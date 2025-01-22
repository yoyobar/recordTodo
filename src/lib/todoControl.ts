import { todoInfoStore, userInfoStore } from '../config/store';
import { supabase } from './supabase';
import { HistoryType, TodoType, UserType } from '../config/types';
import { toast } from 'react-toastify';

export const userInformationLoad = async () => {
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError) {
    return console.error('user Information Load Failed');
  }

  const data: UserType = {
    id: userData.user.id,
    email: userData.user.email || 'None',
  };

  userInfoStore.getState().initUserData(data);
};

//? TODO 조회
export const todoView = async () => {
  const { data: todoData, error: todoError } = await supabase
    .from('todos')
    .select('*')
    .eq('user_id', (await supabase.auth.getUser()).data.user?.id);

  if (todoError || !todoData) {
    return console.error('user Todos Load Failed');
  }

  const { data: historyData, error: historyError } = await supabase
    .from('deleted_todos')
    .select('*')
    .eq('user_id', (await supabase.auth.getUser()).data.user?.id);

  if (historyError) {
    return console.error('user TodoHistory Load Failed');
  }

  const todos = todoData as TodoType[];
  const history = historyData as HistoryType[];
  todoInfoStore.getState().updateTodo(todos, history);
};

//? TODO 생성
export const todoCreate = async (description: string) => {
  const { error } = await supabase.from('todos').insert({
    user_id: (await supabase.auth.getUser()).data.user?.id,
    description,
  });

  if (error) {
    return console.error('user Todos Create Failed');
  }

  todoView();
};

//? TODO 수정
export const todoUpdate = async (todoId: string, script: string) => {
  const { error } = await supabase.from('todos').update({ description: script }).eq('id', todoId);

  if (error) {
    return console.error('user Todos Update Failed');
  }

  todoView();
};

//? TODO 체크
export const todoCheck = async (todoId: string, mark: boolean) => {
  const { error } = await supabase.from('todos').update({ marked: mark }).eq('id', todoId);

  if (error) {
    return console.error('user Todos Marked Update Failed');
  }

  todoView();
};

//? TODO 이관
export const todoMove = async (todoId: string) => {
  const todos = todoInfoStore.getState().todo;
  const todoToMove = todos.find(todo => todo.id === todoId);

  if (!todoToMove) {
    return console.error('user Todos Data MisMatched');
  }

  const { error } = await supabase.from('deleted_todos').insert({
    id: todoToMove.id,
    user_id: todoToMove.user_id,
    created_at: todoToMove.created_at,
    description: todoToMove.description,
    marked: todoToMove.marked,
  });

  if (error) {
    return console.error('user Deleted_Todos Create Failed');
  }

  toast.info('이력으로 이동 되었습니다.', { toastId: 'Todo_Move' });
  todoDelete(todoId, 'todos');
};

//? TODO 전체 이관
export const todoMoveAll = async (userId: string) => {
  const todos = todoInfoStore.getState().todo;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const todosToInsert = todos.map(({ updated_at, ...rest }) => rest);

  const { error } = await supabase.from('deleted_todos').insert(todosToInsert).eq('user_id', userId);

  if (error) {
    return console.error('user Deleted_Todos Create All Failed');
  }
  todoDeleteAll(userId, 'todos');
};

//? TODO 삭제
export const todoDelete = async (todoId: string, type: string) => {
  const { error } = await supabase.from(type).delete().eq('id', todoId);

  if (error) {
    console.error('user Todos Delete Failed');
  }

  todoView();
};

//? TODO 전체 삭제
export const todoDeleteAll = async (userId: string, type: string) => {
  const { error } = await supabase.from(type).delete().eq('user_id', userId);

  if (error) {
    console.error('user Todos All Delete Failed');
  }

  todoView();
};

//? TODO 복구
export const todoRestore = async (todoId: string) => {
  const history = todoInfoStore.getState().history;
  const todoToMove = history.find(todo => todo.id === todoId);

  if (!todoToMove) {
    return console.error('user Todos Data MisMatched');
  }

  const { error } = await supabase.from('todos').insert({
    id: todoToMove.id,
    user_id: todoToMove.user_id,
    description: todoToMove.description,
    marked: todoToMove.marked,
  });

  if (error) {
    return console.error('user Deleted_Todos Create Failed');
  }

  toast.info('일정으로 이동 되었습니다.', { toastId: 'Todo_Move' });
  todoDelete(todoId, 'deleted_todos');
};

//? TODO 전체 복구
export const todoRestoreAll = async (userId: string) => {
  const history = todoInfoStore.getState().history;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const historyToInsert = history.map(({ deleted_at, ...rest }) => rest);
  const { error } = await supabase.from('todos').insert(historyToInsert).eq('user_id', userId);

  if (error) {
    return console.error('user Todos Restore All Failed');
  }
  todoDeleteAll(userId, 'deleted_todos');
};
