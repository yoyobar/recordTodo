import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { todoUpdate } from '../lib/todoControl';
import { toast } from 'react-toastify';
import { modalStore } from '../config/store';

const ModalEditor = () => {
  const [text, setText] = useState('');
  const { editModalContent, handleEditModal, editModal } = modalStore();
  const [running, setRunning] = useState(false);
  const maxNewLines = 10;

  const exitModal = () => {
    handleEditModal(false);
  };

  const handleTodoCreate = async () => {
    if (running) return;
    if (text.trim().length === 0) return toast.info('내용을 입력해주세요.', { toastId: 'content' });
    if (text === editModalContent.description) return exitModal();
    setRunning(true);

    try {
      todoUpdate(editModalContent.id, text);
      exitModal();
      toast.info('성공적으로 수정되었습니다.');
    } catch (error) {
      console.error(error);
    } finally {
      setRunning(false);
    }
  };

  useEffect(() => {
    setText(editModalContent.description);
  }, [editModalContent]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;
    const newLineCount = (inputValue.match(/\n/g) || []).length;

    if (newLineCount <= maxNewLines) {
      setText(inputValue); // 상태 업데이트
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const newLineCount = (text.match(/\n/g) || []).length;

    if (e.key === 'Enter' && e.altKey) {
      handleTodoCreate();
      setText('');
    }

    // 엔터 입력 차단
    if (e.key === 'Enter' && newLineCount >= maxNewLines) {
      e.preventDefault();
      toast.info('줄 바꿈은 10회까지 가능합니다.', {
        toastId: 'letter_space',
      });
    }
  };

  return (
    editModal && (
      <motion.div
        animate={{ scale: [0, 1], opacity: [0, 1] }}
        className="select-none overflow-hidden z-0 absolute top-0 left-0 w-screen h-screen flex flex-col justify-center items-center"
      >
        <div className=" text-white bg-[#060800] sm:bg-black/60 border border-stone-800/80 relative flex px-8 py-4 rounded-md w-full h-full sm:w-[600px] sm:h-[400px] shadow-inner flex-col">
          <div className="text-xl font-semibold">내용 수정</div>
          <textarea
            onChange={handleTextChange}
            onKeyDown={handleKeyDown}
            value={text}
            placeholder="Todo..."
            maxLength={300}
            tabIndex={-1}
            className="mt-4 overflow-y-auto w-full pr-[70px] text-base md:text-lg h-full bg-transparent resize-none outline-none p-4 text-white rounded-sm"
          ></textarea>
          <div className="absolute bottom-14 right-8 text-stone-400/80 flex justify-center items-center text-xs md:text-base">
            {text.length} / 300
          </div>
          <div className="flex gap-2 justify-end mt-4">
            <motion.button
              onClick={handleTodoCreate}
              whileTap={{ scale: 1.1 }}
              className="p-2 bg-literal-sorrow/60 text-white rounded-sm hover:bg-literal-sorrow"
            >
              수정
            </motion.button>
            <motion.button
              onClick={exitModal}
              whileTap={{ scale: 1.1 }}
              className="p-2 bg-literal-angry/60 text-white rounded-sm hover:bg-literal-angry"
            >
              취소
            </motion.button>
          </div>
          <motion.div
            onClick={exitModal}
            whileTap={{ scale: 1.2 }}
            className="  cursor-pointer flex text-stone-400/80 hover:text-white justify-center items-center absolute top-2 right-2"
          >
            <RxCross2 className="text-xl"></RxCross2>
          </motion.div>
        </div>
      </motion.div>
    )
  );
};

export default ModalEditor;
