"use client";

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, animate } from 'framer-motion';
import styles from './Section2.module.css';

export default function Section2() {
  const trackRef = useRef(null);
  const wrapperRef = useRef(null);
  const [sliderConstraints, setSliderConstraints] = useState(0);

  // Calculate drag constraints on mount and resize
  React.useEffect(() => {
    const measure = () => {
      if (trackRef.current && wrapperRef.current) {
        const trackWidth = trackRef.current.scrollWidth;
        const wrapperWidth = wrapperRef.current.offsetWidth;
        setSliderConstraints(Math.min(0, wrapperWidth - trackWidth));
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const x = useMotionValue(0);

  const scrollBy = (direction) => {
    if (trackRef.current && wrapperRef.current) {
      const cards = trackRef.current.querySelectorAll('.' + styles.card);
      if (cards.length === 0) return;
      const cardWidth = cards[0].offsetWidth + 16; // 16px is the gap
      let currentX = x.get();
      let newX = currentX - (direction * cardWidth);
      
      // Enforce bounds
      if (newX > 0) newX = 0;
      if (newX < sliderConstraints) newX = sliderConstraints;
      
      animate(x, newX, { type: 'spring', stiffness: 200, damping: 20 });
    }
  };

  const cards = [
    { 
      id: 1, 
      title: 'Private & Exclusive', 
      image: '/assets/2nd scetion/private.jpeg', 
      text: 'Access to off-market properties that never reach the open market.' 
    },
    { 
      id: 2, 
      title: 'Curated Collection', 
      image: '/assets/2nd scetion/Curated.jpeg', 
      text: 'Every detail meticulously considered for discerning buyers.' 
    },
    { 
      id: 3, 
      title: 'Global Opportunity', 
      image: '/assets/2nd scetion/Gloal oppor.jpeg', 
      text: "Exceptional homes, wherever life takes you." 
    },
    { 
      id: 4, 
      title: 'Local Expertise', 
      image: '/assets/2nd scetion/local expert.jfif', 
      text: 'Knowledge that goes beyond the map.' 
    },
  ];

  return (
    <section className={styles.section} id="story">
      <div className={styles.inner}>

        {/* ── Left — Heading content ── */}
        <motion.div 
          className={styles.content}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.33, 1, 0.68, 1] }}
        >
          <h2 className={styles.heading}>
            <span style={{ overflow: 'hidden', paddingBottom: '0.2em', marginBottom: '-0.2em', display: 'inline-block' }}>
              <motion.span 
                style={{ display: 'inline-block', whiteSpace: 'nowrap' }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1, ease: [0.33, 1, 0.68, 1] }}
              >
                Every home is chosen
              </motion.span>
            </span>
            <br />
            <span style={{ overflow: 'hidden', paddingBottom: '0.2em', marginBottom: '-0.2em', display: 'inline-block' }}>
              <motion.em 
                style={{ display: 'inline-block' }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1, ease: [0.33, 1, 0.68, 1], delay: 0.1 }}
              >
                with intention
              </motion.em>
            </span>
          </h2>

          <div className={styles.bodyRow}>
            <p className={styles.subheading}>
              We represent exceptional residences defined by timeless architecture, remarkable locations, and enduring value.
            </p>
          </div>
        </motion.div>

        {/* ── Right — Horizontal scroll track ── */}
        <div className={styles.rightCol}>
          <div className={styles.trackWrapper} ref={wrapperRef}>
            <motion.div
              className={styles.track}
              ref={trackRef}
              style={{ x }}
              drag="x"
              dragConstraints={{ left: sliderConstraints, right: 0 }}
              dragElastic={0}
              dragTransition={{ bounceStiffness: 200, bounceDamping: 20 }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
            >
              {cards.map((card, i) => (
                <motion.div 
                  className={styles.card} 
                  key={card.id}
                  initial={{ opacity: 0, scale: 1.05 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 1, ease: [0.33, 1, 0.68, 1], delay: 0.1 * i }}
                >
                  <Image 
                    src={card.image} 
                    alt={card.title}
                    fill
                    draggable={false}
                    sizes="(max-width: 768px) 260px, (max-width: 1024px) 290px, 320px"
                    className={styles.cardImage}
                  />
                  <div className={styles.cardOverlay}>
                    <h3 className={styles.cardTitle}>{card.title}</h3>
                    <p className={styles.cardText}>{card.text}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* ── Arrows ── */}
          <div className={styles.arrows}>
            <button 
              className={styles.arrowBtn} 
              onClick={() => scrollBy(-1)}
              aria-label="Previous"
            >
              ←
            </button>
            <button 
              className={`${styles.arrowBtn} ${styles.arrowBtnActive}`}
              onClick={() => scrollBy(1)}
              aria-label="Next"
            >
              →
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
