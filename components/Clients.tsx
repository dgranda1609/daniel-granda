
import React, { useState } from 'react';

const CLIENTS = [
  { name: "United Nations / ILO", category: "Documentary" },
  { name: "Microsoft", category: "Brand Film" },
  { name: "The North Face", category: "Video Production" },
  { name: "Kreyol Essence", category: "Lead Producer" },
  { name: "America Television", category: "Broadcast" },
  { name: "TELEFE", category: "Broadcast" },
  { name: "Dinamo Zagreb", category: "Motion Graphics" },
  { name: "Miguel Angel Productions", category: "150+ Videos" },
  { name: "Impact Doc Awards", category: "Award Winner" },
];

const ClientItem: React.FC<{ client: { name: string; category: string } }> = ({ client }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      className={`relative group border-b border-brand-primary/10 md:border-l px-16 md:px-24 py-12 md:py-16 transition-colors duration-300 ${isHovered ? 'z-20 bg-brand-primary/5' : 'z-0'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <span className={`text-16 md:text-18 font-medium transition-colors duration-300 ${isHovered ? 'text-brand-accent' : 'opacity-70'}`}>
        {client.name}
      </span>

      {/* Hover Card - Floating Layered on Top */}
      <div
        className={`absolute top-0 left-0 z-50 pointer-events-none 
                   w-[140px] h-[140px] md:w-[170px] md:h-[170px] bg-brand-accent rounded-xl shadow-[0_20px_60px_rgba(255,56,49,0.5)]
                   flex flex-col items-center justify-center transition-all duration-300 ease-out
                   ${isHovered ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-75 rotate-3'}`}
        style={{
          transform: `translate(${mousePos.x + 16}px, ${mousePos.y + 16}px)`,
          // Smoother cursor follow logic
          transition: isHovered
            ? 'opacity 300ms, transform 150ms cubic-bezier(0.23, 1, 0.32, 1)'
            : 'opacity 300ms, transform 400ms ease-in'
        }}
      >
        <div className="px-12 text-center">
          <h4 className="font-heading font-black italic text-20 md:text-24 uppercase tracking-tighter text-white mb-8 leading-none">
            {client.name}
          </h4>
          <div className="inline-block border border-white/40 px-10 py-3 rounded-full text-[9px] md:text-[10px] text-white/90 uppercase tracking-widest mt-8">
            {client.category}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Clients: React.FC = () => {
  return (
    <section className="py-64 px-24 md:px-64 bg-brand-bg relative z-0">
      <div className="max-w-[1920px] mx-auto border-t border-brand-primary/10">
        <div className="flex flex-col lg:flex-row">

          {/* Left Title Area */}
          <div className="lg:w-1/3 py-48 md:py-64 reveal">
            <h2 className="font-serif text-56 md:text-80 lg:text-[110px] xl:text-[120px] leading-[0.9] font-medium tracking-tight text-brand-primary sticky top-32">
              Brands I've<br />worked with
            </h2>
          </div>

          {/* Right Grid Area - Note: overflow-visible allowed to let cards float out */}
          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 border-r border-brand-primary/10 reveal relative">
            {CLIENTS.map((client) => (
              <ClientItem key={client.name} client={client} />
            ))}

            {/* Fillers for grid completeness */}
            <div className="hidden xl:block border-b md:border-l border-brand-primary/10"></div>
            <div className="hidden xl:block border-b md:border-l border-brand-primary/10"></div>
          </div>

        </div>
      </div>
    </section>
  );
};
