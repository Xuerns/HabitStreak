import svgPaths from "../imports/svg-1k1az2jwy3";
import { useState, useEffect } from "react";

interface FireIconProps {
  level: 1 | 2 | 3 | 4 | 5 | 6 | number;
  className?: string;
}

export function FireIcon({ level, className = "" }: FireIconProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [flickerOffset, setFlickerOffset] = useState({ x: 0, y: 0, skew: 0, scaleY: 1, brightness: 1 });
  
  const colorConfigs = {
    1: {
      // Kekuningan (Yellowish)
      gradient1: [
        { offset: 0.314, color: "#FDD835" },
        { offset: 0.662, color: "#FBC02D" },
        { offset: 0.972, color: "#F9A825" }
      ],
      gradient2: [
        { offset: 0.214, color: "#FFEB3B" },
        { offset: 0.328, color: "#FFF59D" },
        { offset: 0.487, color: "#FFF9C4" },
        { offset: 0.672, color: "#FFFDE7" },
        { offset: 0.793, color: "#FFFDE7" },
        { offset: 0.822, color: "#FFFDE7", opacity: 0.804 },
        { offset: 0.863, color: "#FFF9C4", opacity: 0.529 },
        { offset: 0.91, color: "#FFF59D", opacity: 0.209 },
        { offset: 0.941, color: "#FFEB3B", opacity: 0 }
      ],
      particles: []
    },
    2: {
      // Default (Orange)
      gradient1: [
        { offset: 0.314, color: "#FF9800" },
        { offset: 0.662, color: "#FF6D00" },
        { offset: 0.972, color: "#F44336" }
      ],
      gradient2: [
        { offset: 0.214, color: "#FFF176" },
        { offset: 0.328, color: "#FFF27D" },
        { offset: 0.487, color: "#FFF48F" },
        { offset: 0.672, color: "#FFF7AD" },
        { offset: 0.793, color: "#FFF9C4" },
        { offset: 0.822, color: "#FFF8BD", opacity: 0.804 },
        { offset: 0.863, color: "#FFF6AB", opacity: 0.529 },
        { offset: 0.91, color: "#FFF38D", opacity: 0.209 },
        { offset: 0.941, color: "#FFF176", opacity: 0 }
      ],
      particles: [
        { cx: 25, cy: 70, r: 2, opacity: 0.6 }
      ]
    },
    3: {
      // Keorenan (More Orange)
      gradient1: [
        { offset: 0.314, color: "#FF6F00" },
        { offset: 0.662, color: "#E65100" },
        { offset: 0.972, color: "#D84315" }
      ],
      gradient2: [
        { offset: 0.214, color: "#FFD54F" },
        { offset: 0.328, color: "#FFCA28" },
        { offset: 0.487, color: "#FFB300" },
        { offset: 0.672, color: "#FFA726" },
        { offset: 0.793, color: "#FF9800" },
        { offset: 0.822, color: "#FF9800", opacity: 0.804 },
        { offset: 0.863, color: "#FFB300", opacity: 0.529 },
        { offset: 0.91, color: "#FFCA28", opacity: 0.209 },
        { offset: 0.941, color: "#FFD54F", opacity: 0 }
      ],
      particles: [
        { cx: 25, cy: 70, r: 2, opacity: 0.6 },
        { cx: 75, cy: 60, r: 1.5, opacity: 0.5 },
        { cx: 35, cy: 85, r: 1.8, opacity: 0.4 }
      ]
    },
    4: {
      // Kemerahan (Reddish)
      gradient1: [
        { offset: 0.314, color: "#F44336" },
        { offset: 0.662, color: "#D32F2F" },
        { offset: 0.972, color: "#B71C1C" }
      ],
      gradient2: [
        { offset: 0.214, color: "#FFCDD2" },
        { offset: 0.328, color: "#EF9A9A" },
        { offset: 0.487, color: "#E57373" },
        { offset: 0.672, color: "#EF5350" },
        { offset: 0.793, color: "#F44336" },
        { offset: 0.822, color: "#F44336", opacity: 0.804 },
        { offset: 0.863, color: "#E57373", opacity: 0.529 },
        { offset: 0.91, color: "#EF9A9A", opacity: 0.209 },
        { offset: 0.941, color: "#FFCDD2", opacity: 0 }
      ],
      particles: [
        { cx: 25, cy: 70, r: 2, opacity: 0.6 },
        { cx: 75, cy: 60, r: 1.5, opacity: 0.5 },
        { cx: 35, cy: 85, r: 1.8, opacity: 0.4 },
        { cx: 65, cy: 75, r: 1.2, opacity: 0.5 },
        { cx: 20, cy: 55, r: 1.6, opacity: 0.4 }
      ]
    },
    5: {
      // Keunguan (Purplish)
      gradient1: [
        { offset: 0.314, color: "#E91E63" },
        { offset: 0.662, color: "#9C27B0" },
        { offset: 0.972, color: "#673AB7" }
      ],
      gradient2: [
        { offset: 0.214, color: "#F8BBD0" },
        { offset: 0.328, color: "#F48FB1" },
        { offset: 0.487, color: "#EC407A" },
        { offset: 0.672, color: "#E91E63" },
        { offset: 0.793, color: "#C2185B" },
        { offset: 0.822, color: "#C2185B", opacity: 0.804 },
        { offset: 0.863, color: "#EC407A", opacity: 0.529 },
        { offset: 0.91, color: "#F48FB1", opacity: 0.209 },
        { offset: 0.941, color: "#F8BBD0", opacity: 0 }
      ],
      particles: [
        { cx: 25, cy: 70, r: 2, opacity: 0.6 },
        { cx: 75, cy: 60, r: 1.5, opacity: 0.5 },
        { cx: 35, cy: 85, r: 1.8, opacity: 0.4 },
        { cx: 65, cy: 75, r: 1.2, opacity: 0.5 },
        { cx: 20, cy: 55, r: 1.6, opacity: 0.4 },
        { cx: 80, cy: 50, r: 1.4, opacity: 0.6 },
        { cx: 45, cy: 95, r: 1.3, opacity: 0.3 }
      ]
    },
    6: {
      // Biru keunguan (Blue-Purple)
      gradient1: [
        { offset: 0.314, color: "#9C27B0" },
        { offset: 0.662, color: "#673AB7" },
        { offset: 0.972, color: "#3F51B5" }
      ],
      gradient2: [
        { offset: 0.214, color: "#E1BEE7" },
        { offset: 0.328, color: "#CE93D8" },
        { offset: 0.487, color: "#BA68C8" },
        { offset: 0.672, color: "#AB47BC" },
        { offset: 0.793, color: "#9C27B0" },
        { offset: 0.822, color: "#9C27B0", opacity: 0.804 },
        { offset: 0.863, color: "#BA68C8", opacity: 0.529 },
        { offset: 0.91, color: "#CE93D8", opacity: 0.209 },
        { offset: 0.941, color: "#E1BEE7", opacity: 0 }
      ],
      particles: [
        { cx: 25, cy: 70, r: 2, opacity: 0.6 },
        { cx: 75, cy: 60, r: 1.5, opacity: 0.5 },
        { cx: 35, cy: 85, r: 1.8, opacity: 0.4 },
        { cx: 65, cy: 75, r: 1.2, opacity: 0.5 },
        { cx: 20, cy: 55, r: 1.6, opacity: 0.4 },
        { cx: 80, cy: 50, r: 1.4, opacity: 0.6 },
        { cx: 45, cy: 95, r: 1.3, opacity: 0.3 },
        { cx: 55, cy: 65, r: 1.1, opacity: 0.5 },
        { cx: 15, cy: 80, r: 1.5, opacity: 0.4 }
      ]
    }
  };

  const config = colorConfigs[level];

  // efek flikering untuk animasi api
  useEffect(() => {
    if (!isHovered) return;

    let animationFrame: number;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const time = elapsed / 1000; 

      // buat gerakan api
      const x = Math.sin(time * 3) * 1.5 + Math.cos(time * 5) * 0.8;
      const y = Math.sin(time * 4) * 0.5;
      const skew = Math.sin(time * 2.5) * 2;
      const scaleY = 1 + Math.sin(time * 3.5) * 0.04;
      const brightness = 1 + Math.sin(time * 4) * 0.15;

      setFlickerOffset({ x, y, skew, scaleY, brightness });
      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isHovered]);

  // Generate partikel animasi
  const getParticleTransform = (index: number) => {
    if (!isHovered) return '';
    
    const time = Date.now() / 1000;
    const offset = index * 0.5; // waktu yang berbeda setiap partikel
    
    const x = Math.sin(time * 2 + offset) * 2;
    const y = Math.cos(time * 2.5 + offset) * 3 - 1;
    const scale = 1 + Math.sin(time * 3 + offset) * 0.15;
    
    return `translate(${x}, ${y}) scale(${scale})`;
  };

  const getParticleOpacity = (baseOpacity: number, index: number) => {
    if (!isHovered) return baseOpacity;
    
    const time = Date.now() / 1000;
    const offset = index * 0.5;
    const variation = Math.sin(time * 3 + offset) * 0.3;
    
    return Math.max(0, Math.min(1, baseOpacity + variation));
  };

  return (
    <div 
      className={`relative ${className} cursor-pointer transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`}
      data-name={`Fire-Level-${level}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg 
        className="block size-full" 
        fill="none" 
        viewBox="0 0 100 127.5"
        style={{
          filter: isHovered ? `brightness(${flickerOffset.brightness})` : 'brightness(1)',
          transition: isHovered ? 'none' : 'filter 0.3s ease'
        }}
      >
        <g clipPath={`url(#clip-${level})`}>
          <g
            style={{
              transform: isHovered 
                ? `translate(${flickerOffset.x}px, ${flickerOffset.y}px) scaleY(${flickerOffset.scaleY}) skewX(${flickerOffset.skew}deg)`
                : 'none',
              transformOrigin: 'center bottom',
              transition: isHovered ? 'none' : 'transform 0.3s ease'
            }}
          >
            <path 
              d={svgPaths.p3a985780} 
              fill={`url(#paint0-${level})`}
            />
            <path 
              d={svgPaths.p1809500} 
              fill={`url(#paint1-${level})`}
            />
          </g>
          
          {/* Partikel */}
          {config.particles.map((particle, index) => (
            <circle
              key={index}
              cx={particle.cx}
              cy={particle.cy}
              r={particle.r}
              fill={`url(#particle-${level}-${index})`}
              opacity={getParticleOpacity(particle.opacity, index)}
              style={{
                transform: getParticleTransform(index),
                transformOrigin: `${particle.cx}px ${particle.cy}px`,
                transition: isHovered ? 'none' : 'transform 0.3s ease, opacity 0.3s ease'
              }}
            />
          ))}
        </g>
        <defs>
          {/* Main gradient */}
          <radialGradient 
            cx="0" 
            cy="0" 
            gradientTransform="matrix(-75.0164 -0.325516 -0.534867 123.066 48.1179 127.83)" 
            gradientUnits="userSpaceOnUse" 
            id={`paint0-${level}`} 
            r="1"
          >
            {config.gradient1.map((stop, index) => (
              <stop 
                key={index}
                offset={stop.offset} 
                stopColor={stop.color}
              />
            ))}
          </radialGradient>
          
          {/* Inner gradient */}
          <radialGradient 
            cx="0" 
            cy="0" 
            gradientTransform="matrix(-0.781302 79.5165 58.2109 0.604386 51.7 51.6944)" 
            gradientUnits="userSpaceOnUse" 
            id={`paint1-${level}`} 
            r="1"
          >
            {config.gradient2.map((stop, index) => (
              <stop 
                key={index}
                offset={stop.offset} 
                stopColor={stop.color}
                stopOpacity={stop.opacity || 1}
              />
            ))}
          </radialGradient>
          
          {/* Particle gradients */}
          {config.particles.map((_, index) => (
            <radialGradient
              key={index}
              id={`particle-${level}-${index}`}
              cx="0.5"
              cy="0.5"
              r="0.5"
            >
              <stop offset="0" stopColor={config.gradient2[0].color} stopOpacity="0.8" />
              <stop offset="1" stopColor={config.gradient1[1].color} stopOpacity="0" />
            </radialGradient>
          ))}
          
          <clipPath id={`clip-${level}`}>
            <rect fill="white" height="127.5" width="100" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}
