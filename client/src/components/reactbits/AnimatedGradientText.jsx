import { motion } from 'framer-motion';

export default function AnimatedGradientText({ as: Tag = 'span', className = '', children }) {
  return (
    <Tag className={`relative inline-block bg-clip-text text-transparent ${className}`}>
      <motion.span
        className="bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200 bg-[length:200%_200%] bg-clip-text text-transparent"
        animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
        transition={{ duration: 8, ease: 'easeInOut', repeat: Infinity }}
      >
        {children}
      </motion.span>
    </Tag>
  );
}
