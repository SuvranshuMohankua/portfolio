import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CVModal({ isOpen, onClose, cvImage }) {
    if (!isOpen) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(0,0,0,0.95)',
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                padding: '2rem'
            }}
        >
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                style={{
                    position: 'relative',
                    maxWidth: '90%',
                    maxHeight: '90%',
                    background: 'var(--black)',
                    borderRadius: '8px',
                    overflow: 'auto',
                    border: '1px solid var(--accent-papaya)',
                    boxShadow: '0 0 50px rgba(255, 63, 33, 0.2)'
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {cvImage ? (
                    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {Array.isArray(cvImage) ? (
                            cvImage.map((img, i) => (
                                <img
                                    key={i}
                                    src={img}
                                    alt={`CV Page ${i + 1}`}
                                    style={{
                                        display: 'block',
                                        width: '100%',
                                        height: 'auto',
                                        objectFit: 'contain',
                                        border: '1px solid rgba(255, 63, 33, 0.1)'
                                    }}
                                />
                            ))
                        ) : (
                            <img
                                src={cvImage}
                                alt="CV"
                                style={{
                                    display: 'block',
                                    width: '100%',
                                    height: 'auto',
                                    objectFit: 'contain'
                                }}
                            />
                        )}
                    </div>
                ) : (
                    <div style={{ color: 'var(--white)', padding: '3rem', textAlign: 'center' }}>
                        CV image not found. Please upload one.
                    </div>
                )}

                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '20px',
                        right: '20px',
                        background: 'var(--accent-papaya)',
                        color: 'var(--white)',
                        border: 'none',
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        fontSize: '1.2rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 10
                    }}
                >
                    ✕
                </button>
            </motion.div>
        </motion.div>
    );
}
