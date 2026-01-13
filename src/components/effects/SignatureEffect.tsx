import React from 'react';
import { motion } from 'framer-motion';

interface SignatureEffectProps {
  effect?: 'glow' | 'pulse' | 'shake';
  children: React.ReactNode;
  className?: string;
}

export const SignatureEffect: React.FC<SignatureEffectProps> = ({ effect, children, className = '' }) => {
  const getEffectVariants = () => {
    switch (effect) {
      case 'pulse':
        return {
          animate: { opacity: [1, 0.5, 1], transition: { duration: 2, repeat: Infinity } }
        };
      case 'shake':
        return {
          hover: { x: [0, -2, 2, -2, 2, 0], transition: { duration: 0.4 } }
        };
      case 'glow':
        return {
          animate: { 
            boxShadow: ['0 0 0 rgba(6,182,212,0)', '0 0 20px rgba(6,182,212,0.5)', '0 0 0 rgba(6,182,212,0)'],
            transition: { duration: 3, repeat: Infinity }
          }
        };
      default:
        return {};
    }
  };

  return (
    <motion.div
      className={className}
      variants={getEffectVariants()}
      animate={effect === 'pulse' || effect === 'glow' ? 'animate' : undefined}
      whileHover={effect === 'shake' ? 'hover' : undefined}
    >
      {children}
    </motion.div>
  );
};