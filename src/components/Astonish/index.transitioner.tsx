import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";

export const Transitioner = ({ children }: any) => {
  const [justMounted, setJustMounted] = useState(true);

  useEffect(() => {
    setJustMounted(false);

    setTimeout(() => {
      setJustMounted(true);
    }, 1000);
  }, [children]);

  return (
    <AnimatePresence>
      <motion.div
        key="modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: justMounted ? 1 : 0 }}
        exit={{ opacity: 0 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
