import { motion } from 'framer-motion';
import { RxCross2 } from 'react-icons/rx';
import { modalStore, userInfoStore } from '../config/store';
import { todoDeleteAll } from '../lib/todoControl';
import { useState } from 'react';
import { toast } from 'react-toastify';

const ModalDeleteConfirm = () => {
  const [running, setRunning] = useState(false);
  const { handleDeleteConfirmModal, deleteConfirmModal } = modalStore();
  const { userData } = userInfoStore();

  const exitModal = () => {
    handleDeleteConfirmModal(false);
  };

  const deleteAllHistory = async () => {
    if (running) return;
    setRunning(true);

    try {
      exitModal();
      await todoDeleteAll(userData.id, 'deleted_todos');
      toast.success('이력 전체삭제가 완료되었습니다.', { toastId: 'all_remove' });
    } catch (error) {
      console.error(error);
    } finally {
      setRunning(false);
    }
  };
  return (
    deleteConfirmModal && (
      <motion.div
        animate={{ scale: [0, 1], opacity: [0, 1] }}
        className="select-none overflow-hidden z-0 absolute top-0 left-0 w-screen h-screen flex flex-col justify-center items-center"
      >
        <div className=" text-white bg-[#060800] sm:bg-black/60 border border-stone-800/80 relative flex px-8 py-4 rounded-md w-full h-full sm:w-[300px] sm:h-[200px] shadow-inner flex-col">
          <div className="text-xl font-semibold">이력 전체삭제</div>
          <div className="w-full h-full mt-4 flex flex-col">
            <div>
              이력을 전부 <span className="text-literal-error">삭제</span>하시겠습니까?
            </div>
            <div className="text-stone-400 text-sm">삭제된 이력은 복구될 수 없습니다!</div>
          </div>
          <div className="flex gap-2 justify-end mt-4">
            <motion.button
              onClick={deleteAllHistory}
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

export default ModalDeleteConfirm;
