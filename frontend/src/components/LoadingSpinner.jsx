import { FaChessBoard } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const ChessBoardSpinner = ({ isLoading }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div 
          className="fixed inset-0 flex items-center justify-center z-50 bg-gray-950/90 backdrop-blur-sm"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="relative"
          >
            <FaChessBoard className="text-6xl text-blue-500" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChessBoardSpinner;