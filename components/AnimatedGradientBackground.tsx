import { motion } from "framer-motion";
import React, { useEffect, useRef } from "react";

interface AnimatedGradientBackgroundProps {
    startingGap?: number;
    Breathing?: boolean;
    gradientColors?: string[];
    gradientStops?: number[];
    animationSpeed?: number;
    breathingRange?: number;
    containerStyle?: React.CSSProperties;
    containerClassName?: string;
    topOffset?: number;
}

const AnimatedGradientBackground: React.FC<AnimatedGradientBackgroundProps> = ({
    startingGap = 125,
    Breathing = true,
    gradientColors = [
        "#FF3831",    // Brand accent - center
        "#FF5A54",    // Lighter accent
        "#FF3831",    // Brand accent
        "#2A1A1A",    // Dark with red tint
        "#1A1A1A",    // Slightly lighter
        "#0F0F0F",    // Brand bg - edge
        "#0F0F0F",    // Brand bg - outermost
    ],
    gradientStops = [10, 25, 40, 55, 70, 85, 100],
    animationSpeed = 0.02,
    breathingRange = 8,
    containerStyle = {},
    topOffset = 0,
    containerClassName = "",
}) => {
    if (gradientColors.length !== gradientStops.length) {
        throw new Error(
            `GradientColors and GradientStops must have the same length.`
        );
    }

    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        let animationFrame: number;
        let width = startingGap;
        let directionWidth = 1;

        const animateGradient = () => {
            if (width >= startingGap + breathingRange) directionWidth = -1;
            if (width <= startingGap - breathingRange) directionWidth = 1;

            if (!Breathing) directionWidth = 0;
            width += directionWidth * animationSpeed;

            const gradientStopsString = gradientStops
                .map((stop, index) => `${gradientColors[index]} ${stop}%`)
                .join(", ");

            const gradient = `radial-gradient(${width}% ${width + topOffset}% at 50% 0%, ${gradientStopsString})`;

            if (containerRef.current) {
                containerRef.current.style.background = gradient;
            }

            animationFrame = requestAnimationFrame(animateGradient);
        };

        animationFrame = requestAnimationFrame(animateGradient);

        return () => cancelAnimationFrame(animationFrame);
    }, [startingGap, Breathing, gradientColors, gradientStops, animationSpeed, breathingRange, topOffset]);

    return (
        <motion.div
            key="animated-gradient-background"
            initial={{
                opacity: 0,
                scale: 1.2,
            }}
            animate={{
                opacity: 1,
                scale: 1,
                transition: {
                    duration: 1.5,
                    ease: [0.25, 0.1, 0.25, 1],
                },
            }}
            className={`absolute inset-0 overflow-hidden ${containerClassName}`}
        >
            <div
                ref={containerRef}
                style={containerStyle}
                className="absolute inset-0 transition-transform"
            />
        </motion.div>
    );
};

export default AnimatedGradientBackground;
