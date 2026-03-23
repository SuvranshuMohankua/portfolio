import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Icosahedron, Tetrahedron, Octahedron, Box, Cylinder, Cone } from '@react-three/drei';
import { useScroll, useTransform } from 'framer-motion';
import { motion } from 'framer-motion-3d';

const Decoration = ({ type, position, color, scale = 1, speed = 1, scrollScale, scrollOpacity }) => {
    const ref = useRef();

    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.x += 0.01 * speed;
            ref.current.rotation.y += 0.015 * speed;
        }
    });

    const Geometry = type === 'icosahedron' ? Icosahedron :
        type === 'tetrahedron' ? Tetrahedron :
            type === 'octahedron' ? Octahedron :
                type === 'cylinder' ? Cylinder :
                    type === 'cone' ? Cone : Box;

    return (
        <Float speed={speed * 2} rotationIntensity={1} floatIntensity={1}>
            <motion.group scale={scrollScale} opacity={scrollOpacity}>
                <Geometry ref={ref} args={[1]} position={position} scale={scale}>
                    <meshStandardMaterial
                        color={color}
                        roughness={0.2}
                        metalness={0.8}
                    />
                </Geometry>
            </motion.group>
        </Float>
    );
};

export const SectionDecorations = ({ index }) => {
    const { scrollYProgress } = useScroll();

    // Use wider, safer intervals for the global scroll deco
    const start = (index - 1) * 0.14;
    const end = index * 0.14;
    const exit = (index + 1) * 0.14;

    const scrollScale = useTransform(scrollYProgress, [start, end, exit], [0, 1.2, 0]);
    const scrollOpacity = useTransform(scrollYProgress, [start, end, exit], [0, 1, 0]);

    switch (index) {
        case 2: // About
            return (
                <group>
                    <Decoration type="tetrahedron" position={[-4, 2, -2]} color="var(--accent-papaya)" scale={0.5} speed={1.2} scrollScale={scrollScale} scrollOpacity={scrollOpacity} />
                    <Decoration type="cylinder" position={[4, -2, -3]} color="var(--white)" scale={0.6} speed={0.8} scrollScale={scrollScale} scrollOpacity={scrollOpacity} />
                    <Decoration type="cone" position={[0, -4, -5]} color="var(--accent-papaya)" scale={0.4} speed={1.1} scrollScale={scrollScale} scrollOpacity={scrollOpacity} />
                </group>
            );
        case 3: // Skills
            return (
                <group>
                    <Decoration type="box" position={[-5, -1, -4]} color="var(--white)" scale={0.4} speed={1.5} scrollScale={scrollScale} scrollOpacity={scrollOpacity} />
                    <Decoration type="cylinder" position={[5, 1, -2]} color="var(--accent-papaya)" scale={0.8} speed={1} scrollScale={scrollScale} scrollOpacity={scrollOpacity} />
                    <Decoration type="tetrahedron" position={[-2, 4, -3]} color="var(--white)" scale={0.5} speed={1.3} scrollScale={scrollScale} scrollOpacity={scrollOpacity} />
                </group>
            );
        case 4: // Projects
            return (
                <group>
                    <Decoration type="icosahedron" position={[-3, 3, -5]} color="var(--white)" scale={0.7} speed={0.9} scrollScale={scrollScale} scrollOpacity={scrollOpacity} />
                    <Decoration type="cone" position={[3, -3, -4]} color="var(--accent-papaya)" scale={0.6} speed={1.1} scrollScale={scrollScale} scrollOpacity={scrollOpacity} />
                    <Decoration type="cylinder" position={[-5, -2, -6]} color="var(--white)" scale={0.5} speed={0.7} scrollScale={scrollScale} scrollOpacity={scrollOpacity} />
                </group>
            );
        default:
            return null;
    }
};
