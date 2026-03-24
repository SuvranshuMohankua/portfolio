import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import SkillOrbit from '../three/SkillOrbit';
import { usePortfolio } from '../context/PortfolioContext';

export default function Skills() {
    const { data } = usePortfolio();
    const skills = data?.skills || ['JavaScript', 'React', 'Node.js', 'Three.js'];

    return (
        <section id="skills" style={{
            padding: '120px 5%',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background Decoration */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: 'url("https://images.unsplash.com/photo-1635339001026-68309bc0576e?q=80&w=2000&auto=format&fit=crop")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.03,
                pointerEvents: 'none',
                filter: 'grayscale(100%)'
            }} />

            <motion.h2
                className="section-heading"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={{ zIndex: 1 }}
            >
                <span className="bg-black" style={{ padding: '0 20px' }}>the</span> <span className="accent-text-papaya">tools</span>
            </motion.h2>

            {/* 3D Skill Orbit */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
                style={{
                    width: '100%',
                    maxWidth: '800px',
                    height: '600px',
                    position: 'relative',
                    cursor: 'grab'
                }}
            >
                <Canvas
                    camera={{ position: [0, 0, 15], fov: 45 }}
                    style={{ background: 'transparent' }}
                >
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1.5} />
                    <Suspense fallback={null}>
                        <SkillOrbit skills={skills} />
                    </Suspense>
                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        autoRotate
                        autoRotateSpeed={0.8}
                    />
                </Canvas>
            </motion.div>

            {/* Continuous Marquee for Skills */}
            <div style={{
                position: 'relative',
                width: '100%',
                marginTop: '100px',
                overflow: 'hidden',
                padding: '40px 0'
            }}>
                <motion.div
                    animate={{
                        x: [0, -1500]
                    }}
                    transition={{
                        duration: 35,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    style={{
                        display: 'flex',
                        width: 'fit-content',
                    }}
                >
                    {[...skills, ...skills, ...skills].map((skill, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -10, borderColor: 'var(--accent-papaya)' }}
                            style={{
                                flex: '0 0 300px',
                                height: '200px',
                                margin: '0 30px',
                                padding: '2rem',
                                background: 'var(--black)',
                                border: '1px solid var(--border)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'relative',
                                cursor: 'default',
                                transition: 'border-color 0.3s'
                            }}
                        >
                            <div style={{
                                width: '60px',
                                height: '60px',
                                marginBottom: '1.5rem',
                                background: 'rgba(255, 63, 33, 0.05)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '50%',
                                fontSize: '2rem'
                            }}>
                                🛠️
                            </div>
                            <span style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: '2rem',
                                color: 'var(--accent-papaya)',
                                textAlign: 'center'
                            }}>{skill}</span>
                            <div style={{
                                position: 'absolute',
                                bottom: '15px',
                                right: '15px',
                                fontSize: '0.6rem',
                                color: 'var(--text-secondary)',
                                opacity: 0.3,
                                letterSpacing: '0.2em'
                            }}>
                                STACK // {i % 10}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Gradient Overlays for smooth edges */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '200px',
                    height: '100%',
                    background: 'linear-gradient(to right, var(--bg-primary), transparent)',
                    zIndex: 2,
                    pointerEvents: 'none'
                }} />
                <div style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '200px',
                    height: '100%',
                    background: 'linear-gradient(to left, var(--bg-primary), transparent)',
                    zIndex: 2,
                    pointerEvents: 'none'
                }} />
            </div>

            <div style={{
                textAlign: 'center',
                marginTop: '40px',
                color: 'var(--text-secondary)',
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                letterSpacing: '0.3em',
                fontFamily: 'var(--font-body)',
                opacity: 0.4
            }}>
                ⟨ technical skill orbit & stack flow ⟩
            </div>
        </section >
    );
}
