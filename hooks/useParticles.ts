import { useEffect, useRef } from 'react';

export interface Particle {
  x: number;
  y: number;
  z: number;
  prevX: number;
  prevY: number;
  speed: number;
  color: string;
  opacity: number;
}

const RED = '#FF3831';

export function createParticle(width: number, height: number, progress: number, particleColor: string): Particle {
  const angle = Math.random() * Math.PI * 2;
  const radius = Math.random() * Math.max(width, height) * 0.6;
  const cx = width / 2;
  const cy = height / 2;

  // Initialize Z with a random depth (0 = camera, 1000 = far away)
  return {
    x: cx + Math.cos(angle) * radius,
    y: cy + Math.sin(angle) * radius,
    z: Math.random() * 1000,
    prevX: cx + Math.cos(angle) * radius,
    prevY: cy + Math.sin(angle) * radius,
    speed: 0.5 + Math.random() * 2,
    color: Math.random() > 0.7 ? RED : particleColor,
    opacity: 0.1 + Math.random() * 0.4,
  };
}

export type ParticleMode = 'manifesto' | 'gallery';

export function useCanvasAnimation(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  progress: number,
  canvasBg: string = '#0F0F0F',
  particleColor: string = '#FFFDDB',
  mode: ParticleMode = 'manifesto',
  velocity: number = 0 // Optional parameter for gallery mode
) {
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    const isMobile = window.innerWidth < 768;
    // Manifesto used 120/50. 
    // Gallery used 250/100, increased by 1/3rd to ~350/135
    const count = mode === 'gallery' ? (isMobile ? 135 : 350) : (isMobile ? 50 : 120);
    particlesRef.current = Array.from({ length: count }, () =>
      createParticle(canvas.offsetWidth, canvas.offsetHeight, 0, particleColor)
    );

    return () => {
      window.removeEventListener('resize', resize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [canvasRef, particleColor, mode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const renderLoop = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      const cx = w / 2;
      const cy = h / 2;

      ctx.globalAlpha = 1;
      ctx.fillStyle = canvasBg;
      ctx.fillRect(0, 0, w, h);

      const particles = particlesRef.current;

      if (mode === 'manifesto') {
        const speedMultiplier =
          progress < 0.4
            ? 0.3 + progress * 0.5
            : progress < 0.7
              ? 0.5 + (progress - 0.4) * 12
              : 4.1 - (progress - 0.7) * 12;

        const trailLength =
          progress < 0.4
            ? 0
            : progress < 0.7
              ? (progress - 0.4) * 3.33
              : 1.0 - (progress - 0.7) * 2.5;

        const globalAlpha =
          progress < 0.4
            ? 0.6
            : progress < 0.7
              ? 0.6 + (progress - 0.4) * 1.3
              : 1.0 - (progress - 0.7) * 0.5;

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.prevX = p.x;
            p.prevY = p.y;
            const dx = p.x - cx;
            const dy = p.y - cy;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;

            if (progress < 0.4) {
                const angle = Math.atan2(dy, dx) + 0.002 * p.speed;
                const newDist = dist + Math.sin(Date.now() * 0.001 + i) * 0.2;
                p.x = cx + Math.cos(angle) * newDist;
                p.y = cy + Math.sin(angle) * newDist;
            } else if (progress < 0.7) {
                const pullStrength = speedMultiplier * p.speed * 0.8;
                p.x -= (dx / dist) * pullStrength;
                p.y -= (dy / dist) * pullStrength;

                if (Math.abs(p.x - cx) < 5 && Math.abs(p.y - cy) < 5) {
                const angle = Math.random() * Math.PI * 2;
                const r = Math.max(w, h) * 0.5 + Math.random() * 100;
                p.x = cx + Math.cos(angle) * r;
                p.y = cy + Math.sin(angle) * r;
                p.prevX = p.x;
                p.prevY = p.y;
                }
            } else {
                const pushStrength = Math.max(0.1, speedMultiplier) * p.speed * 0.3;
                p.x += (dx / dist) * pushStrength;
                p.y += (dy / dist) * pushStrength;
                p.opacity = Math.max(0, p.opacity - 0.003);
            }

            const particleAlpha = p.opacity * globalAlpha;
            if (particleAlpha <= 0) continue;

            ctx.globalAlpha = particleAlpha;

            if (trailLength > 0.05) {
                ctx.beginPath();
                ctx.moveTo(p.prevX, p.prevY);
                ctx.lineTo(p.x, p.y);
                ctx.strokeStyle = p.color;
                ctx.lineWidth = 1 + trailLength * 2;
                ctx.stroke();

                if (trailLength > 0.5) {
                const trailDx = p.x - p.prevX;
                const trailDy = p.y - p.prevY;
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p.x + trailDx * trailLength * 3, p.y + trailDy * trailLength * 3);
                ctx.strokeStyle = p.color;
                ctx.lineWidth = 0.5 + trailLength;
                ctx.globalAlpha = particleAlpha * 0.3;
                ctx.stroke();
                }
            } else {
                ctx.beginPath();
                ctx.arc(p.x, p.y, 1.5 + p.speed * 0.5, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();
            }
        }
        
        if (progress > 0.35 && progress < 0.85) {
            const glowIntensity =
                progress < 0.55
                ? (progress - 0.35) * 5
                : progress < 0.7
                    ? 1
                    : 1 - (progress - 0.7) * 6.67;
        
            const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, w * 0.3);
            gradient.addColorStop(0, `rgba(255, 56, 49, ${0.15 * glowIntensity})`);
            gradient.addColorStop(0.5, `rgba(255, 56, 49, ${0.05 * glowIntensity})`);
            gradient.addColorStop(1, 'rgba(255, 56, 49, 0)');
            ctx.globalAlpha = 1;
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, w, h);
        }
      } else if (mode === 'gallery') {
         // Gallery Mode - 3D Stars flowing towards camera slower
         const avgVelocity = Math.abs(velocity) || 0; 
         const baseSpeed = 0.5; // Slightly faster base drift
         
         // Heavily damp the scroll speed so it doesn't streak out of control
         // previously it was * 1000, which is insanely fast at peak velocity
         const scrollSpeed = Math.min(avgVelocity * 10, 5); 
         
         const movementSpeed = baseSpeed + scrollSpeed;

         for (let i = 0; i < particles.length; i++) {
             const p = particles[i];
             
             p.z -= p.speed * movementSpeed * 2; // Reduced from 5 to 2

             if (p.z < 0) {
                 p.z = 1000 + Math.random() * 200;
                 const angle = Math.random() * Math.PI * 2;
                 const radius = Math.random() * Math.max(w, h) * 0.6;
                 p.x = cx + Math.cos(angle) * radius;
                 p.y = cy + Math.sin(angle) * radius;
                 p.prevX = p.x;
                 p.prevY = p.y;
             }

             const perspectiveValue = 300;
             const scale = perspectiveValue / (perspectiveValue + p.z);
             
             const dx = p.x - cx;
             const dy = p.y - cy;
             
             const screenX = cx + dx * scale;
             const screenY = cy + dy * scale;
             
             // Base size similar to original manifesto dots
             const size = Math.max(0.2, (1.0 + p.speed * 0.3) * scale * 2);
             
             if (screenX >= 0 && screenX <= w && screenY >= 0 && screenY <= h) {
                  // Fade in nicely from deep space
                  const depthAlpha = Math.min(1, (1000 - p.z) / 300); 
                  ctx.globalAlpha = Math.max(0, Math.min(1, p.opacity * depthAlpha)); 
                  
                  // Manifesto particle style: soft glowing dot
                  ctx.beginPath();
                  ctx.arc(screenX, screenY, size, 0, Math.PI * 2);
                  ctx.fillStyle = p.color;
                  
                  // Optional: add a slight glow to match the aesthetic better
                  ctx.shadowBlur = 5;
                  ctx.shadowColor = p.color;
                  
                  ctx.fill();
                  
                  // reset shadow for performance on next iterations if needed
                  ctx.shadowBlur = 0;
             }
         }
      }
      
      if (mode === 'gallery') {
         animFrameRef.current = requestAnimationFrame(renderLoop);
      }
    };

    if (mode === 'manifesto') {
        renderLoop();
    } else {
        if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = requestAnimationFrame(renderLoop);
    }
    
    return () => {
       if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    }

  }, [canvasRef, progress, canvasBg, mode, velocity]);
}
