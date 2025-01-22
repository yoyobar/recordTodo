import { motion } from 'framer-motion';
import { RxCross2 } from 'react-icons/rx';
import { modalStore, userInfoStore } from '../config/store';

import { useState } from 'react';
import { toast } from 'react-toastify';
import { todoMoveAll } from '../lib/todoControl';

const ModalMoveConfirm = () => {
  const [running, setRunning] = useState(false);
  const { userData } = userInfoStore();
  const { handleMoveConfirmModal, moveConfirmModal } = modalStore();

  const exitModal = () => {
    handleMoveConfirmModal(false);
  };

  const moveAllHistory = async () => {
    if (running) return;
    setRunning(true);

    try {
      exitModal();
      await todoMoveAll(userData.id);
      toast.success('이력 전체 이동이 완료 되었습니다.', { toastId: 'all_move' });
    } catch (error) {
      console.error(error);
    } finally {
      setRunning(false);
    }
  };
  return (
    moveConfirmModal && (
      <motion.div
        animate={{ scale: [0, 1], opacity: [0, 1] }}
        className="select-none overflow-hidden z-0 absolute top-0 left-0 w-screen h-screen flex flex-col justify-center items-center"
      >
        <div className=" text-white bg-[#060800] sm:bg-black/60 border border-stone-800/80 relative flex px-8 py-4 rounded-md w-full h-full sm:w-[400px] sm:h-[200px] shadow-inner flex-col">
          <div className="text-xl font-semibold">일정 전체삭제</div>
          <div className="w-full h-full mt-4 flex flex-col">
            <div>
              전체일정을 <span className="text-literal-error">삭제</span>하시겠습니까?
            </div>
            <div className="text-stone-300 text-sm">이력은 기록됩니다.</div>
          </div>
          <div className="flex gap-2 justify-end mt-4">
            <motion.button
              onClick={moveAllHistory}
              whileTap={{ scale: 1.1 }}
              className="p-2 bg-literal-sorrow/60 text-white rounded-sm hover:bg-literal-sorrow"
            >
              확인
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
            whileTap={{ scale: 1.2 }}
            className="  cursor-pointer flex text-stone-400/80 hover:text-white justify-center items-center absolute top-2 right-2"
          >
            <RxCross2 onClick={exitModal} className="text-xl"></RxCross2>
          </motion.div>
        </div>
      </motion.div>
    )
  );
};

export default ModalMoveConfirm;
