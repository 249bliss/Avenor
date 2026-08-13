"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import TextReveal from '../ui/TextReveal';
import styles from './Section6.module.css';

const faqs = [
  {
    id: 1,
    question: "How do I schedule a property viewing?",
    answer: "Simply contact our team through the property listing or inquiry form, and we'll arrange a private viewing at a time that suits you."
  },
  {
    id: 2,
    question: "Do you offer international property services?",
    answer: "Yes, we have a dedicated international team that can assist with global property acquisitions, currency exchange, and cross-border legalities."
  },
  {
    id: 3,
    question: "Can you help first-time luxury home buyers?",
    answer: "Absolutely. Our advisors provide end-to-end guidance to ensure you understand the luxury market nuances and make a confident first purchase."
  },
  {
    id: 4,
    question: "Are all your properties listed on the website?",
    answer: "No. We maintain an exclusive portfolio of off-market properties that are only shared privately with qualified clients."
  },
  {
    id: 5,
    question: "Do you also assist property investors?",
    answer: "Yes, we offer comprehensive investment advisory services, helping you build a portfolio with strong appreciation and rental yield potential."
  },
  {
    id: 6,
    question: "How do I get started?",
    answer: "Reach out via our contact page to schedule an initial consultation. We'll discuss your goals, preferences, and timeline."
  }
];

export default function Section6() {
  const [openIndex, setOpenIndex] = useState(0); // First one open by default

  const toggleFaq = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <section className={styles.section} id="faq">
      <div className={styles.container}>
        
        {/* ── Header ── */}
        <div className={styles.header}>
          <TextReveal className={styles.heading}>
            {"Answers to common <em>questions</em> <br/> about Avenor"}
          </TextReveal>
        </div>

        {/* ── Main Content Area ── */}
        <div className={styles.content}>
          
          {/* FAQ Column */}
          <div className={styles.faqCol}>
            <motion.div 
              className={styles.faqList}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }}
            >
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                
                return (
                  <motion.div 
                    key={faq.id} 
                    className={styles.faqItem}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] } }
                    }}
                  >
                    <button 
                      className={styles.faqButton}
                      onClick={() => toggleFaq(index)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${faq.id}`}
                    >
                      <span className={styles.faqQuestion}>{faq.question}</span>
                      
                      {/* Icon */}
                      <span className={`${styles.iconWrapper} ${isOpen ? styles.iconOpen : ''}`}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M6 9l6 6 6-6"/>
                        </svg>
                      </span>
                    </button>
                    
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`faq-answer-${faq.id}`}
                          className={styles.faqAnswerWrapper}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                        >
                          <p className={styles.faqAnswer}>
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Images Column */}
          <motion.div 
            className={styles.imagesCol}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={{ visible: { transition: { staggerChildren: 0.2, delayChildren: 0.4 } } }}
          >
            <motion.div 
              className={styles.imageWrapperTop}
              variants={{
                hidden: { opacity: 0, clipPath: 'inset(100% 0 0 0)' },
                visible: { opacity: 1, clipPath: 'inset(0% 0 0 0)', transition: { duration: 1.2, ease: [0.33, 1, 0.68, 1] } }
              }}
            >
              <Image
                src="/assets/section 6(faq)/image 1.jpeg"
                alt="Luxury home at dusk"
                fill
                sizes="(max-width: 1024px) 100vw, 400px"
                className={styles.image}
              />
            </motion.div>
            <motion.div 
              className={styles.imageWrapperBottom}
              variants={{
                hidden: { opacity: 0, clipPath: 'inset(100% 0 0 0)' },
                visible: { opacity: 1, clipPath: 'inset(0% 0 0 0)', transition: { duration: 1.2, ease: [0.33, 1, 0.68, 1] } }
              }}
            >
              <Image
                src="/assets/section 6(faq)/image 2.gif"
                alt="Modern luxury house with car"
                fill
                sizes="(max-width: 1024px) 100vw, 400px"
                className={styles.image}
              />
            </motion.div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
