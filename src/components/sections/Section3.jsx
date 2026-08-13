"use client";

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useMotionValue, animate, useMotionValueEvent } from 'framer-motion';
import TextReveal from '../ui/TextReveal';
import styles from './Section3.module.css';

const properties = [
  {
    id: 1,
    name: 'The Crest Mansion',
    location: 'Beverly Hills, California',
    price: '$16.750m',
    badge: 'Beverly Hills, California',
    views: [
      '/assets/3rd section/The Crest Mansion.jpeg',
      '/assets/3rd section/The Crest Mansion(view 2).jpeg',
    ],
    thumbnails: [
      '/assets/3rd section/The Crest Mansion.jpeg',
      '/assets/3rd section/The Crest Mansion(view 2).jpeg',
    ],
  },
  {
    id: 2,
    name: 'Ocean View Residence',
    location: 'New York, USA',
    price: '$8.9m',
    badge: 'New York, USA',
    views: [
      '/assets/3rd section/Ocean View Residence.jpeg',
      '/assets/3rd section/Ocean View Residence(view 2).jpeg',
    ],
    thumbnails: [
      '/assets/3rd section/Ocean View Residence.jpeg',
      '/assets/3rd section/Ocean View Residence(view 2).jpeg',
    ],
  },
  {
    id: 3,
    name: 'Skyline Penthouse',
    location: 'Manhattan, New York',
    price: '$12.4m',
    badge: 'Manhattan, New York',
    views: [
      '/assets/3rd section/skyline Penthouse.jpeg',
      '/assets/3rd section/skyline Penthouse(view2).jpeg',
    ],
    thumbnails: [
      '/assets/3rd section/skyline Penthouse.jpeg',
      '/assets/3rd section/skyline Penthouse(view2).jpeg',
    ],
  },
];

// Individual property card — manages its own view state
function PropertyCard({ property, index, isActive }) {
  const [viewIndex, setViewIndex] = useState(0);

  const toggleView = (e) => {
    e.stopPropagation(); // prevent card drag from firing
    setViewIndex((prev) => (prev === 0 ? 1 : 0));
  };

  return (
    <div className={`${styles.card} ${isActive ? styles.cardActive : ''}`}>
      {/* ── Image area ── */}
      <div className={styles.imageArea}>
        {/* Crossfade between View 1 and View 2 */}
        <AnimatePresence initial={false}>
          <motion.div
            key={viewIndex}
            className={styles.imageFrame}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <Image
              src={property.views[viewIndex]}
              alt={`${property.name} — View ${viewIndex + 1}`}
              fill
              draggable={false}
              priority={index === 0}
              sizes="(max-width: 768px) 85vw, (max-width: 1024px) 60vw, 540px"
              className={styles.cardImage}
            />
          </motion.div>
        </AnimatePresence>

        {/* Top row — location badge + thumbnail switcher */}
        <div className={styles.cardTop}>
          <div className={styles.badge}>
            <span className={styles.badgeText}>{property.badge}</span>
            <span className={styles.badgeIconWrapper}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </span>
          </div>

          {/* Thumbnail switcher — click to toggle view */}
          <div className={styles.thumbs}>
            {property.thumbnails.map((thumb, ti) => (
              <button
                key={ti}
                className={`${styles.thumb} ${viewIndex === ti ? styles.thumbActive : ''}`}
                onClick={toggleView}
                aria-label={`Switch to View ${ti + 1}`}
                aria-pressed={viewIndex === ti}
              >
                <Image
                  src={thumb}
                  alt={`View ${ti + 1}`}
                  fill
                  sizes="48px"
                  className={styles.thumbImage}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Bottom — property name + price */}
        <div className={styles.cardBottom}>
          <div className={styles.cardInfo}>
            <h3 className={styles.cardName}>{property.name}</h3>
            <p className={styles.cardPrice}>{property.price}</p>
          </div>

          {/* Tap image to switch view */}
          <button
            className={styles.imageToggleHitArea}
            onClick={toggleView}
            aria-label={`View ${viewIndex === 0 ? '2' : '1'} of ${property.name}`}
          />
        </div>
      </div>
    </div>
  );
}

export default function Section3() {
  const trackRef = useRef(null);
  const wrapperRef = useRef(null);
  const [sliderConstraints, setSliderConstraints] = useState({ left: 0, right: 0 });
  const [activeIndex, setActiveIndex] = useState(1); // centre card active by default
  const x = useMotionValue(0);

  // Center on mount without animation and calculate constraints
  React.useEffect(() => {
    const measure = () => {
      if (trackRef.current && wrapperRef.current) {
        const wrapperWidth = wrapperRef.current.offsetWidth;
        const cards = trackRef.current.querySelectorAll('[data-card]');
        
        if (cards.length > 0) {
          const trackWidth = trackRef.current.scrollWidth;
          
          // Max X (scrolled all the way left) should be exactly 0 so it aligns with padding
          const maxX = 0;
          // Min X (scrolled all the way right) aligns track's right edge with wrapper's right edge
          const minX = Math.min(0, wrapperWidth - trackWidth);
          
          setSliderConstraints({ left: minX, right: maxX });

          // Set initial active card
          if (cards[activeIndex]) {
            const trackCenter = wrapperWidth / 2;
            const activeCard = cards[activeIndex];
            let initialX = trackCenter - (activeCard.offsetLeft + activeCard.offsetWidth / 2);
            initialX = Math.max(minX, Math.min(maxX, initialX));
            x.set(initialX);
          }
        }
      }
    };
    measure();
    const timeout = setTimeout(measure, 100);
    window.addEventListener('resize', measure);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', measure);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Sync active dot during free drag ────────────────────────
  useMotionValueEvent(x, "change", (latest) => {
    if (!wrapperRef.current || !trackRef.current) return;
    const trackCenter = wrapperRef.current.offsetWidth / 2;
    const targetPoint = trackCenter - latest;
    
    const cards = Array.from(trackRef.current.querySelectorAll('[data-card]'));
    
    let closestIndex = 0;
    let minDistance = Infinity;
    
    cards.forEach((card, index) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(targetPoint - cardCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex !== activeIndex) {
      setActiveIndex(closestIndex);
    }
  });

  // ── Dot navigation ────────────────────────────────
  const scrollToCard = (index) => {
    setActiveIndex(index);
    if (!trackRef.current || !wrapperRef.current) return;
    const cards = trackRef.current.querySelectorAll('[data-card]');
    if (cards[index]) {
      const trackCenter = wrapperRef.current.offsetWidth / 2;
      const card = cards[index];
      
      let targetX = trackCenter - (card.offsetLeft + card.offsetWidth / 2);
      targetX = Math.max(sliderConstraints.left, Math.min(sliderConstraints.right, targetX));
      
      animate(x, targetX, { type: 'spring', stiffness: 200, damping: 25 });
    }
  };

  return (
    <section className={styles.section} id="properties">

      {/* ── Section header ── */}
      <div className={styles.header}>
        <TextReveal className={styles.heading}>
          {"Some property <br/> collection worth <em>discovering</em>"}
        </TextReveal>
        <motion.p
          className={styles.subheading}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
        >
          Explore some of the finest residences<br />
          currently available.
        </motion.p>
      </div>

      {/* ── Card track ── */}
      <motion.div 
        className={styles.trackOuter}
        ref={wrapperRef}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        variants={{
          visible: { transition: { staggerChildren: 0.2, delayChildren: 0.3 } }
        }}
      >
        <motion.div
          className={styles.track}
          ref={trackRef}
          style={{ x }}
          drag="x"
          dragConstraints={sliderConstraints}
          dragElastic={0}
          dragTransition={{ bounceStiffness: 200, bounceDamping: 20 }}
        >
          {properties.map((property, i) => (
              <motion.div
                className={styles.slide}
                key={property.id}
                data-card
                variants={{
                  hidden: { opacity: 0, y: 40, scale: 0.95 },
                  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] } }
                }}
              >
              <PropertyCard
                property={property}
                index={i}
                isActive={i === activeIndex}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* ── Navigation (Dots & Arrows) ── */}
      <div className={styles.navigation}>
        <button 
          className={styles.arrowBtn}
          onClick={() => scrollToCard(Math.max(0, activeIndex - 1))}
          disabled={activeIndex === 0}
          aria-label="Previous property"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <div className={styles.dots}>
          {properties.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === activeIndex ? styles.dotActive : ''}`}
              onClick={() => scrollToCard(i)}
              aria-label={`Go to property ${i + 1}`}
            />
          ))}
        </div>

        <button 
          className={styles.arrowBtn}
          onClick={() => scrollToCard(Math.min(properties.length - 1, activeIndex + 1))}
          disabled={activeIndex === properties.length - 1}
          aria-label="Next property"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

    </section>
  );
}
