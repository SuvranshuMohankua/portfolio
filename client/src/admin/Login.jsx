import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ADMIN_PASSWORD = 'admin123'; // Simple password-based auth

export default function Login({ onLogin }) {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            localStorage.setItem('portfolioAdmin', 'true');
            onLogin();
        } else {
            setError('Invalid password');
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#0a0a1a',
            padding: '20px',
        }}>
            <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                style={{
                    background: 'rgba(15, 15, 40, 0.6)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(0, 240, 255, 0.15)',
                    borderRadius: '20px',
                    padding: '48px',
                    width: '100%',
                    maxWidth: '400px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                    alignItems: 'center',
                }}
            >
                <h2 style={{
                    fontFamily: 'Orbitron, sans-serif',
                    fontSize: '1.5rem',
                    background: 'linear-gradient(135deg, #00f0ff, #8b5cf6)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '8px',
                }}>
                    ADMIN ACCESS
                </h2>

                <div style={{
                    width: 60, height: 60, borderRadius: '50%',
                    border: '2px solid rgba(0,240,255,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.5rem',
                    background: 'rgba(0,240,255,0.05)',
                }}>
                    🔐
                </div>

                <input
                    type="password"
                    placeholder="Enter admin password"
                    className="neon-input"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(''); }}
                    style={{ textAlign: 'center' }}
                />

                <button type="submit" className="btn-neon btn-filled" style={{ width: '100%' }}>
                    ENTER
                </button>

                {error && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{ color: '#ff4444', fontSize: '0.85rem', fontFamily: 'Rajdhani, sans-serif' }}
                    >
                        {error}
                    </motion.p>
                )}

                <p style={{ fontSize: '0.75rem', color: '#555', fontFamily: 'Rajdhani, sans-serif' }}>
                    Default password: admin123
                </p>
            </motion.form>
        </div>
    );
}
