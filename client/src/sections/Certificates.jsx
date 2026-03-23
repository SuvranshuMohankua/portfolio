import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';

function CertificateModal({ cert, onClose }) {
    if (!cert) return null;

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
                background: 'rgba(0,0,0,0.9)',
                zIndex: 2000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                backdropFilter: 'blur(20px)'
            }}
        >
            <motion.div
                initial={{ scale: 0.5, opacity: 0, y: 100 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.5, opacity: 0, y: 100 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                style={{
                    maxWidth: '90%',
                    maxHeight: '80%',
                    background: 'var(--black)',
                    padding: '3rem',
                    borderRadius: '5px',
                    border: '1px solid var(--accent-papaya)',
                    position: 'relative',
                    textAlign: 'center'
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {cert.image ? (
                    <div style={{
                        width: '100%',
                        height: '350px',
                        marginBottom: '2rem',
                        overflow: 'hidden',
                        borderRadius: '4px',
                        border: '1px solid var(--border)',
                        background: 'rgba(255, 63, 33, 0.03)'
                    }}>
                        <img
                            src={cert.image}
                            alt={cert.title}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain'
                            }}
                        />
                    </div>
                ) : (
                    <div style={{
                        fontSize: '8rem',
                        marginBottom: '2rem',
                        opacity: 0.2
                    }}>🏆</div>
                )}
                <h3 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '3rem',
                    color: 'var(--accent-papaya)',
                    marginBottom: '1rem',
                    textTransform: 'lowercase'
                }}>{cert.title}</h3>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>
                    {cert.institution} | {cert.year}
                </p>
                <button
                    onClick={onClose}
                    style={{
                        marginTop: '3rem',
                        background: 'var(--accent-papaya)',
                        color: 'var(--white)',
                        border: 'none',
                        padding: '15px 40px',
                        fontFamily: 'var(--font-heading)',
                        cursor: 'pointer',
                        textTransform: 'uppercase',
                        letterSpacing: '0.2em',
                        fontSize: '1rem'
                    }}
                >
                    Close
                </button>
            </motion.div>
        </motion.div>
    );
}

function CertificateCard({ cert, onClick }) {
    return (
        <div
            onClick={() => onClick(cert)}
            style={{
                flex: '0 0 400px',
                marginRight: '60px',
                height: '350px',
                position: 'relative',
                cursor: 'pointer',
                overflow: 'hidden',
                border: '1px solid var(--border)',
                background: 'var(--black)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                padding: '2rem'
            }}
        >
            <div style={{
                width: '100%',
                height: '180px',
                marginBottom: '1.5rem',
                position: 'relative',
                background: 'rgba(255, 63, 33, 0.03)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
            }}>
                {cert.image ? (
                    <img
                        src={cert.image}
                        alt={cert.title}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            filter: 'grayscale(60%) contrast(1.1)'
                        }}
                    />
                ) : (
                    <div style={{ fontSize: '4rem', opacity: 0.1 }}>🏆</div>
                )}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to bottom, transparent 60%, var(--black) 100%)'
                }} />
            </div>
            <h4 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.8rem',
                color: 'var(--accent-papaya)',
                marginBottom: '1rem',
                lineHeight: 1.2
            }}>{cert.title}</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{cert.institution}</p>
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(45deg, transparent, rgba(255, 63, 33, 0.05), transparent)',
                pointerEvents: 'none'
            }} />
        </div>
    );
}

export default function Certificates() {
    const { data } = usePortfolio();
    const certificates = data?.certificates || [];
    const [selectedCert, setSelectedCert] = useState(null);

    // Doubling for seamless infinite marquee
    const doubledCerts = [...certificates, ...certificates, ...certificates];

    return (
        <section id="certificates" style={{
            padding: '180px 0',
            minHeight: '80vh',
            background: 'var(--bg-primary)',
            overflow: 'hidden',
            position: 'relative'
        }}>
            <div style={{ padding: '0 5%', marginBottom: '100px' }}>
                <motion.h2
                    className="section-heading"
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                    <span className="bg-black" style={{ padding: '0 20px' }}>the</span> <span className="accent-text-papaya">achievements</span>
                </motion.h2>
            </div>

            {/* Continuous Marquee */}
            <div style={{ position: 'relative', width: '100%', cursor: 'grab' }}>
                <motion.div
                    animate={{
                        x: [0, -2000] // Roughly the width of half the doubled certificates
                    }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    style={{
                        display: 'flex',
                        width: 'fit-content',
                    }}
                >
                    {doubledCerts.map((cert, i) => (
                        <CertificateCard
                            key={i}
                            cert={cert}
                            onClick={setSelectedCert}
                        />
                    ))}
                </motion.div>
            </div>

            {/* Gradient Overlays for smooth edges */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '150px',
                height: '100%',
                background: 'linear-gradient(to right, var(--bg-primary), transparent)',
                zIndex: 10,
                pointerEvents: 'none'
            }} />
            <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '150px',
                height: '100%',
                background: 'linear-gradient(to left, var(--bg-primary), transparent)',
                zIndex: 10,
                pointerEvents: 'none'
            }} />

            <div style={{
                textAlign: 'center',
                marginTop: '100px',
                color: 'var(--text-secondary)',
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                letterSpacing: '0.3em',
                fontFamily: 'var(--font-body)',
                opacity: 0.4
            }}>
                ⟨ auto scrolling / click to expand ⟩
            </div>

            <AnimatePresence>
                {selectedCert && (
                    <CertificateModal
                        cert={selectedCert}
                        onClose={() => setSelectedCert(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
}


