import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

export default function FloatingCard({ position = [0, 0, 0], title = '', color = '#00f0ff', onClick, index = 0 }) {
    const meshRef = useRef();
    const [hovered, setHovered] = useState(false);
    const baseY = position[1];

    useFrame((state) => {
        if (meshRef.current) {
            // Anti-gravity floating animation
            meshRef.current.position.y = baseY + Math.sin(state.clock.elapsedTime * 0.8 + index * 1.5) * 0.3;
            meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3 + index) * 0.1;
            meshRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.2 + index) * 0.05;

            // Hover scale
            const targetScale = hovered ? 1.1 : 1;
            meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
        }
    });

    return (
        <group
            ref={meshRef}
            position={position}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onClick={onClick}
        >
            <RoundedBox args={[2.8, 1.8, 0.15]} radius={0.1} smoothness={4}>
                <meshPhysicalMaterial
                    color={color}
                    transparent
                    opacity={hovered ? 0.25 : 0.15}
                    roughness={0.1}
                    metalness={0.8}
                    clearcoat={1}
                    side={THREE.DoubleSide}
                />
            </RoundedBox>

            {/* Neon border glow */}
            <RoundedBox args={[2.85, 1.85, 0.12]} radius={0.1} smoothness={4}>
                <meshBasicMaterial
                    color={color}
                    transparent
                    opacity={hovered ? 0.4 : 0.15}
                    wireframe
                />
            </RoundedBox>

            {title && (
                <Text
                    position={[0, 0, 0.1]}
                    fontSize={0.18}
                    color={color}
                    font="https://fonts.gstatic.com/s/orbitron/v31/yMJMMIlzdpvBhQQL_SC3X9yhF25-T1nyGy6xpmIyXjU1pg.woff2"
                    maxWidth={2.4}
                    textAlign="center"
                    anchorX="center"
                    anchorY="middle"
                >
                    {title}
                </Text>
            )}
        </group>
    );
}
