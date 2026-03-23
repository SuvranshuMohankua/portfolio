import React from 'react';
import { motion } from 'framer-motion';

export default function Landing() {
    return (
        <section id="landing" style={{
            height: '100vh',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'transparent',
            position: 'relative',
            zIndex: 10
        }}>
            <motion.h1
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                style={{
                    fontSize: 'clamp(5rem, 25vw, 25rem)',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 900,
                    color: 'var(--accent-papaya)',
                    margin: 0,
                    textAlign: 'center',
                    lineHeight: 0.8,
                    letterSpacing: '-0.05em',
                    textTransform: 'uppercase',
                    pointerEvents: 'none',
                    /* Suble shadow for extra depth against the cream */
                    textShadow: '0 20px 80px rgba(255, 63, 33, 0.2)'
                }}
            >
                Portfolio
            </motion.h1>
        </section>
    );
}
