"use client";

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
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
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'keepSnaps', // Keeps 1:1 ratio between properties and snap points without empty space
    dragFree: false, // Forces snap scrolling
  });

  const [activeIndex, setActiveIndex] = useState(0);

  // Sync active dot with Embla
  React.useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setActiveIndex(emblaApi.selectedScrollSnap());
    
    // Update on select (snap end) and also during scroll for responsive feedback
    emblaApi.on('select', onSelect);
    emblaApi.on('scroll', onSelect);
    onSelect(); // Trigger immediately to sync initial state
  }, [emblaApi]);

  // Dot/Arrow navigation
  const scrollToCard = (index) => {
    if (emblaApi) emblaApi.scrollTo(index);
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
        ref={emblaRef}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        variants={{
          visible: { transition: { staggerChildren: 0.2, delayChildren: 0.3 } }
        }}
      >
        <div
          className={styles.track}
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
        </div>
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
