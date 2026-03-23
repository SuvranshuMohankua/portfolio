import React, { Suspense, useState, lazy, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { PortfolioProvider } from './context/PortfolioContext';
import Navbar from './components/Navbar';
import Loader from './components/Loader';
import SoundToggle from './components/SoundToggle';
import KineticPolyhedron from './three/FuturisticModel';
import { SectionDecorations } from './three/SectionDecorations';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

import Landing from './sections/Landing';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Certificates from './sections/Certificates';
import Contact from './sections/Contact';

import Login from './admin/Login';
import Dashboard from './admin/Dashboard';

function ThreeScene() {
    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1.5} />
            <Suspense fallback={null}>
                <KineticPolyhedron />
                {[2, 3, 4].map(i => (
                    <SectionDecorations key={i} index={i} />
                ))}
            </Suspense>
        </>
    );
}

function SectionWrapper({ children, id }) {
    const rootRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: rootRef,
        offset: ["start end", "center center", "end start"]
    });

    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
    const opacity = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [0, 1, 0]);
    const y = useTransform(scrollYProgress, [0, 0.5], [100, 0]);

    return (
        <motion.div
            ref={rootRef}
            id={id}
            style={{
                scale,
                opacity,
                y,
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                position: 'relative',
                scrollMarginTop: '2rem'
            }}
        >
            {children}
        </motion.div>
    );
}

function PortfolioPage() {
    const sections = [
        { id: 'landing', component: <Landing /> },
        { id: 'hero', component: <Hero /> },
        { id: 'about', component: <About /> },
        { id: 'skills', component: <Skills /> },
        { id: 'projects', component: <Projects /> },
        { id: 'certificates', component: <Certificates /> },
        { id: 'contact', component: <Contact /> },
    ];

    return (
        <>
            <SoundToggle />

            {/* Three.js Background Canvas */}
            <div className="three-canvas-wrapper">
                <Canvas
                    camera={{ position: [0, 0, 5], fov: 45 }}
                    gl={{ antialias: true, alpha: true }}
                    style={{ background: 'transparent' }}
                    dpr={[1, 2]}
                >
                    <ThreeScene />
                </Canvas>
            </div>

            {/* Content with Merging Transitions */}
            <div className="content-wrapper">
                <Navbar />

                <main style={{ position: 'relative' }}>
                    {sections.map((sec) => (
                        <SectionWrapper key={sec.id} id={sec.id}>
                            {sec.component}
                        </SectionWrapper>
                    ))}
                </main>

                <footer style={{
                    textAlign: 'center',
                    padding: '120px 20px',
                    fontFamily: 'var(--font-heading)',
                    color: 'var(--text-secondary)',
                    fontSize: '0.8rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.2em'
                }}>
                    <p style={{ color: 'var(--accent)', fontWeight: 900 }}>
                        A Living Canvas — Work of Art
                    </p>
                    <p style={{ marginTop: '15px', opacity: 0.5 }}>
                        © {new Date().getFullYear()} — Designed for the Future
                    </p>
                </footer>
            </div>
        </>
    );
}

function AdminPage() {
    const [authenticated, setAuthenticated] = useState(
        localStorage.getItem('portfolioAdmin') === 'true'
    );

    const handleLogout = () => {
        localStorage.removeItem('portfolioAdmin');
        setAuthenticated(false);
    };

    if (!authenticated) {
        return <Login onLogin={() => setAuthenticated(true)} />;
    }

    return <Dashboard onLogout={handleLogout} />;
}

export default function App() {
    return (
        <PortfolioProvider>
            <Routes>
                <Route path="/" element={<PortfolioPage />} />
                <Route path="/admin" element={<AdminPage />} />
            </Routes>
        </PortfolioProvider>
    );
}
