import { motion } from 'framer-motion';
import { modalStore, todoInfoStore } from '../config/store';
import { FaCheck } from 'react-icons/fa6';
import { twMerge as tw } from 'tailwind-merge';
import { MdDriveFileRenameOutline } from 'react-icons/md';
import { FaDeleteLeft } from 'react-icons/fa6';
import dayjs from 'dayjs';
import { todoCheck, todoMove } from '../lib/todoControl';
import { useState } from 'react';
import { TodoType } from '../config/types';
import { FaFileExport } from 'react-icons/fa';
const TodoDisplay = () => {
  const { todo } = todoInfoStore();
  const [running, setRunning] = useState(false);
  const { handleEditModal, handleEditModalContent, handleMoveConfirmModal } = modalStore();

  const handleCheckTodo = async (todoId: string, mark: boolean) => {
    if (running) return;
    setRunning(true);

    try {
      await todoCheck(todoId, !mark);
    } catch (error) {
      console.error(error);
    } finally {
      setRunning(false);
    }
  };

  const handleMoveTodo = async (todoId: string) => {
    if (running) return;
    setRunning(true);
    try {
      await todoMove(todoId);
    } catch (error) {
      console.error(error);
    } finally {
      setRunning(false);
    }
  };

  const handleMoveTodoAll = () => {
    handleMoveConfirmModal(true);
  };

  const handleEditTodo = (id: string, description: string) => {
    const form = {
      id,
      description,
    };
    handleEditModalContent(form);
    handleEditModal(true);
  };

  //? 날짜를 비교하여 오름차순 정리
  const sortTodosByDate = (todos: TodoType[]) => todos.sort((a, b) => dayjs(a.created_at).valueOf() - dayjs(b.created_at).valueOf());

  return (
    <div className="w-full max-h-[80vh] overflow-y-scroll p-4">
      <div className="h-full grid grid-cols-1 gap-4 xl:grid-cols-2">
        {todo.length > 0 &&
          sortTodosByDate(todo).map((item, index) => {
            return (
              <div
                key={index}
                className={tw(
                  'relative w-full bg-black/40 border-l-4 border-primary/80 min-h-20 p-2 pt-10 rounded-md flex items-center',
                  item.marked && 'border-literal-error/80'
                )}
              >
                <motion.div
                  onClick={() => handleCheckTodo(item.id, item.marked)}
                  whileTap={{ scale: 1.2 }}
                  className={
                    'w-5 h-5 border-literal-error/80 border rounded-sm mr-3 cursor-pointer flex justify-center items-center p-[1px]'
                  }
                >
                  <FaCheck className={tw('text-literal-error', item.marked ? 'visible' : 'invisible')} />
                </motion.div>
                <div className={tw('text-white w-full whitespace-pre', item.marked && 'text-stone-200/80')}>{item.description}</div>
                <div className="text-primary-light/80 absolute top-2">{dayjs(item.created_at).format('YYYY. MM. DD')}</div>

                <MdDriveFileRenameOutline
                  onClick={() => handleEditTodo(item.id, item.description)}
                  title="수정"
                  className="text-stone-400/80 text-2xl absolute top-0 right-8 cursor-pointer hover:text-white"
                />

                <FaDeleteLeft
                  onClick={() => handleMoveTodo(item.id)}
                  title="삭제"
                  className="text-stone-400/80 text-2xl absolute top-0 right-0 cursor-pointer hover:text-literal-error"
                />
              </div>
            );
          })}
      </div>
      {todo.length > 0 && (
        <motion.div
          onClick={handleMoveTodoAll}
          whileTap={{
            scale: 1.25,
          }}
          initial={{
            opacity: 0.75,
          }}
          whileHover={{
            opacity: [0.75, 1],
          }}
          title="전체 이력 전송"
          className="bg-rose-800 text-white rounded-full w-fit p-2 absolute bottom-[16vh] right-4 flex justify-center items-center cursor-pointer"
        >
          <FaFileExport className="text-2xl" />
        </motion.div>
      )}
    </div>
  );
};

export default TodoDisplay;
