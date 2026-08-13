"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLenis } from 'lenis/react';
import Button from '../ui/Button';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const lenis = useLenis();

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(href, { offset: -80 }); // Offset for navbar
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { label: 'Our Story', href: '#story' },
    { label: 'Properties', href: '#properties' },
    { label: 'Investment', href: '#investment' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <motion.nav 
      className={styles.navbar}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className={styles.container}>
        <div className={styles.logo}>
          <Image 
            src="/assets/Brand logo.png" 
            alt="AVENOR Logo" 
            width={120} 
            height={40} 
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>

        {/* Desktop Navigation */}
        <div className={styles.desktopNav}>
          <ul className={styles.navLinks}>
            {navLinks.map((link, index) => (
              <li key={index}>
                <a 
                  href={link.href} 
                  className={styles.link}
                  onClick={(e) => handleLinkClick(e, link.href)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <Button variant="nav" icon={ArrowUpRight}>Get in Touch</Button>
        </div>

        {/* Mobile Hamburger */}
        <button className={styles.hamburger} onClick={toggleMenu} aria-label="Toggle menu">
          {isOpen ? <X size={28} color="#fff" /> : <Menu size={28} color="#fff" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className={styles.mobileMenu}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ul className={styles.mobileNavLinks}>
              {navLinks.map((link, index) => (
                <motion.li 
                  key={index} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + (index * 0.1), duration: 0.4 }}
                >
                  <a 
                    href={link.href} 
                    className={styles.mobileLink}
                    onClick={(e) => handleLinkClick(e, link.href)}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <motion.div 
              className={styles.mobileAction}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + (navLinks.length * 0.1), duration: 0.4 }}
            >
              <Button variant="hero" icon={ArrowUpRight} onClick={() => setIsOpen(false)} className={styles.mobileNavBtn}>
                Get in Touch
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
