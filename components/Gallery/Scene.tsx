import React, { useRef, useMemo, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue, useVelocity } from 'framer-motion';
import { useCanvasAnimation } from '../../hooks/useParticles';
import { WordReveal } from '../Manifesto';

export interface GalleryProject {
  id: string;
  title: string;
  category: string;
  image: string;
  year: string;
}

interface SceneProps {
  projects: GalleryProject[];
}

const NarrativeText = ({ text, scrollYProgress, start, end, highlightWord, alignClass, textAlign }: {text: string, scrollYProgress: MotionValue<number>, start: number, end: number, highlightWord?: string, alignClass: string, textAlign: string}) => {
  const opacity = useTransform(
    scrollYProgress, 
    [start, start + 0.05, end - 0.05, end], 
    [0, 1, 1, 0]
  );
  
  const blur = useTransform(
    scrollYProgress,
    [start, start + 0.05, end - 0.05, end],
    ["blur(15px)", "blur(0px)", "blur(0px)", "blur(15px)"]
  );
  
  const [wordProgress, setWordProgress] = useState(0);
  useEffect(() => {
    return scrollYProgress.on('change', (val) => {
      if (val < start) setWordProgress(0);
      else if (val > start + 0.1) setWordProgress(1);
      else setWordProgress((val - start) / 0.1);
    });
  }, [scrollYProgress, start]);

  return (
    <motion.div
      style={{ opacity, filter: blur }}
      className={`absolute ${alignClass} flex flex-col pointer-events-none max-w-[80vw] md:max-w-3xl`}
    >
      <h2 className={`font-serif text-36 md:text-56 lg:text-[76px] font-medium italic tracking-tight ${textAlign} leading-[1.05] text-brand-primary mix-blend-difference drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)]`}>
        <WordReveal text={text} progress={wordProgress} highlightWord={highlightWord} />
      </h2>
    </motion.div>
  );
};

// Helper to generate random positions but keep them deterministic based on index
const getRandomPos = (index: number) => {
  const seed = index * 123.45; // Simple deterministic seed
  const x = Math.sin(seed) * 10; // -10% to 10% (Tighter spread)
  const y = Math.cos(seed * 0.5) * 8; // -8% to 8% (Tighter spread)
  const r = Math.sin(seed * 2) * 2; // Rotation -2deg to 2deg (Subtle)
  return { x, y, r };
};

const GAP = 800; // Reduced gap for denser feel

const ProjectItem: React.FC<{ project: GalleryProject; index: number; scrollYProgress: MotionValue<number>; totalItems: number }> = ({ project, index, scrollYProgress, totalItems }) => {
  const { x, y, r } = useMemo(() => getRandomPos(index), [index]);
  
  const totalDepth = totalItems * GAP;
  
  // Transform scroll progress into a cyclic Z position
  const z = useTransform(scrollYProgress, (latest: number) => {
    // Map 0-1 scroll to a very long distance
    const scrollDistance = latest * 30000; 
    
    const baseZ = index * GAP;
    
    // We want items to come towards the camera (increasing Z)
    // So we ADD scrollDistance to baseZ
    const forwardZ = (baseZ + scrollDistance) % totalDepth;
    
    // forwardZ goes 0 -> totalDepth.
    // We want items to start far back (e.g. -4000) and move to +1500.
    // So we shift the range.
    let shiftedZ = forwardZ - 4000;
    
    return shiftedZ;
  });

  const opacity = useTransform(z, (latestZ) => {
    // Fade in from deep background (-3000 to -1000)
    if (latestZ < -1000) {
        return Math.max(0, (latestZ + 3000) / 2000);
    }
    // Fade out earlier to prevent them from getting too big
    // Start fading at 200, gone by 600
    if (latestZ > 200) {
        return Math.max(0, 1 - (latestZ - 200) / 400);
    }
    return 1;
  });

  // Culling: Hide elements that are invisible to save GPU
  const display = useTransform(opacity, (v) => v <= 0.05 ? 'none' : 'block');

  // Reduced blur for performance
  const blur = useTransform(z, (latestZ) => {
     if (latestZ < -1000) return 4; // Constant low blur for background
     if (latestZ > 200) return 4; // Blur when fading out
     return 0;
  });
  
  const scale = useTransform(z, (latestZ) => {
    // Perspective projection approximation
    const perspective = 1000;
    // Protect against division by zero or negative
    const dist = Math.max(100, perspective - latestZ); 
    // Increased multiplier to keep max size 1/4th larger
    return (perspective / dist) * 0.75; 
  });

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: `calc(50% + ${x}%)`,
        top: `calc(50% + ${y}%)`,
        z,
        opacity,
        display,
        scale,
        rotate: r,
        // Only apply blur if it's significant, otherwise 'none' to save GPU
        filter: useTransform(blur, (v) => v > 0 ? `blur(${v}px)` : 'none'),
        x: '-50%',
        y: '-50%',
      }}
      className="w-1/3 md:w-3/12 aspect-video pointer-events-none will-change-transform"
    >
      <div className="w-full h-full relative group">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover grayscale contrast-125 brightness-75 group-hover:grayscale-0 transition-all duration-700 ease-out shadow-2xl"
          loading="lazy"
        />
        <div className="absolute -bottom-12 left-0 text-brand-primary mix-blend-difference whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="text-[10px] uppercase tracking-[0.2em]">{project.category}</p>
          <h3 className="text-xl font-light uppercase tracking-tight">{project.title}</h3>
        </div>
      </div>
    </motion.div>
  );
};

export const Scene = ({ projects }: SceneProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothScroll = useSpring(scrollYProgress, {
    damping: 30,
    stiffness: 90,
    mass: 0.6
  });

  const scrollVelocity = useVelocity(smoothScroll);
  const [velocity, setVelocity] = useState(0);

  useEffect(() => {
    return scrollVelocity.on("change", (latest) => {
      setVelocity(latest);
    });
  }, [scrollVelocity]);

  // Gallery mode for starfield effect
  useCanvasAnimation(canvasRef, 0, '#0a0a0a', '#FFFDDB', 'gallery', velocity);

  return (
    <div ref={containerRef} style={{ height: '1600vh' }} className="w-full bg-[#0a0a0a] relative z-10">
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden perspective-container">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }} />
        <div className="w-full h-full relative preserve-3d flex items-center justify-center z-10">
           {/* Center Text */}
           <motion.div 
             style={{ 
               opacity: useTransform(smoothScroll, [0, 0.02], [1, 0]),
               scale: useTransform(smoothScroll, [0, 0.02], [1, 0.9]),
               filter: useTransform(smoothScroll, [0, 0.02], ["blur(0px)", "blur(10px)"])
             }}
             className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
           >
             <div className="text-brand-primary text-center mix-blend-difference">
               <p className="text-xs uppercase tracking-[0.5em] mb-6 text-brand-primary opacity-50">Portfolio</p>
               <h1 className="text-6xl md:text-9xl font-serif font-light leading-[0.8]">
                 <span className="italic">Selected</span>
                 <br />
                 <span className="italic">Works</span>
               </h1>
             </div>
           </motion.div>

           {/* 3D Items */}
           {projects.map((project, index) => (
             <ProjectItem 
               key={project.id} 
               project={project} 
               index={index} 
               scrollYProgress={smoothScroll}
               totalItems={projects.length}
             />
           ))}
        </div>

        {/* Overlay Narrative Texts (Outside 3D context to guarantee top Z-index) */}
        <div className="absolute inset-0 pointer-events-none z-[100]">
          <NarrativeText alignClass="top-[25vh] left-[20vw] md:left-[25vw] items-start" textAlign="text-left" text="I've seen through a lens since I was little." scrollYProgress={smoothScroll} start={0.1} end={0.28} highlightWord="lens" />
          <NarrativeText alignClass="top-[35vh] right-[20vw] md:right-[25vw] items-end" textAlign="text-right" text="Now, AI expands what's possible." scrollYProgress={smoothScroll} start={0.32} end={0.5} highlightWord="possible" />
          <NarrativeText alignClass="bottom-[35vh] left-[20vw] md:left-[25vw] items-start" textAlign="text-left" text="We iterate faster and push boundaries." scrollYProgress={smoothScroll} start={0.54} end={0.72} highlightWord="boundaries" />
          <NarrativeText alignClass="bottom-[25vh] right-[20vw] md:right-[25vw] items-end" textAlign="text-right" text="But the human eye defines the vision." scrollYProgress={smoothScroll} start={0.76} end={0.95} highlightWord="vision" />
        </div>
      </div>
    </div>
  );
};
