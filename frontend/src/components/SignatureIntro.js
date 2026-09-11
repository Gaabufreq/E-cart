import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const SignatureIntro = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // 3 Seconds Timer
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  // Framer Motion Variants
  const containerVariants = {
    initial: { opacity: 1 },
    animate: { opacity: 1 },
    exit: { 
      opacity: 0,
      scale: 1.05,
      filter: 'blur(10px)',
      transition: { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        delay: 0.2 + i * 0.15,
        duration: 0.6,
        ease: [0.215, 0.61, 0.355, 1]
      }
    })
  };

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: { delay: 0.8, duration: 0.8, ease: 'easeInOut' }
    }
  };

  const tagVariants = {
    hidden: { opacity: 0, letterSpacing: '0.2em' },
    visible: {
      opacity: 0.7,
      letterSpacing: '0.5em',
      transition: { delay: 1.2, duration: 0.8, ease: 'easeOut' }
    }
  };

  const nameLetters = Array.from("Neel");

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden select-none"
          style={{
            // 40% Rich Blue and 60% Deep Pure Black Smooth Gradient
            background: 'radial-gradient(circle at center, #0B192C 0%, #030712 60%, #000000 100%)'
          }}
        >
          {/* Subtle Background Glow Orb */}
          <div className="absolute w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

          {/* Main Content Box */}
          <div className="relative flex flex-col items-center">
            
            {/* Animated Text "Neel" */}
            <div className="flex items-center space-x-1">
              {nameLetters.map((letter, index) => (
                <motion.span
                  key={index}
                  custom={index}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  className="font-heading font-black text-6xl sm:text-8xl tracking-tight text-white drop-shadow-[0_0_25px_rgba(59,130,246,0.5)]"
                  style={{
                    fontFamily: "'Inter', 'Montserrat', sans-serif"
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            {/* Signature Underline */}
            <motion.div
              variants={lineVariants}
              initial="hidden"
              animate="visible"
              className="h-[2px] w-full mt-3 bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-[0_0_12px_#3b82f6]"
            />

            {/* Minimalist Subtitle Tag */}
            <motion.p
              variants={tagVariants}
              initial="hidden"
              animate="visible"
              className="mt-4 text-xs font-semibold text-blue-200 uppercase tracking-[0.5em] text-center pl-[0.5em]"
            >
              CREATIVE DEVELOPER
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};