import React from 'react';
import styles from './Button.module.css';
import { motion } from 'framer-motion';

export default function Button({ children, variant = 'nav', onClick, className = '', icon: Icon }) {
  // variants: 'nav' (46px), 'hero' (57px), 'footer' (57px)
  return (
    <motion.button 
      className={`${styles.button} ${styles[variant]} ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
      {Icon && <Icon className={styles.icon} size={20} />}
    </motion.button>
  );
}
