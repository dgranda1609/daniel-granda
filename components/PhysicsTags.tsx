import React, { useRef, useEffect, useState } from 'react';
import Matter from 'matter-js';

interface PhysicsTagsProps {
    tags: string[];
    isActive: boolean;
}

const PhysicsTags: React.FC<PhysicsTagsProps> = ({ tags, isActive }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const engineRef = useRef<Matter.Engine | null>(null);
    const bodiesRef = useRef<Matter.Body[]>([]);
    const animationRef = useRef<number | null>(null);
    const [positions, setPositions] = useState<{ x: number; y: number; angle: number }[]>([]);
    const [dimensions, setDimensions] = useState<{ width: number; height: number }[]>([]);
    const initializedRef = useRef(false);

    // Measure tag dimensions
    useEffect(() => {
        if (!containerRef.current) return;

        const measureTags = () => {
            const tempContainer = document.createElement('div');
            tempContainer.style.position = 'absolute';
            tempContainer.style.visibility = 'hidden';
            tempContainer.style.display = 'flex';
            tempContainer.style.gap = '12px';
            tempContainer.style.flexWrap = 'wrap';
            document.body.appendChild(tempContainer);

            const dims = tags.map(tag => {
                const span = document.createElement('span');
                span.className = 'border border-brand-primary/20 px-16 py-4 rounded-full text-12 bg-brand-bg/80';
                span.textContent = tag;
                tempContainer.appendChild(span);
                const rect = span.getBoundingClientRect();
                return { width: rect.width + 4, height: rect.height + 4 };
            });

            document.body.removeChild(tempContainer);
            setDimensions(dims);
        };

        measureTags();
    }, [tags]);

    // Initialize physics when active
    useEffect(() => {
        if (!isActive || !containerRef.current || dimensions.length === 0) {
            // Reset when not active
            if (!isActive && initializedRef.current) {
                if (animationRef.current) {
                    cancelAnimationFrame(animationRef.current);
                }
                if (engineRef.current) {
                    Matter.Engine.clear(engineRef.current);
                    Matter.World.clear(engineRef.current.world, false);
                }
                initializedRef.current = false;
                setPositions([]);
            }
            return;
        }

        if (initializedRef.current) return;
        initializedRef.current = true;

        const container = containerRef.current;
        const containerWidth = container.offsetWidth;
        const containerHeight = 80; // Fixed height for physics simulation

        // Create engine
        const engine = Matter.Engine.create({
            gravity: { x: 0, y: 1.2 }
        });
        engineRef.current = engine;

        // Create ground
        const ground = Matter.Bodies.rectangle(
            containerWidth / 2,
            containerHeight + 10,
            containerWidth + 100,
            20,
            { isStatic: true, friction: 0.8 }
        );

        // Create walls
        const leftWall = Matter.Bodies.rectangle(
            -10,
            containerHeight / 2,
            20,
            containerHeight * 2,
            { isStatic: true }
        );
        const rightWall = Matter.Bodies.rectangle(
            containerWidth + 10,
            containerHeight / 2,
            20,
            containerHeight * 2,
            { isStatic: true }
        );

        // Create tag bodies - spawn from center top of container
        const bodies = tags.map((_, index) => {
            const dim = dimensions[index] || { width: 80, height: 30 };
            // Spawn within center 40% of container width
            const spawnWidth = containerWidth * 0.4;
            const spawnStart = (containerWidth - spawnWidth) / 2;
            const x = spawnStart + Math.random() * spawnWidth;
            const y = -30 - Math.random() * 60; // Start above container

            return Matter.Bodies.rectangle(x, y, dim.width, dim.height, {
                chamfer: { radius: dim.height / 2 }, // Rounded corners
                restitution: 0.4, // Bounciness
                friction: 0.3,
                frictionAir: 0.02,
                density: 0.002,
            });
        });

        bodiesRef.current = bodies;

        // Add all bodies to world
        Matter.World.add(engine.world, [ground, leftWall, rightWall, ...bodies]);

        // Animation loop
        const animate = () => {
            Matter.Engine.update(engine, 1000 / 60);

            const newPositions = bodies.map(body => ({
                x: body.position.x,
                y: body.position.y,
                angle: body.angle
            }));

            setPositions(newPositions);
            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [isActive, dimensions, tags]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            if (engineRef.current) {
                Matter.Engine.clear(engineRef.current);
            }
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative w-full"
            style={{ height: '80px', zIndex: 50 }}
        >
            {tags.map((tag, index) => {
                const pos = positions[index];
                const dim = dimensions[index] || { width: 80, height: 30 };

                if (!pos || !isActive) {
                    // Initial hidden state
                    return (
                        <span
                            key={tag}
                            className="absolute opacity-0 border border-brand-primary/20 px-16 py-4 rounded-full text-12 bg-brand-bg/80 backdrop-blur-md text-brand-primary shadow-lg whitespace-nowrap"
                        >
                            {tag}
                        </span>
                    );
                }

                return (
                    <span
                        key={tag}
                        className="absolute border border-brand-primary/20 px-16 py-4 rounded-full text-12 bg-brand-bg/80 backdrop-blur-md text-brand-primary shadow-lg whitespace-nowrap transition-opacity duration-300"
                        style={{
                            left: pos.x - dim.width / 2,
                            top: pos.y - dim.height / 2,
                            transform: `rotate(${pos.angle}rad)`,
                            opacity: pos.y > 0 ? 1 : 0,
                            zIndex: 50,
                        }}
                    >
                        {tag}
                    </span>
                );
            })}
        </div>
    );
};

export default PhysicsTags;
