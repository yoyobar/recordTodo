import Header from '../components/Header';
import InputController from '../components/InputController';
import ModalEditor from '../components/ModalEditor';
import ModalMoveConfirm from '../components/ModalMoveConfirm';
import TodoDisplay from '../components/TodoDisplay';
import { ModalPortal } from '../lib/modalPortal';

const Main = () => {
  return (
    <div className="relative h-screen overflow-hidden">
      <Header />
      <TodoDisplay />
      <InputController />
      <ModalPortal>
        <ModalEditor />
        <ModalMoveConfirm />
      </ModalPortal>
    </div>
  );
};

export default Main;
