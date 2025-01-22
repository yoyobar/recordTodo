import { motion } from 'framer-motion';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { SiPicartodottv } from 'react-icons/si';
import { supabase } from '../lib/supabase';

const Home = () => {
  const signInWithKakao = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: 'https://recordtodo.yoyobar.xyz/main',
      },
    });
  };

  return (
    <div className="relative max-w-[1400px] min-h-screen font-sans bg-primary-dark flex flex-col justify-center items-center m-auto">
      <motion.img
        animate={{ translateX: [0, 100], opacity: [0, 0.45] }}
        transition={{ duration: 1 }}
        className="absolute w-[300px] left-0 hidden 2xl:block"
        src="/img/phone.png"
      />
      <motion.img
        animate={{ translateX: [0, -100], opacity: [0, 1] }}
        transition={{ duration: 1, delay: 0.25 }}
        className="absolute w-[700px] right-0 top-12 hidden 2xl:block"
        src="/img/art.png"
      />
      <div className="flex flex-col justify-center items-center m-auto">
        <motion.div
          animate={{ translateY: [-10, 0], opacity: [0, 1] }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="flex gap-2 justify-center items-center w-full h-full"
        >
          <SiPicartodottv className="text-2xl text-primary" />
          <div className="text-xl font-bold flex gap-1">
            <span className="text-rose-500">REC</span>
            <span className="font-normal text-white text-2xl">TODO</span>
          </div>
        </motion.div>
        <motion.div
          animate={{ translateY: [-10, 0], opacity: [0, 1] }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="flex justify-center mt-4 text-lg text-white"
        >
          다양한 기록을 남기고 이력을 관리하세요.
        </motion.div>
        <div className="flex justify-center mt-12 w-[280px] relative">
          <motion.button
            onClick={signInWithKakao}
            whileTap={{ scale: 0.95 }}
            className="flex gap-1 items-center justify-center bg-[#eed600] px-8 rounded-sm py-1 w-full"
          >
            <RiKakaoTalkFill className="text-xl absolute left-3" />
            <div className="text-lg">카카오 로그인</div>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Home;
