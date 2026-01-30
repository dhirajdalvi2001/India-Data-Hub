import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../assets/logo.webp"

interface PreloaderProps {
  onComplete?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] },
          }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
        >
          {/* Subtle background glow */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -inset-[10%] opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent blur-3xl" />
          </div>

          <motion.div
            initial={{ scale: 0.2, opacity: 0 }}
            animate={{
              scale: [0.2, 1.2, 1],
              opacity: [0, 1, 1],
            }}
            transition={{
              duration: 0.8,
              ease: [0.34, 1.56, 0.64, 1],
            }}
            className="relative z-10"
          >
            <img
              src={Logo}
              alt="Logo"
              className="w-24 h-auto sm:w-72 sm:h-auto text-primary drop-shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)]"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
