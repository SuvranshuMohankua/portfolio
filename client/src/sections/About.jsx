import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';

export default function About() {
    const { data } = usePortfolio();
    const summary = data?.summary || 'A passionate developer focused on building innovative solutions.';
    const education = data?.education || [];
    const experience = data?.experience || [];

    return (
        <section id="about" style={{
            padding: '120px 5%',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <motion.h2
                className="section-heading"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <span className="bg-black" style={{ padding: '0 20px' }}>the</span> <span className="accent-text-papaya">story</span>
            </motion.h2>

            {/* Summary Card */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{
                    maxWidth: '1000px',
                    width: '100%',
                    marginBottom: '100px',
                    position: 'relative'
                }}
            >
                <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--fs-body)',
                    lineHeight: 1.4,
                    color: 'var(--white)',
                    fontWeight: 300,
                    letterSpacing: '-0.02em'
                }}>
                    {summary.split(' ').map((word, i) => (
                        <span key={i} style={{ color: i % 10 === 0 ? 'var(--accent-papaya)' : 'inherit' }}>{word} </span>
                    ))}
                </p>
                {data?.cvUrl && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        style={{ marginTop: '40px' }}
                    >
                        <a
                            href={data.cvUrl.startsWith('http') ? data.cvUrl : `http://localhost:5000${data.cvUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-minimal btn-filled"
                            style={{ background: 'var(--accent-papaya)', borderColor: 'var(--accent-papaya)', fontSize: '0.8rem' }}
                            download
                        >
                            Download Full Resume
                        </a>
                    </motion.div>
                )}
            </motion.div>

            {/* Education & Experience Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '40px',
                maxWidth: '1200px',
                width: '100%',
            }}>
                {/* Education */}
                {education.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <h3 style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: '0.8rem',
                            color: 'var(--text-secondary)',
                            marginBottom: '40px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.3em',
                            borderBottom: '1px solid var(--border)',
                            paddingBottom: '10px'
                        }}>
                            Education
                        </h3>
                        {education.map((edu, i) => (
                            <div key={i} style={{ marginBottom: '40px' }}>
                                <p style={{
                                    fontFamily: 'var(--font-heading)',
                                    fontWeight: 600,
                                    color: 'var(--text-primary)',
                                    fontSize: '1.5rem', /* Increased */
                                    textTransform: 'none'
                                }}>{edu.degree}</p>
                                <p style={{
                                    fontFamily: 'var(--font-body)',
                                    color: 'var(--text-secondary)',
                                    fontSize: '1rem',
                                    marginTop: '8px'
                                }}>{edu.institution} — {edu.year}</p>
                                {edu.details && (
                                    <p style={{
                                        fontFamily: 'var(--font-body)',
                                        color: 'var(--accent-papaya)',
                                        fontSize: '0.9rem',
                                        marginTop: '4px',
                                        fontWeight: 500
                                    }}>{edu.details}</p>
                                )}
                            </div>
                        ))}
                    </motion.div>
                )}

                {/* Experience */}
                {experience.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <h3 style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: '0.8rem',
                            color: 'var(--text-secondary)',
                            marginBottom: '40px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.3em',
                            borderBottom: '1px solid var(--border)',
                            paddingBottom: '10px'
                        }}>
                            Experience
                        </h3>
                        {experience.map((exp, i) => (
                            <div key={i} style={{ marginBottom: '40px' }}>
                                <p style={{
                                    fontFamily: 'var(--font-heading)',
                                    fontWeight: 700,
                                    color: 'var(--text-primary)',
                                    fontSize: '1.2rem',
                                    textTransform: 'uppercase'
                                }}>{exp.role}</p>
                                <p style={{
                                    fontFamily: 'var(--font-body)',
                                    color: 'var(--text-secondary)',
                                    fontSize: '1rem',
                                    marginTop: '8px'
                                }}>{exp.company} — {exp.duration}</p>
                                {exp.description && (
                                    <p style={{
                                        fontFamily: 'var(--font-body)',
                                        color: 'var(--text-secondary)',
                                        fontSize: '0.95rem',
                                        marginTop: '12px',
                                        lineHeight: 1.6
                                    }}>{exp.description}</p>
                                )}
                            </div>
                        ))}
                    </motion.div>
                )}
            </div>
        </section>
    );
}
