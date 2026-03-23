import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ParticleGalaxy() {
    const pointsRef = useRef();
    const particleCount = 5000;

    const [positions, colors, sizes] = useMemo(() => {
        const pos = new Float32Array(particleCount * 3);
        const col = new Float32Array(particleCount * 3);
        const siz = new Float32Array(particleCount);

        const colorOptions = [
            new THREE.Color('#00f0ff'),
            new THREE.Color('#8b5cf6'),
            new THREE.Color('#ff00ff'),
            new THREE.Color('#3b82f6'),
            new THREE.Color('#ffffff'),
        ];

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;

            // Galaxy spiral distribution
            const radius = Math.random() * 50 + 2;
            const spinAngle = radius * 0.5;
            const branchAngle = (i % 3) * ((2 * Math.PI) / 3);

            const randomX = (Math.random() - 0.5) * Math.pow(Math.random(), 3) * radius * 0.4;
            const randomY = (Math.random() - 0.5) * Math.pow(Math.random(), 3) * radius * 0.15;
            const randomZ = (Math.random() - 0.5) * Math.pow(Math.random(), 3) * radius * 0.4;

            pos[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
            pos[i3 + 1] = randomY;
            pos[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

            // Color
            const color = colorOptions[Math.floor(Math.random() * colorOptions.length)];
            const mixRatio = radius / 50;
            const innerColor = new THREE.Color('#00f0ff');
            const outerColor = color;
            const mixed = innerColor.clone().lerp(outerColor, mixRatio);

            col[i3] = mixed.r;
            col[i3 + 1] = mixed.g;
            col[i3 + 2] = mixed.b;

            siz[i] = Math.random() * 2 + 0.5;
        }

        return [pos, col, siz];
    }, []);

    useFrame((state) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y += 0.0003;
            pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.05;
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particleCount}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={particleCount}
                    array={colors}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-size"
                    count={particleCount}
                    array={sizes}
                    itemSize={1}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.15}
                vertexColors
                transparent
                opacity={0.8}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </points>
    );
}
