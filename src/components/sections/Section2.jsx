"use client";

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';
import styles from './Section2.module.css';

export default function Section2() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: 'start',
      containScroll: 'trimSnaps',
      dragFree: false,
    },
    [WheelGesturesPlugin()]
  );

  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  React.useEffect(() => {
    if (!emblaApi) return;
    
    const onSelect = () => {
      setPrevBtnDisabled(!emblaApi.canScrollPrev());
      setNextBtnDisabled(!emblaApi.canScrollNext());
    };
    
    emblaApi.on('select', onSelect);
    emblaApi.on('scroll', onSelect);
    onSelect();
  }, [emblaApi]);

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

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
          <div className={styles.trackWrapper} ref={emblaRef}>
            <div
              className={styles.track}
            >
              {cards.map((card, i) => (
                <div className={styles.slide} key={card.id}>
                  <motion.div 
                    className={styles.card} 
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
                      unoptimized
                    />
                    <div className={styles.cardOverlay}>
                      <h3 className={styles.cardTitle}>{card.title}</h3>
                      <p className={styles.cardText}>{card.text}</p>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Arrows ── */}
          <div className={styles.arrows}>
            <button 
              className={styles.arrowBtn} 
              onClick={scrollPrev}
              disabled={prevBtnDisabled}
              aria-label="Previous"
            >
              ←
            </button>
            <button 
              className={`${styles.arrowBtn} ${styles.arrowBtnActive}`}
              onClick={scrollNext}
              disabled={nextBtnDisabled}
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
