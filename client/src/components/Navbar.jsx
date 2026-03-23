import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';

const navLinks = [
    { label: 'intro', href: '#landing' },
    { label: 'identity', href: '#hero' },
    { label: 'the story', href: '#about' },
    { label: 'expertise', href: '#skills' },
    { label: 'the works', href: '#projects' },
    { label: 'achievements', href: '#certificates' },
    { label: 'connect', href: '#contact' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Floating Menu Trigger */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    position: 'fixed',
                    top: '2rem',
                    right: '2rem',
                    zIndex: 2000,
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: 'var(--accent-papaya)',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--bg-primary)',
                    boxShadow: '0 10px 40px rgba(255, 63, 33, 0.3)',
                }}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
            >
                {isOpen ? <FiX size={30} /> : <FiMenu size={30} />}
            </motion.button>

            {/* Exclusive Fullscreen Navigation Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ clipPath: 'circle(0% at 95% 5%)' }}
                        animate={{ clipPath: 'circle(150% at 95% 5%)' }}
                        exit={{ clipPath: 'circle(0% at 95% 5%)' }}
                        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            zIndex: 1900,
                            background: '#0a0a0a',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'flex-start', // Important for scrolling
                            overflowY: 'auto',
                            padding: '15vh 2rem'
                        }}
                    >
                        {/* Artistic Iridescent Decorative Element */}
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                rotate: [0, 90, 0],
                                opacity: [0.05, 0.1, 0.05]
                            }}
                            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                            style={{
                                position: 'absolute',
                                width: '60vw',
                                height: '60vw',
                                border: '1px solid var(--accent-papaya)',
                                borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                                pointerEvents: 'none'
                            }}
                        />

                        <nav style={{ zIndex: 1, textAlign: 'center' }}>
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.label}
                                    initial={{ y: 80, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 + i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                    style={{ margin: '1.5rem 0' }}
                                >
                                    <a
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        style={{
                                            fontSize: 'clamp(3rem, 12vw, 8rem)',
                                            fontFamily: 'var(--font-heading)',
                                            fontWeight: 500,
                                            textTransform: 'none',
                                            color: 'var(--white)',
                                            textDecoration: 'none',
                                            transition: 'var(--transition)',
                                            display: 'inline-block'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.target.style.color = 'var(--accent-papaya)';
                                            e.target.style.transform = 'skewX(-5deg) scale(1.02)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.color = 'var(--white)';
                                            e.target.style.transform = 'skewX(0deg) scale(1)';
                                        }}
                                    >
                                        {link.label}
                                    </a>
                                </motion.div>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
