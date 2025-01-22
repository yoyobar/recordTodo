import { useState } from 'react';
import { toast } from 'react-toastify';
import { twMerge as tw } from 'tailwind-merge';
import { AiOutlineEnter } from 'react-icons/ai';
import { motion } from 'framer-motion';
import { todoCreate } from '../lib/todoControl';
const InputController = () => {
  const [text, setText] = useState('');
  const [running, setRunning] = useState(false);
  const maxNewLines = 10;

  const handleTodoCreate = async () => {
    if (running) return;
    if (text.trim().length === 0) return;
    setRunning(true);

    try {
      setText('');
      todoCreate(text);
    } catch (error) {
      console.error(error);
    } finally {
      setRunning(false);
    }
  };

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
    <div className="absolute bottom-0 w-full h-[14vh] z-0">
      <div className="relative w-full h-full bg-black/60 border-t border-stone-800/50">
        <textarea
          onChange={handleTextChange}
          onKeyDown={handleKeyDown}
          value={text}
          placeholder="Todo..."
          maxLength={300}
          tabIndex={-1}
          className="overflow-y-auto w-full pr-[70px] text-xs md:text-lg h-full bg-transparent resize-none outline-none p-4 text-white"
        ></textarea>
        <div className="absolute bottom-4 right-3 text-stone-400/80 flex justify-center items-center text-xs md:text-base">
          {text.length} / 300
        </div>
        <motion.div
          onClick={handleTodoCreate}
          whileTap={{ scale: 1.25 }}
          className={tw(
            'absolute top-4 right-4 w-8 h-8 bg-rose-600/20 flex justify-center items-center p-2 rounded-md',
            text.length > 0 && 'bg-rose-600/60 cursor-pointer'
          )}
        >
          <AiOutlineEnter className=" text-white" />
        </motion.div>
        <div className={tw('p-2 absolute flex justify-center items-center gap-1 -top-5 right-0 w-fit h-5 rounded-sm')}>
          <div className="text-stone-300/80 hidden md:block">ALT + ENTER 전송</div>
        </div>
      </div>
    </div>
  );
};

export default InputController;
