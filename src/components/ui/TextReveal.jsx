'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function TextReveal({ 
  children, 
  className = '', 
  delay = 0, 
  staggerDelay = 0.02 
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-20%' });

  // Handle both string and node children gracefully. 
  // If not a string, just wrap in a simple fade up.
  if (typeof children !== 'string') {
    return (
      <motion.div
        ref={ref}
        className={className}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.5, delay, ease: [0.33, 1, 0.68, 1] }} // smooth cubic bezier
      >
        {children}
      </motion.div>
    );
  }

  // Split string into words for staggered animation
  const words = children.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: staggerDelay, delayChildren: delay * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.33, 1, 0.68, 1],
      },
    },
    hidden: {
      opacity: 0,
      y: 40,
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={container}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {words.map((word, index) => {
        if (word === '<br/>' || word === '<br />') {
          return <br key={index} />;
        }
        return (
          <span style={{ overflow: 'hidden', paddingBottom: '0.2em', marginBottom: '-0.2em', display: 'inline-block' }} key={index}>
            <motion.span 
              variants={child} 
              style={{ display: 'inline-block', marginRight: '0.25em' }}
              dangerouslySetInnerHTML={{ __html: word }}
            />
          </span>
        );
      })}
    </motion.div>
  );
}
