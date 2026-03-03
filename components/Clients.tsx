
import React, { useState } from 'react';
import { useClients } from '../lib/hooks/useApi';

// Fallback data
const FALLBACK_CLIENTS = [
  { name: "United Nations / ILO", category: "Documentary" },
  { name: "Microsoft", category: "Brand Film" },
  { name: "The North Face", category: "Video Production" },
  { name: "Kreyol Essence", category: "Brand Content (2023–2025)" },
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
      className={`relative border-b border-brand-primary/10 md:border-l px-10 md:px-24 py-10 md:py-16 transition-colors duration-300 ${isHovered ? 'z-20 bg-brand-primary/5' : 'z-0'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <span className={`text-13 md:text-18 font-medium transition-colors duration-300 leading-snug ${isHovered ? 'text-brand-accent' : 'opacity-70'}`}>
        {client.name}
      </span>

      {/* Category — visible only on mobile as static text */}
      <div className="md:hidden text-[10px] uppercase tracking-widest opacity-50 mt-4">
        {client.category}
      </div>

      {/* Hover Card — desktop only, follows cursor */}
      <div
        className={`hidden md:flex absolute top-0 left-0 z-50 pointer-events-none
                   w-[140px] h-[140px] md:w-[170px] md:h-[170px] bg-brand-accent rounded-xl shadow-[0_20px_60px_rgba(255,56,49,0.5)]
                   flex-col items-center justify-center transition-all duration-300 ease-out
                   ${isHovered ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-75 rotate-3'}`}
        style={{
          transform: `translate(${mousePos.x + 16}px, ${mousePos.y + 16}px)`,
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
  // Fetch clients from API
  const { data: apiClients, isLoading, error } = useClients();

  // Map API data to component format, fallback on error
  const clients = React.useMemo(() => {
    if (!apiClients || error) {
      return FALLBACK_CLIENTS;
    }
    return apiClients.map((c: any) => ({
      name: c.name,
      category: c.category,
      description: c.description
    }));
  }, [apiClients, error]);

  return (
    <section className="py-48 md:py-64 px-16 md:px-32 lg:px-64 bg-brand-bg relative z-0">
      <div className="max-w-[1920px] mx-auto border-t border-brand-primary/10">
        <div className="flex flex-col lg:flex-row">

          {/* Left Title Area */}
          <div className="lg:w-1/3 py-32 lg:py-64 reveal">
            <h2 className="font-serif text-[64px] md:text-80 lg:text-[110px] xl:text-[120px] leading-[0.9] font-medium tracking-tight text-brand-primary text-center lg:text-left sticky top-32">
              Brands I've<br />worked with
            </h2>
          </div>

          {/* Right Grid Area */}
          <div className="lg:w-2/3 grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 border-r border-brand-primary/10 reveal relative">
            {isLoading ? (
              <div className="col-span-full flex justify-center items-center py-64">
                <div className="text-brand-primary/40">Loading clients...</div>
              </div>
            ) : (
              <>
                {clients.map((client: any) => (
                  <ClientItem key={client.name} client={client} />
                ))}
                {/* Fillers for grid completeness */}
                <div className="hidden xl:block border-b md:border-l border-brand-primary/10"></div>
                <div className="hidden xl:block border-b md:border-l border-brand-primary/10"></div>
              </>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
