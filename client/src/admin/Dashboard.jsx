import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../api';

export default function Dashboard({ onLogout }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState('');
    const [contacts, setContacts] = useState([]);
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const portfolio = await api.getPortfolio();
            setData(portfolio);
            const msgs = await api.getContacts();
            setContacts(msgs);
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    const handleImageUpload = async (e, type, extra = {}) => {
        const file = e.target.files[0];
        if (!file) return;
        setStatus(`Uploading ${type} image...`);
        try {
            const result = await api.uploadImage(file, type, extra);
            setData(result.data);
            setStatus(`✅ ${type} image uploaded!`);
        } catch (err) {
            setStatus(`❌ Failed to upload ${type} image`);
        }
    };

    const handleFieldUpdate = (field, value) => {
        setData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = async () => {
        setStatus('Saving...');
        try {
            await api.updatePortfolio(data);
            setStatus('✅ Data saved successfully!');
        } catch (err) {
            setStatus('❌ Failed to save');
        }
    };

    const handleProjectFieldUpdate = (idx, field, value) => {
        setData(prev => {
            const projects = [...(prev.projects || [])];
            projects[idx] = { ...projects[idx], [field]: value };
            return { ...prev, projects };
        });
    };

    const addProject = () => {
        setData(prev => ({
            ...prev,
            projects: [...(prev.projects || []), {
                id: Date.now(),
                title: 'New Project',
                description: '',
                image: '',
                github: '',
                live: '',
                tech: []
            }]
        }));
    };

    const removeProject = (idx) => {
        setData(prev => ({
            ...prev,
            projects: prev.projects.filter((_, i) => i !== idx)
        }));
    };

    if (loading) {
        return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a1a', color: '#00f0ff', fontFamily: 'Orbitron' }}>Loading...</div>;
    }

    const tabStyle = (tab) => ({
        fontFamily: 'Orbitron, sans-serif',
        fontSize: '0.75rem',
        padding: '10px 20px',
        border: activeTab === tab ? '1px solid #00f0ff' : '1px solid rgba(0,240,255,0.15)',
        background: activeTab === tab ? 'rgba(0,240,255,0.1)' : 'transparent',
        color: activeTab === tab ? '#00f0ff' : '#8888aa',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'all 0.3s',
        letterSpacing: '0.1em',
    });

    const labelStyle = {
        fontFamily: 'Rajdhani, sans-serif',
        fontSize: '0.85rem',
        fontWeight: 600,
        color: '#8888aa',
        marginBottom: '6px',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: '#0a0a1a',
            padding: '24px',
            maxWidth: '1000px',
            margin: '0 auto',
        }}>
            {/* Header */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '32px',
                flexWrap: 'wrap',
                gap: '12px',
            }}>
                <h1 style={{
                    fontFamily: 'Orbitron, sans-serif',
                    fontSize: '1.4rem',
                    background: 'linear-gradient(135deg, #00f0ff, #8b5cf6)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                }}>
                    ADMIN DASHBOARD
                </h1>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <a href="/" className="btn-neon" style={{ fontSize: '0.75rem', padding: '8px 16px', textDecoration: 'none' }}>View Site</a>
                    <button onClick={onLogout} className="btn-neon" style={{ fontSize: '0.75rem', padding: '8px 16px', borderColor: '#ff4444', color: '#ff4444' }}>Logout</button>
                </div>
            </div>

            {/* Status */}
            {status && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                        padding: '12px 20px',
                        borderRadius: '10px',
                        background: 'rgba(0,240,255,0.05)',
                        border: '1px solid rgba(0,240,255,0.15)',
                        color: '#e0e0ff',
                        marginBottom: '24px',
                        fontFamily: 'Rajdhani, sans-serif',
                        fontSize: '0.95rem',
                    }}
                >
                    {status}
                </motion.div>
            )}

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '32px', flexWrap: 'wrap' }}>
                <button onClick={() => setActiveTab('overview')} style={tabStyle('overview')}>Overview</button>
                <button onClick={() => setActiveTab('uploads')} style={tabStyle('uploads')}>Uploads</button>
                <button onClick={() => setActiveTab('projects')} style={tabStyle('projects')}>Projects</button>
                <button onClick={() => setActiveTab('edit')} style={tabStyle('edit')}>Edit Data</button>
                <button onClick={() => setActiveTab('messages')} style={tabStyle('messages')}>Messages ({contacts.length})</button>
            </div>

            {/* Tab Content */}
            <div className="glass-card" style={{ padding: '32px' }}>
                {/* OVERVIEW TAB */}
                {activeTab === 'overview' && (
                    <div>
                        <h3 style={{ fontFamily: 'Orbitron', fontSize: '1rem', color: '#00f0ff', marginBottom: '24px' }}>Portfolio Overview</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
                            {[
                                { label: 'Name', value: data?.name },
                                { label: 'Title', value: data?.title },
                                { label: 'Skills', value: `${data?.skills?.length || 0} skills` },
                                { label: 'Projects', value: `${data?.projects?.length || 0} projects` },
                                { label: 'Certificates', value: `${data?.certificates?.length || 0} certs` },
                                { label: 'Messages', value: `${contacts.length} messages` },
                            ].map((item, i) => (
                                <div key={i} style={{
                                    padding: '16px',
                                    borderRadius: '12px',
                                    background: 'rgba(0,240,255,0.03)',
                                    border: '1px solid rgba(0,240,255,0.1)',
                                }}>
                                    <p style={labelStyle}>{item.label}</p>
                                    <p style={{ fontFamily: 'Rajdhani', fontSize: '1.1rem', fontWeight: 600, color: '#e0e0ff' }}>{item.value || '--'}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* UPLOADS TAB */}
                {activeTab === 'uploads' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                        <div>
                            <h3 style={{ fontFamily: 'Orbitron', fontSize: '1rem', color: '#8b5cf6', marginBottom: '16px' }}>🖼️ Profile Image</h3>
                            <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'profile')}
                                style={{ fontFamily: 'Rajdhani', color: '#e0e0ff' }} />
                            {data?.profileImage && (
                                <img src={data.profileImage} alt="Profile" style={{ width: 80, height: 80, borderRadius: '50%', marginTop: '12px', border: '2px solid rgba(0,240,255,0.3)', objectFit: 'cover' }} />
                            )}
                        </div>
                        <hr style={{ border: 'none', borderTop: '1px solid rgba(0,240,255,0.1)' }} />
                        <div>
                            <h3 style={{ fontFamily: 'Orbitron', fontSize: '1rem', color: '#ff00ff', marginBottom: '16px' }}>🏆 Certificate Image</h3>
                            <div style={{ display: 'flex', gap: '12px', alignItems: 'end', flexWrap: 'wrap' }}>
                                <div>
                                    <p style={labelStyle}>Certificate Title</p>
                                    <input type="text" id="cert-title" className="neon-input" placeholder="Certificate name" style={{ maxWidth: '300px' }} />
                                </div>
                                <input type="file" accept="image/*" onChange={(e) => {
                                    const title = document.getElementById('cert-title').value || 'Certificate';
                                    handleImageUpload(e, 'certificate', { title });
                                }} style={{ fontFamily: 'Rajdhani', color: '#e0e0ff' }} />
                            </div>
                        </div>
                        <hr style={{ border: 'none', borderTop: '1px solid rgba(0,240,255,0.1)' }} />
                        <div>
                            <h3 style={{ fontFamily: 'Orbitron', fontSize: '1rem', color: '#00ccff', marginBottom: '16px' }}>📄 CV Image (JPG)</h3>
                            <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'cv')}
                                style={{ fontFamily: 'Rajdhani', color: '#e0e0ff' }} />
                            {data?.cvImage && (
                                <img src={data.cvImage} alt="CV" style={{ width: 80, height: 110, marginTop: '12px', border: '2px solid rgba(0,240,255,0.3)', objectFit: 'cover' }} />
                            )}
                        </div>
                    </div>
                )}

                {/* PROJECTS TAB */}
                {activeTab === 'projects' && (
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                            <h3 style={{ fontFamily: 'Orbitron', fontSize: '1rem', color: '#00f0ff' }}>Projects</h3>
                            <button onClick={addProject} className="btn-neon" style={{ fontSize: '0.7rem', padding: '8px 16px' }}>+ Add Project</button>
                        </div>
                        {(data?.projects || []).map((proj, idx) => (
                            <div key={idx} style={{
                                padding: '20px',
                                border: '1px solid rgba(0,240,255,0.1)',
                                borderRadius: '12px',
                                marginBottom: '16px',
                                background: 'rgba(0,240,255,0.02)',
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                    <span style={{ fontFamily: 'Orbitron', fontSize: '0.8rem', color: '#8b5cf6' }}>Project #{idx + 1}</span>
                                    <button onClick={() => removeProject(idx)} style={{ background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer', fontSize: '0.8rem' }}>Remove</button>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                    <div>
                                        <p style={labelStyle}>Title</p>
                                        <input className="neon-input" value={proj.title || ''} onChange={(e) => handleProjectFieldUpdate(idx, 'title', e.target.value)} />
                                    </div>
                                    <div>
                                        <p style={labelStyle}>GitHub URL</p>
                                        <input className="neon-input" value={proj.github || ''} onChange={(e) => handleProjectFieldUpdate(idx, 'github', e.target.value)} />
                                    </div>
                                    <div>
                                        <p style={labelStyle}>Live URL</p>
                                        <input className="neon-input" value={proj.live || ''} onChange={(e) => handleProjectFieldUpdate(idx, 'live', e.target.value)} />
                                    </div>
                                    <div>
                                        <p style={labelStyle}>Tech (comma separated)</p>
                                        <input className="neon-input" value={(proj.tech || []).join(', ')} onChange={(e) => handleProjectFieldUpdate(idx, 'tech', e.target.value.split(',').map(t => t.trim()).filter(t => t))} />
                                    </div>
                                </div>
                                <div style={{ marginTop: '12px' }}>
                                    <p style={labelStyle}>Description</p>
                                    <textarea className="neon-input" rows={2} value={proj.description || ''} onChange={(e) => handleProjectFieldUpdate(idx, 'description', e.target.value)} />
                                </div>
                                <div style={{ marginTop: '12px' }}>
                                    <p style={labelStyle}>Project Image</p>
                                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'project', { projectId: idx.toString() })} style={{ fontFamily: 'Rajdhani', color: '#e0e0ff' }} />
                                    {proj.image && <img src={proj.image} alt="" style={{ width: 80, height: 50, objectFit: 'cover', borderRadius: 6, marginTop: 8, border: '1px solid rgba(0,240,255,0.2)' }} />}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* EDIT DATA TAB */}
                {activeTab === 'edit' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <h3 style={{ fontFamily: 'Orbitron', fontSize: '1rem', color: '#00f0ff' }}>Edit Portfolio Data</h3>
                        <div>
                            <p style={labelStyle}>Name</p>
                            <input className="neon-input" value={data?.name || ''} onChange={(e) => handleFieldUpdate('name', e.target.value)} />
                        </div>
                        <div>
                            <p style={labelStyle}>Title</p>
                            <input className="neon-input" value={data?.title || ''} onChange={(e) => handleFieldUpdate('title', e.target.value)} />
                        </div>
                        <div>
                            <p style={labelStyle}>Summary</p>
                            <textarea className="neon-input" rows={4} value={data?.summary || ''} onChange={(e) => handleFieldUpdate('summary', e.target.value)} />
                        </div>
                        <div>
                            <p style={labelStyle}>Skills (comma separated)</p>
                            <input className="neon-input" value={(data?.skills || []).join(', ')} onChange={(e) => handleFieldUpdate('skills', e.target.value.split(',').map(s => s.trim()).filter(s => s))} />
                        </div>
                        <div>
                            <p style={labelStyle}>Email</p>
                            <input className="neon-input" value={data?.contact?.email || ''} onChange={(e) => handleFieldUpdate('contact', { ...data?.contact, email: e.target.value })} />
                        </div>
                        <div>
                            <p style={labelStyle}>Phone</p>
                            <input className="neon-input" value={data?.contact?.phone || ''} onChange={(e) => handleFieldUpdate('contact', { ...data?.contact, phone: e.target.value })} />
                        </div>
                        <div>
                            <p style={labelStyle}>LinkedIn</p>
                            <input className="neon-input" value={data?.contact?.linkedin || ''} onChange={(e) => handleFieldUpdate('contact', { ...data?.contact, linkedin: e.target.value })} />
                        </div>
                        <div>
                            <p style={labelStyle}>GitHub</p>
                            <input className="neon-input" value={data?.contact?.github || ''} onChange={(e) => handleFieldUpdate('contact', { ...data?.contact, github: e.target.value })} />
                        </div>
                    </div>
                )}

                {/* MESSAGES TAB */}
                {activeTab === 'messages' && (
                    <div>
                        <h3 style={{ fontFamily: 'Orbitron', fontSize: '1rem', color: '#00f0ff', marginBottom: '20px' }}>Contact Messages</h3>
                        {contacts.length === 0 ? (
                            <p style={{ color: '#8888aa', fontFamily: 'Rajdhani' }}>No messages yet.</p>
                        ) : (
                            contacts.map((msg, i) => (
                                <div key={i} style={{
                                    padding: '16px',
                                    border: '1px solid rgba(0,240,255,0.1)',
                                    borderRadius: '10px',
                                    marginBottom: '12px',
                                    background: 'rgba(0,240,255,0.02)',
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                        <span style={{ fontWeight: 600, color: '#e0e0ff' }}>{msg.name}</span>
                                        <span style={{ fontSize: '0.75rem', color: '#8888aa' }}>{new Date(msg.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <p style={{ fontSize: '0.85rem', color: '#00f0ff', marginBottom: '6px' }}>{msg.email}</p>
                                    <p style={{ fontSize: '0.9rem', color: '#b0b0cc', lineHeight: 1.6 }}>{msg.message}</p>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>

            {/* Save Button */}
            {
                (activeTab === 'edit' || activeTab === 'projects') && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{ marginTop: '24px', textAlign: 'center' }}
                    >
                        <button onClick={handleSave} className="btn-neon btn-filled" style={{ padding: '14px 48px' }}>
                            💾 Save Changes
                        </button>
                    </motion.div>
                )
            }
        </div >
    );
}
