"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import TextReveal from '../ui/TextReveal';
import styles from './Section5.module.css';

const testimonials = [
  {
    id: 1,
    image: '/assets/Section 5(testi)/first testi.jfif',
    quote: "AVENOR made finding my first luxury home an absolute dream. The team was incredibly supportive and found a property that perfectly matched my lifestyle.",
    name: "Sarah Jenkins",
    role: "First-time Homeowner",
  },
  {
    id: 2,
    image: '/assets/Section 5(testi)/second testi.webp',
    quote: "As an investor, I value market knowledge and exclusivity. AVENOR consistently delivers off-market opportunities that provide exceptional returns on my portfolio.",
    name: "Michael Thorne",
    role: "Property Investor",
  },
  {
    id: 3,
    image: '/assets/Section 5(testi)/third testi.jfif',
    quote: "Relocating from across the country was daunting, but AVENOR handled every detail seamlessly. I couldn't be happier with my new residence and the effortless process.",
    name: "Marcus Sterling",
    role: "Relocating Executive",
  },
];

export default function Section5() {
  // Start with the middle testimonial active, matching Figma
  const [activeIndex, setActiveIndex] = useState(1);
  const [direction, setDirection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handlePrev = () => {
    if (activeIndex > 0) {
      setDirection(-1);
      setActiveIndex(activeIndex - 1);
    }
  };

  const handleNext = () => {
    if (activeIndex < testimonials.length - 1) {
      setDirection(1);
      setActiveIndex(activeIndex + 1);
    }
  };

  const activeTestimonial = testimonials[activeIndex];

  return (
    <section className={styles.section} id="testimonials">
      <div className={styles.container}>
        
        {/* ── Header ── */}
        <div className={styles.header}>
          <TextReveal className={styles.heading}>
            {"<em>Trusted</em> <em>by</em> <br/> homeowners and investors"}
          </TextReveal>
          <motion.p 
            className={styles.subheading}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          >
            Every home represents a milestone. Here&apos;s what our clients have to say about working with AVENOR.
          </motion.p>
        </div>

        {/* ── Main Content Area ── */}
        <motion.div 
          className={styles.content}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
        >
          
          {/* 1. Images Column */}
          <div className={styles.imagesCol}>
            {testimonials.map((testi, i) => {
              const isActive = i === activeIndex;
              return (
                <button
                  key={testi.id}
                  className={`${styles.imageWrapper} ${isActive ? styles.imageActive : ''}`}
                  onClick={() => setActiveIndex(i)}
                  aria-label={`View testimonial from ${testi.name}`}
                  aria-pressed={isActive}
                >
                  <Image
                    src={testi.image}
                    alt={testi.name}
                    fill
                    sizes="(max-width: 768px) 120px, 180px"
                    className={styles.image}
                    unoptimized
                  />
                </button>
              );
            })}
          </div>

          {/* 2. Controls Column */}
          <div className={styles.controlsCol}>
            <button 
              className={`${styles.arrowBtn} ${activeIndex === 0 ? styles.arrowDisabled : ''}`} 
              onClick={handlePrev}
              disabled={activeIndex === 0}
              aria-label="Previous testimonial"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19V5M5 12l7-7 7 7"/>
              </svg>
            </button>
            <button 
              className={`${styles.arrowBtn} ${activeIndex === testimonials.length - 1 ? styles.arrowDisabled : ''}`} 
              onClick={handleNext}
              disabled={activeIndex === testimonials.length - 1}
              aria-label="Next testimonial"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M19 12l-7 7-7-7"/>
              </svg>
            </button>
          </div>

          {/* 3. Quote Card Column */}
          <div className={styles.quoteCol}>
            <div className={styles.quoteCard}>
              
              {/* Quote Icon */}
              <div className={styles.quoteIcon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9.983 3v7.391C9.983 16.095 6.252 19.961 3 21l-2-1.5c2.316-1.523 3.585-3.14 4.093-5.5H0V3h9.983zM24 3v7.391c0 5.704-3.731 9.57-6.983 10.609l-2-1.5c2.316-1.523 3.585-3.14 4.093-5.5H14V3h10z" />
                </svg>
              </div>

                  <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, [isMobile ? 'x' : 'y']: direction === 1 ? 20 : direction === -1 ? -20 : 0 }}
                  animate={{ opacity: 1, [isMobile ? 'x' : 'y']: 0 }}
                  exit={{ opacity: 0, [isMobile ? 'x' : 'y']: direction === 1 ? -10 : direction === -1 ? 10 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className={styles.quoteContentInner}
                >
                  <p className={styles.quoteText}>{activeTestimonial.quote}</p>
                  
                  <div className={styles.authorInfo}>
                    <h4 className={styles.authorName}>{activeTestimonial.name}</h4>
                    <span className={styles.authorRole}>{activeTestimonial.role}</span>
                  </div>
                </motion.div>
              </AnimatePresence>

            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
