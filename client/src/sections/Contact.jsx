import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSend, FiMail, FiPhone, FiLinkedin, FiGithub } from 'react-icons/fi';
import { usePortfolio } from '../context/PortfolioContext';
import api from '../api';

export default function Contact() {
    const { data } = usePortfolio();
    const contact = data?.contact || {};

    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [sending, setSending] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.message) {
            setStatus({ type: 'error', message: 'Please fill all fields' });
            return;
        }

        const subject = encodeURIComponent(`Contact from Portfolio: ${form.name}`);
        const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`);
        window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;

        setStatus({ type: 'success', message: 'Redirecting to your email client... ✨' });
    };

    const contactLinks = [
        { icon: <FiMail />, label: contact.email, href: `mailto:${contact.email}` },
        { icon: <FiPhone />, label: contact.phone, href: `tel:${contact.phone}` },
        { icon: <FiLinkedin />, label: 'LinkedIn', href: contact.linkedin },
        { icon: <FiGithub />, label: 'GitHub', href: contact.github },
    ].filter(c => c.label && c.href);

    return (
        <section id="contact" style={{
            padding: '120px 5%',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <motion.h2
                className="section-heading"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                Connect
            </motion.h2>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '80px',
                maxWidth: '1100px',
                width: '100%',
            }}>
                {/* Contact Info */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <p style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--fs-body)',
                        color: 'var(--text-primary)',
                        lineHeight: 1.6,
                        marginBottom: '50px',
                        fontWeight: 300
                    }}>
                        Have a vision to share? Let's build the <span className="accent-text-papaya">extraordinary</span> together.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {contactLinks.map((item, i) => (
                            <motion.a
                                key={i}
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ x: 15, background: 'var(--accent-papaya)', color: 'var(--black)' }}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '25px',
                                    padding: '30px',
                                    background: 'var(--black)',
                                    border: '1px solid var(--border)',
                                    color: 'var(--accent-papaya)',
                                    textDecoration: 'none',
                                    fontFamily: 'var(--font-heading)',
                                    fontSize: '1.2rem',
                                    textTransform: 'lowercase',
                                    letterSpacing: '0.05em',
                                    transition: 'var(--transition)',
                                }}
                            >
                                <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
                                {item.label}
                            </motion.a>
                        ))}
                    </div>
                </motion.div>

                {/* Contact Form */}
                <motion.form
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '25px',
                    }}
                >
                    <input
                        type="text"
                        placeholder="NAME"
                        className="minimal-input"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, letterSpacing: '0.1em', color: 'var(--text-primary)' }}
                    />
                    <input
                        type="email"
                        placeholder="EMAIL"
                        className="minimal-input"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, letterSpacing: '0.1em' }}
                    />
                    <textarea
                        placeholder="MESSAGE"
                        className="minimal-input"
                        rows={6}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        style={{ resize: 'none', fontFamily: 'var(--font-heading)', fontWeight: 700, letterSpacing: '0.1em' }}
                    />

                    <button
                        type="submit"
                        className="btn-minimal btn-filled"
                        disabled={sending}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '12px',
                            opacity: sending ? 0.6 : 1,
                            width: '100%',
                            padding: '1.5rem'
                        }}
                    >
                        <FiSend size={18} /> {sending ? 'SENDING...' : 'SEND MESSAGE'}
                    </button>

                    {status.message && (
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{
                                textAlign: 'center',
                                fontSize: '0.8rem',
                                color: status.type === 'success' ? 'var(--text-primary)' : '#ff4444',
                                fontFamily: 'var(--font-heading)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em'
                            }}
                        >
                            {status.message}
                        </motion.p>
                    )}
                </motion.form>
            </div>
        </section>
    );
}
