import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, MeshWobbleMaterial, Icosahedron } from '@react-three/drei';
import * as THREE from 'three';

const KineticPolyhedron = () => {
    const groupRef = useRef();
    const yinRef = useRef();
    const yangRef = useRef();
    const ringsRef = useRef([]);
    const { viewport } = useThree();

    const scale = useMemo(() => viewport.width < 5 ? 1.0 : 1.8, [viewport.width]);

    useFrame((state) => {
        const { clock, mouse } = state;
        const time = clock.getElapsedTime();

        if (groupRef.current) {
            groupRef.current.rotation.y = time * 0.1 + mouse.x * 0.2;
            groupRef.current.rotation.z = Math.sin(time * 0.2) * 0.1;
        }

        // Yin-Yang Orbit/Rotation
        if (yinRef.current && yangRef.current) {
            const orbitRotation = time * 0.5;
            const distance = 0.55;

            // Positioning like Yin/Yang components
            yinRef.current.position.set(
                Math.cos(orbitRotation) * distance,
                Math.sin(orbitRotation) * distance,
                0
            );
            yangRef.current.position.set(
                Math.cos(orbitRotation + Math.PI) * distance,
                Math.sin(orbitRotation + Math.PI) * distance,
                0
            );

            // Individual "Jelly" rotations
            yinRef.current.rotation.z = -time * 0.3;
            yangRef.current.rotation.z = -time * 0.3;
        }

        ringsRef.current.forEach((ring, i) => {
            if (ring) {
                ring.rotation.x = time * (0.2 + i * 0.1);
                ring.rotation.y = time * (0.3 + i * 0.05);
            }
        });
    });

    return (
        <group ref={groupRef} scale={scale}>
            <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
                {/* Yin - The Black Jelly */}
                <Icosahedron ref={yinRef} args={[0.85, 15]}>
                    <MeshDistortMaterial
                        color="#050505"
                        speed={3}
                        distort={0.4}
                        roughness={0.1}
                        metalness={0.9}
                        emissive="#000000"
                    />
                </Icosahedron>

                {/* Yang - The White Jelly */}
                <Icosahedron ref={yangRef} args={[0.85, 15]}>
                    <MeshDistortMaterial
                        color="#ffffff"
                        speed={3}
                        distort={0.4}
                        roughness={0.1}
                        metalness={0.8}
                        emissive="#ffffff"
                        emissiveIntensity={0.2}
                    />
                </Icosahedron>

                {/* Internal Lights for Yin/Yang */}
                <pointLight position={[1, 1, 1]} intensity={5} color="#ffffff" distance={10} />
                <pointLight position={[-1, -1, -1]} intensity={2} color="var(--accent-papaya)" distance={10} />

                {/* Rotating Glass Rings */}
                {[...Array(3)].map((_, i) => (
                    <mesh
                        key={i}
                        ref={(el) => (ringsRef.current[i] = el)}
                        rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
                    >
                        <torusGeometry args={[2.2 + i * 0.3, 0.012, 16, 100]} />
                        <meshPhysicalMaterial
                            color={i % 2 === 0 ? "var(--accent-papaya)" : "var(--white)"}
                            transmission={1}
                            thickness={1}
                            roughness={0.1}
                            metalness={0.5}
                            transparent
                            opacity={0.3}
                        />
                    </mesh>
                ))}

                {/* Shards */}
                {[...Array(15)].map((_, i) => (
                    <mesh
                        key={`shard-${i}`}
                        position={[
                            (Math.random() - 0.5) * 8,
                            (Math.random() - 0.5) * 8,
                            (Math.random() - 0.5) * 8,
                        ]}
                    >
                        <tetrahedronGeometry args={[0.03, 0]} />
                        <meshBasicMaterial color={i % 2 === 0 ? "var(--accent-papaya)" : "var(--white)"} transparent opacity={0.4} />
                    </mesh>
                ))}
            </Float>
        </group>
    );
};

export default KineticPolyhedron;
