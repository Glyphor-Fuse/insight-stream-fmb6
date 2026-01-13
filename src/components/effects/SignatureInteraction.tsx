import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface SignatureInteractionProps {
  type: 'text-reveal' | 'clip-reveal' | 'parallax' | 'marquee' | 'sticky-progress' | 'hover';
  children: React.ReactNode;
  className?: string;
  speed?: number;
}

export const SignatureInteraction: React.FC<SignatureInteractionProps> = ({ 
  type, 
  children, 
  className = '',
  speed = 1
}) => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100 * speed]);

  if (type === 'text-reveal') {
    return (
      <motion.div
        initial={{ clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)', opacity: 0 }}
        whileInView={{ 
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)', 
          opacity: 1 
        }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  if (type === 'parallax') {
    return (
      <motion.div style={{ y }} className={className}>
        {children}
      </motion.div>
    );
  }

  if (type === 'hover') {
    return (
      <motion.div
        whileHover={{ y: -4, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return <div className={className}>{children}</div>;
};