import React, { useState, useRef } from 'react';
import { FiVolume2, FiVolumeX } from 'react-icons/fi';

// For Vite, files in the 'public' folder are served from the root path.
// The file should be at: client/public/audio/music.mp3
const MUSIC_PATH = '/audio/music.mp3';

export default function SoundToggle() {
    const [playing, setPlaying] = useState(false);
    const audioRef = useRef(null);

    const toggleSound = () => {
        if (!audioRef.current) {
            console.log("Initializing audio with path:", MUSIC_PATH);
            audioRef.current = new Audio(MUSIC_PATH);
            audioRef.current.loop = true;
            audioRef.current.volume = 0.5;

            audioRef.current.addEventListener('error', (e) => {
                console.error("Audio Load Error:", e);
                alert("Could not load 'music.mp3'. Please check if it's in client/public/audio/ folder and named exactly 'music.mp3'.");
            });
        }

        if (playing) {
            console.log("Pausing audio...");
            audioRef.current.pause();
            setPlaying(false);
        } else {
            console.log("Attempting to play audio...");
            audioRef.current.play()
                .then(() => {
                    console.log("Audio playing successfully.");
                    setPlaying(true);
                })
                .catch(err => {
                    console.error("Playback failed:", err);
                    alert("Playback blocked by browser or file missing. Ensure the file is in 'public/audio/' and try clicking the button again.");
                });
        }
    };

    return (
        <button
            onClick={toggleSound}
            aria-label={playing ? 'Mute' : 'Play Sound'}
            style={{
                position: 'fixed',
                bottom: '2rem',
                right: '2rem',
                zIndex: 1000,
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                border: '1px solid var(--border)',
                background: 'var(--bg-glass)',
                backdropFilter: 'blur(10px)',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'var(--transition)',
                boxShadow: playing ? '0 0 20px var(--accent-papaya)' : 'none'
            }}
        >
            {playing ? <FiVolume2 size={20} /> : <FiVolumeX size={20} />}
            {playing && (
                <span className="recording-dot" style={{
                    position: 'absolute',
                    top: '2px',
                    right: '2px',
                    width: '8px',
                    height: '8px',
                    background: 'var(--accent-papaya)',
                    borderRadius: '50%',
                    animation: 'pulse 1s infinite'
                }} />
            )}
        </button>
    );
}


