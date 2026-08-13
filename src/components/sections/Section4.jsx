"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import TextReveal from '../ui/TextReveal';
import Counter from '../ui/Counter';
import styles from './Section4.module.css';

export default function Section4() {
  return (
    <section className={styles.section} id="investment">
      <div className={styles.container}>
        
        {/* ── Main Image Frame ── */}
        <div className={styles.imageFrame}>
          <motion.div 
            initial={{ scale: 1.1 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 2, ease: [0.33, 1, 0.68, 1] }}
            style={{ position: 'absolute', inset: 0 }}
          >
            <Image
              src="/assets/4th Section/invest.png"
              alt="Luxury modern apartment building at dusk"
              fill
              sizes="(max-width: 768px) 100vw, 1440px"
              className={styles.backgroundImage}
            />
          </motion.div>
          

          {/* ── Text Content ── */}
          <div className={styles.textContent}>
            <TextReveal className={styles.heading}>
              Luxury That Appreciates.
            </TextReveal>
            <TextReveal className={styles.subheading} delay={0.2}>
              The finest homes offer more than exceptional living, they become enduring investments.
            </TextReveal>
          </div>

          {/* ── Statistics Cutout ── */}
          <motion.div 
            className={styles.statsContainer}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1, ease: [0.33, 1, 0.68, 1], delay: 0.3 }}
          >
            {/* Pseudo-element inverse curve is handled in CSS */}
            <div className={styles.statsInner}>
              <div className={styles.statItem}>
                <Counter 
                  value={2.5} 
                  decimals={1} 
                  prefix="$" 
                  suffix="B+" 
                  className={styles.statValue} 
                  delay={0.5} 
                />
                <span className={styles.statLabel}>Managed</span>
              </div>
              <div className={styles.statItem}>
                <Counter 
                  value={350} 
                  suffix="+" 
                  className={styles.statValue} 
                  delay={0.6} 
                />
                <span className={styles.statLabel}>Homes</span>
              </div>
              <div className={styles.statItem}>
                <Counter 
                  value={98} 
                  suffix="%" 
                  className={styles.statValue} 
                  delay={0.7} 
                />
                <span className={styles.statLabel}>Satisfaction</span>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
