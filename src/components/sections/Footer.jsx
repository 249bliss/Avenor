"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLenis } from 'lenis/react';
import styles from './Footer.module.css';

export default function Footer() {
  const lenis = useLenis();

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(href, { offset: -80 }); // Match navbar offset
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className={styles.footer} id="footer">
      <div className={styles.container}>
        
        {/* Layer 1: Background Image */}
        <div className={styles.backgroundWrapper}>
          <Image
            src="/assets/footer bg image.jpeg"
            alt="Luxury modern home at dusk"
            fill
            sizes="100vw"
            className={styles.backgroundImage}
          />
        </div>

        {/* Layer 2: Dark Vertical Gradient Overlay */}
        <div className={styles.gradientOverlay} />


        {/* Layer 4: Main Content */}
        <div className={styles.content}>
          
          {/* Top Section: CTA */}
          <div className={styles.topSection}>
            <motion.h2 
              className={styles.heading}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              Ready For The Next Step?
            </motion.h2>
            <motion.p 
              className={styles.subheading}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            >
              Connect with our team to arrange a private viewing or discuss the properties that caught your attention.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              <button className={styles.ctaBtn}>
                <span className={styles.ctaText}>Get in Touch</span>
                <span className={styles.ctaIcon}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 19L19 5M19 5v10M19 5H9"/>
                  </svg>
                </span>
              </button>
            </motion.div>
          </div>

          {/* Bottom Section: Links & Info */}
          <div className={styles.bottomSection}>
            
            <div className={styles.infoRow}>
              {/* Left: Brand & Socials */}
              <div className={styles.brandCol}>
                <div className={styles.logoWrapper}>
                  <Image 
                    src="/assets/Brand logo.png" 
                    alt="Avenor Logo" 
                    width={180} 
                    height={48} 
                    className={styles.logo}
                  />
                </div>
                <p className={styles.brandDesc}>
                  Curating exceptional homes for those who value timeless design, refined living, and enduring quality.
                </p>
                <div className={styles.socials}>
                  <Link href="#" aria-label="Instagram">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  </Link>
                  <Link href="#" aria-label="LinkedIn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                  </Link>
                  <Link href="#" aria-label="X (Twitter)">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"></path><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path></svg>
                  </Link>
                </div>
              </div>

              {/* Right: Navigation */}
              <div className={styles.navCol}>
                <h4 className={styles.navHeading}>Navigations</h4>
                <ul className={styles.navList}>
                  <li><a href="#story" onClick={(e) => handleLinkClick(e, '#story')}>Our Story</a></li>
                  <li><a href="#properties" onClick={(e) => handleLinkClick(e, '#properties')}>Properties</a></li>
                  <li><a href="#investment" onClick={(e) => handleLinkClick(e, '#investment')}>Investment</a></li>
                  <li><a href="#testimonials" onClick={(e) => handleLinkClick(e, '#testimonials')}>Testimonials</a></li>
                  <li><a href="#faq" onClick={(e) => handleLinkClick(e, '#faq')}>FAQ</a></li>
                </ul>
              </div>
            </div>

            {/* Legal Row */}
            <div className={styles.legalRow}>
              <p>2026 AVENOR. All rights reserved.</p>
              <div className={styles.legalLinks}>
                <Link href="#">Privacy Policy</Link>
                <span className={styles.divider}>|</span>
                <Link href="#">Terms of Service</Link>
              </div>
            </div>

          </div>
        </div>

        {/* Large AVENOR Wordmark (Footer Format) */}
        <div className={styles.wordmarkContainer}>
          <h1 className={styles.wordmarkText}>AVENOR</h1>
        </div>

      </div>
    </footer>
  );
}
