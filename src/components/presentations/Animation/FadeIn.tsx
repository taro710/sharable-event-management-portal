'use client';

import { motion } from 'framer-motion';

type Props = {
  children: React.ReactNode;
  className: string;
};
const FadeIn = ({ children, className }: Props) => (
  <motion.div
    animate={{ opacity: 1, scale: 1 }}
    className={className}
    initial={{ opacity: 0, scale: 0.9 }}
    transition={{
      duration: 0.3,
      delay: 0,
      ease: [0, 0.71, 0.2, 1.01],
    }}>
    {children}
  </motion.div>
);
export default FadeIn;
