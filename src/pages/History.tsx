import Header from '../components/Header';
import ModalDeleteConfirm from '../components/ModalDeleteConfirm';
import ModalRestoreConfirm from '../components/ModalRestoreConfirm';
import TodoHistory from '../components/TodoHistory';
import { ModalPortal } from '../lib/modalPortal';

const History = () => {
  return (
    <div className="relative h-screen overflow-hidden">
      <Header />
      <TodoHistory />

      <ModalPortal>
        <ModalDeleteConfirm />
        <ModalRestoreConfirm />
      </ModalPortal>
    </div>
  );
};

export default History;
