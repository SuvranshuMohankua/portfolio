import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Sphere } from '@react-three/drei';
import * as THREE from 'three';

function SkillNode({ skill, index, total, radius = 4 }) {
    const groupRef = useRef();
    const phi = Math.acos(-1 + (2 * index) / total);
    const theta = Math.sqrt(total * Math.PI) * phi;

    const basePosition = useMemo(() => [
        radius * Math.cos(theta) * Math.sin(phi),
        radius * Math.sin(theta) * Math.sin(phi) * 0.6,
        radius * Math.cos(phi)
    ], [radius, theta, phi]);

    const colors = ['#FF3F21', '#ffffff', '#FF3F21', '#ffffff', '#FF3F21', '#ffffff'];
    const color = colors[index % colors.length];

    useFrame((state) => {
        if (groupRef.current) {
            const time = state.clock.elapsedTime;
            const orbitSpeed = 0.1;

            // Orbital rotation
            const angle = time * orbitSpeed + (index * Math.PI * 2) / total;
            const x = basePosition[0] * Math.cos(angle * 0.3) - basePosition[2] * Math.sin(angle * 0.3);
            const z = basePosition[0] * Math.sin(angle * 0.3) + basePosition[2] * Math.cos(angle * 0.3);
            const y = basePosition[1] + Math.sin(time * 0.5 + index) * 0.3;

            groupRef.current.position.set(x, y, z);

            // Always face camera
            groupRef.current.lookAt(0, 0, 0);
            groupRef.current.rotateY(Math.PI);
        }
    });

    return (
        <group ref={groupRef}>
            {/* Node sphere */}
            <Sphere args={[0.08, 16, 16]}>
                <meshBasicMaterial color={color} />
            </Sphere>

            {/* Label */}
            <Text
                position={[0, 0.4, 0]}
                fontSize={0.25}
                color={color}
                anchorX="center"
                anchorY="middle"
                font="https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeMZhrib2Bg-4.woff2"
            >
                {skill}
            </Text>
        </group>
    );
}

export default function SkillOrbit({ skills = [] }) {
    const groupRef = useRef();

    return (
        <group ref={groupRef}>
            {/* Central glowing sphere (Silver/Black core) */}
            <Sphere args={[0.5, 32, 32]}>
                <meshPhysicalMaterial
                    color="var(--silver)"
                    roughness={0.1}
                    metalness={1}
                    emissive="#111111"
                    emissiveIntensity={0.5}
                />
            </Sphere>

            {/* Orbit rings (Papaya Red) */}
            {[3, 4.5, 6].map((r, i) => (
                <mesh key={i} rotation={[Math.PI / 2 + i * 0.4, i * 0.6, 0]}>
                    <torusGeometry args={[r, 0.005, 16, 100]} />
                    <meshBasicMaterial color="var(--accent-papaya)" transparent opacity={0.2} />
                </mesh>
            ))}

            {/* Skill nodes */}
            {skills.map((skill, i) => (
                <SkillNode key={i} skill={skill} index={i} total={skills.length} />
            ))}
        </group>
    );
}
