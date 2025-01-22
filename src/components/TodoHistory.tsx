import { modalStore, todoInfoStore } from '../config/store';
import { FaCheck } from 'react-icons/fa6';
import { twMerge as tw } from 'tailwind-merge';
import { TbFileOff } from 'react-icons/tb';
import { FaDeleteLeft } from 'react-icons/fa6';
import dayjs from 'dayjs';
import { todoDelete, todoRestore } from '../lib/todoControl';
import { useState } from 'react';
import { HistoryType } from '../config/types';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { TbRestore } from 'react-icons/tb';
import { MdRestorePage } from 'react-icons/md';
const TodoHistory = () => {
  const { history } = todoInfoStore();
  const [running, setRunning] = useState(false);
  const { handleDeleteConfirmModal, handleRestoreConfirmModal } = modalStore();

  const handleDeleteTodo = async (todoId: string) => {
    if (running) return;
    setRunning(true);
    try {
      await todoDelete(todoId, 'deleted_todos');
      toast.success('이력이 삭제되었습니다.', { toastId: 'history_remove' });
    } catch (error) {
      console.error(error);
    } finally {
      setRunning(false);
    }
  };

  const handleRestoreTodo = (todoId: string) => {
    todoRestore(todoId);
  };

  const handleRestoreTodoAll = () => {
    handleRestoreConfirmModal(true);
  };

  const handleDeleteTodoAll = () => {
    handleDeleteConfirmModal(true);
  };

  //? 날짜를 비교하여 오름차순 정리
  const sortTodosByDate = (todos: HistoryType[]) => todos.sort((a, b) => dayjs(a.deleted_at).valueOf() - dayjs(b.deleted_at).valueOf());

  return (
    <div className="w-full max-h-[90vh] overflow-y-scroll p-4">
      <div className="h-full grid grid-cols-1 gap-4 xl:grid-cols-2">
        {history.length > 0 &&
          sortTodosByDate(history).map((item, index) => {
            return (
              <div
                key={index}
                className={tw('relative w-full bg-black/40 border-l-4 border-stone-400/80 p-2 min-h-20 pt-10 rounded-md flex items-center')}
              >
                <div className={'w-5 h-5 border-primary/80 border rounded-sm mr-3 flex justify-center items-center p-[1px]'}>
                  <FaCheck className={tw('text-primary/80', item.marked ? 'visible' : 'invisible')} />
                </div>
                <div className={tw('text-stone-200/80 w-full whitespace-pre')}>{item.description}</div>
                <div className="text-stone-400/80 absolute top-2">{dayjs(item.deleted_at).format('YYYY. MM. DD')}</div>
                <TbRestore
                  onClick={() => handleRestoreTodo(item.id)}
                  title="복구"
                  className="text-stone-400/80 text-2xl absolute top-0 right-8 cursor-pointer hover:text-white"
                />
                <FaDeleteLeft
                  onClick={() => handleDeleteTodo(item.id)}
                  title="삭제"
                  className="text-stone-400/80 text-2xl absolute top-0 right-0 cursor-pointer hover:text-literal-error"
                />
              </div>
            );
          })}
      </div>
      {history.length > 0 && (
        <div>
          <motion.div
            whileTap={{
              scale: 1.25,
            }}
            initial={{
              opacity: 0.75,
            }}
            whileHover={{
              opacity: [0.75, 1],
            }}
            title="전체 이력 복구"
            onClick={handleRestoreTodoAll}
            className="bg-indigo-800 text-white rounded-full w-fit p-2 absolute bottom-4 right-16 flex justify-center items-center cursor-pointer"
          >
            <MdRestorePage className="text-2xl" />
          </motion.div>
          <motion.div
            whileTap={{
              scale: 1.25,
            }}
            initial={{
              opacity: 0.75,
            }}
            whileHover={{
              opacity: [0.75, 1],
            }}
            title="전체 이력 삭제"
            onClick={handleDeleteTodoAll}
            className="bg-red-800 text-white rounded-full w-fit p-2 absolute bottom-4 right-4 flex justify-center items-center cursor-pointer"
          >
            <TbFileOff className="text-2xl" />
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default TodoHistory;
