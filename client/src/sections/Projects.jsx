import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { usePortfolio } from '../context/PortfolioContext';

function ProjectCard({ project, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            style={{
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                background: 'var(--black)',
                border: '1px solid var(--border)',
            }}
        >
            {/* Project Image */}
            <div style={{
                width: '100%',
                height: '280px',
                overflow: 'hidden',
                background: 'var(--bg-secondary)',
                borderBottom: '1px solid var(--border)'
            }}>
                {project.image ? (
                    <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'var(--transition)',
                            filter: 'grayscale(100%) contrast(1.2)'
                        }}
                    />
                ) : (
                    <div style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '3rem',
                        color: 'var(--accent-papaya)',
                        opacity: 0.2
                    }}>
                        ⟨/⟩
                    </div>
                )}
            </div>

            {/* Content */}
            <div style={{ padding: '3rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '2rem',
                    color: 'var(--white)',
                    marginBottom: '1.5rem',
                    textTransform: 'lowercase'
                }}>
                    {project.title}
                </h3>

                <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1.1rem',
                    color: 'var(--text-secondary)',
                    marginBottom: '2.5rem',
                    lineHeight: 1.5,
                    flex: 1,
                    fontWeight: 300
                }}>
                    {project.description}
                </p>

                {/* Tech tags */}
                {project.tech && project.tech.length > 0 && (
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '10px',
                        marginBottom: '2.5rem',
                    }}>
                        {project.tech.map((t, i) => (
                            <span key={i} style={{
                                fontSize: '0.75rem',
                                color: 'var(--accent-papaya)',
                                textTransform: 'lowercase',
                                letterSpacing: '0.1em',
                                padding: '6px 16px',
                                border: '1px solid var(--border)',
                                background: 'rgba(255, 63, 33, 0.05)'
                            }}>
                                {t}
                            </span>
                        ))}
                    </div>
                )}

                {/* Links */}
                <div style={{ display: 'flex', gap: '2.5rem', borderTop: '1px solid var(--border)', paddingTop: '2rem' }}>
                    {project.github && (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                fontSize: '0.9rem',
                                color: 'var(--white)',
                                textTransform: 'lowercase',
                                fontWeight: 400,
                                letterSpacing: '0.1em'
                            }}
                        >
                            <FiGithub size={18} /> source
                        </a>
                    )}
                    {project.live && (
                        <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                fontSize: '0.9rem',
                                color: 'var(--accent-papaya)',
                                textTransform: 'lowercase',
                                fontWeight: 400,
                                letterSpacing: '0.1em'
                            }}
                        >
                            <FiExternalLink size={18} /> live view
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

export default function Projects() {
    const { data } = usePortfolio();
    const projects = data?.projects || [];

    return (
        <section id="projects" style={{
            padding: '120px 5%',
            minHeight: '100vh',
            background: '#0a0a0a'
        }}>
            <motion.h2
                className="section-heading"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <span className="bg-black" style={{ padding: '0 20px' }}>the</span> <span className="accent-text-papaya">works</span>
            </motion.h2>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
                gap: '40px',
                maxWidth: '1400px',
                margin: '0 auto',
            }}>
                {projects.map((project, i) => (
                    <ProjectCard key={project.id || i} project={project} index={i} />
                ))}
            </div>

            {projects.length === 0 && (
                <p style={{
                    textAlign: 'center',
                    color: 'var(--text-secondary)',
                    fontFamily: 'var(--font-body)',
                    marginTop: '80px',
                    fontSize: '1.1rem'
                }}>
                    No projects found. Check back later.
                </p>
            )}
        </section>
    );
}
