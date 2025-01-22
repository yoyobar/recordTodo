import { SiPicartodottv } from 'react-icons/si';
import { PiSignOutBold } from 'react-icons/pi';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { useLocation, useNavigate } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';
import { FaHistory } from 'react-icons/fa';

const Header = () => {
  const router = useNavigate();
  const { pathname } = useLocation();

  const logoutWithKakao = async () => {
    await supabase.auth.signOut();
    router('/', { replace: true });
  };

  const refreshController = () => {
    if (pathname === '/main') {
      return router('/main');
    }
    if (pathname === '/history') {
      console.log(pathname);
      return router('/history');
    }
  };

  const navigateMain = () => {
    router('/main');
  };
  const navigateHistory = () => {
    router('/history');
  };

  return (
    <div className="w-full flex pl-8 items-center gap-1 py-1 bg-black bg-opacity-50">
      <SiPicartodottv onClick={refreshController} className="cursor-pointer text-xl text-primary" />
      <div className="w-full text-lg font-bold flex justify-between">
        <div className="flex gap-1 cursor-pointer" onClick={refreshController}>
          <span className="text-rose-500">REC</span>
          <span className="font-normal text-white text-xl">{pathname === '/main' ? 'TODO' : 'HISTORY'}</span>
        </div>

        <div className="flex items-center pr-8 gap-3">
          <motion.div onClick={navigateMain} className="cursor-pointer text-white" whileHover={{ opacity: 0.5 }}>
            <AiFillHome title="홈" className="text-xl text-white" />
          </motion.div>
          <motion.div onClick={navigateHistory} className="cursor-pointer text-white" whileHover={{ opacity: 0.5 }}>
            <FaHistory title="기록" className="text-base text-white" />
          </motion.div>
          <motion.div onClick={logoutWithKakao} className="cursor-pointer text-white" whileHover={{ opacity: 0.5 }}>
            <PiSignOutBold title="로그아웃" className="text-xl text-white" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Header;
