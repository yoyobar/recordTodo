import { motion } from 'framer-motion';

const Loading = () => {
  return (
    <div className="overflow-y-hidden w-full flex items-center justify-center h-screen bg-primary-dark">
      <div className="w-full space-y-8 flex flex-col justify-center items-center">
        <motion.div
          className="text-3xl w-full font-bold text-white text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Loading...
        </motion.div>

        <div className="w-[300px] h-2 bg-black  rounded-full overflow-hidden">
          <motion.div
            className="h-full w-1/3 bg-primary"
            animate={{
              x: ['0%', '200%', '0%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Loading;
