"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Button from '../ui/Button';
import TextReveal from '../ui/TextReveal';
import styles from './Hero.module.css';
import Navbar from '../layout/Navbar';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1, 
        delayChildren: 0.1,
        duration: 0.5, 
        ease: "easeOut"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section className={styles.hero}>
      {/* Background Video */}
      <div className={styles.videoContainer}>
        <div className={styles.overlay}></div>
        <motion.video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className={styles.video}
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 3, ease: [0.33, 1, 0.68, 1] }}
        >
          <source src="/assets/hero video.mp4" type="video/mp4" />
          {/* Fallback text if video is not supported */}
          Your browser does not support the video tag.
        </motion.video>
      </div>

      <Navbar />

      <div className={styles.contentContainer}>
        <motion.div 
          className={styles.content}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <TextReveal delay={0.5} className={styles.heading}>
            {"Extraordinary Places. <br/> For Exceptional Living."}
          </TextReveal>
          
          <TextReveal delay={0.9} className={styles.subheading}>
            {"Discover a private collection of exceptional homes in the world's <br/> most desirable locations."}
          </TextReveal>
          
          <motion.div variants={itemVariants}>
            <Button variant="hero" icon={ArrowUpRight}>Explore properties</Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
