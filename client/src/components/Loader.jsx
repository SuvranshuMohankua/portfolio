import React from 'react';
import { motion } from 'framer-motion';

export default function Loader() {
    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            background: '#0a0a1a',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
        }}>
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                style={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    border: '3px solid rgba(0, 240, 255, 0.1)',
                    borderTopColor: '#00f0ff',
                    borderRightColor: '#8b5cf6',
                }}
            />
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                    marginTop: 24,
                    fontFamily: 'Orbitron, sans-serif',
                    fontSize: '0.85rem',
                    color: '#00f0ff',
                    letterSpacing: '0.2em',
                }}
            >
                INITIALIZING
            </motion.p>
        </div>
    );
}
