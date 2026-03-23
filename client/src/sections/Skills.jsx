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

            {/* Skills List */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '20px',
                    justifyContent: 'center',
                    maxWidth: '1200px',
                    marginTop: '60px',
                }}
            >
                {skills.map((skill, i) => (
                    <motion.span
                        key={i}
                        whileHover={{ y: -10, scale: 1.1, background: 'var(--accent-papaya)', color: 'var(--black)' }}
                        style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: '1.5rem',
                            fontWeight: 500,
                            padding: '15px 40px',
                            background: 'var(--black)',
                            border: '1px solid var(--border)',
                            color: 'var(--accent-papaya)',
                            textTransform: 'lowercase',
                            letterSpacing: '0.05em',
                            transition: 'var(--transition)',
                            cursor: 'default',
                        }}
                    >
                        {skill}
                    </motion.span>
                ))}
            </motion.div>
        </section >
    );
}
