import React, { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import avatar from '../assets/avatar.png';
import CVModal from '../components/CVModal';

export default function Hero() {
    const { data } = usePortfolio();
    const [isCVOpen, setIsCVOpen] = useState(false);
    const name = data?.name || 'Your Name';
    const title = data?.title || 'Full Stack Developer';

    const { scrollYProgress } = useScroll();

    // "Exquisite changes" on scroll
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

    return (
        <section className="merge-section" style={{
            overflow: 'hidden',
            background: 'var(--bg-primary)'
        }}>
            <div className="flashy-glow" style={{ top: '-10%', left: '-10%', background: 'var(--accent-papaya)', opacity: 0.08 }} />

            <motion.div
                style={{
                    y: y1,
                    opacity,
                    scale,
                    textAlign: 'center',
                    maxWidth: '100%',
                    width: '100%',
                    position: 'relative',
                    zIndex: 2,
                    padding: '0 5%'
                }}
            >
                {/* Formal Avatar */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        width: '240px',
                        height: '240px',
                        margin: '0 auto 3rem auto',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        border: '4px solid var(--accent-papaya)',
                        boxShadow: '0 0 50px rgba(255, 63, 33, 0.3)',
                        padding: '10px',
                        background: 'rgba(255, 63, 33, 0.1)',
                        backdropFilter: 'blur(10px)',
                        cursor: 'pointer'
                    }}
                >

                    <img
                        src={avatar}
                        alt="Avatar"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: '50%'
                        }}
                    />
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.2 }}
                    className="section-heading"
                    style={{
                        margin: 0,
                        width: '100%',
                        fontWeight: 900,
                        fontSize: 'clamp(5rem, 20vw, 18rem)',
                        letterSpacing: '-0.06em',
                        color: 'var(--white)',
                        lineHeight: 0.8,
                        textTransform: 'uppercase'
                    }}
                >
                    <span className="bg-black" style={{ padding: '0 100px', display: 'inline-block' }}>{name.split(' ')[0]}</span><br />
                    <span style={{ fontStyle: 'italic', marginLeft: '15%', color: 'var(--accent-papaya)', textShadow: '0 0 40px rgba(255, 63, 33, 0.4)' }}>{name.split(' ')[1] || ''}</span>
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '4rem',
                        marginTop: '6rem'
                    }}
                >
                    <p style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '1.5rem',
                        color: 'var(--text-secondary)',
                        maxWidth: '900px',
                        lineHeight: 1.4,
                        fontWeight: 300,
                        margin: 0
                    }}>
                        {title} — <span className="accent-text-papaya">Crafting digital identities</span> through experimental code and immersive 3D art.
                    </p>

                    <div style={{ display: 'flex', gap: '2rem' }}>
                        <a href="#projects" className="btn-minimal btn-filled" style={{ background: 'var(--accent-papaya)', borderColor: 'var(--accent-papaya)' }}>
                            Explore Work
                        </a>
                        <button
                            onClick={() => setIsCVOpen(true)}
                            className="btn-minimal"
                            style={{ background: 'transparent', cursor: 'pointer' }}
                        >
                            View CV
                        </button>
                        <a href="#contact" className="btn-minimal">
                            Talk To Me
                        </a>
                    </div>
                </motion.div>
            </motion.div>


            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                style={{
                    position: 'absolute',
                    bottom: '40px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                }}
            >
                <div style={{
                    width: '1px',
                    height: '80px',
                    background: 'linear-gradient(to bottom, var(--accent-orange), transparent)',
                    position: 'relative'
                }}>
                    <motion.div
                        animate={{ top: ['0%', '100%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        style={{
                            position: 'absolute',
                            width: '4px',
                            height: '4px',
                            background: 'var(--accent-orange)',
                            left: '-1.5px',
                            borderRadius: '50%'
                        }}
                    />
                </div>
            </motion.div>
            {/* CV Modal */}
            <AnimatePresence>
                {isCVOpen && (
                    <CVModal
                        isOpen={isCVOpen}
                        onClose={() => setIsCVOpen(false)}
                        cvImage={data?.cvImage}
                    />
                )}
            </AnimatePresence>
        </section>
    );
}

