import React from 'react';

interface SidebarProps {
    onToggle: () => void;
    view: 'poster' | 'details';
}

export const Sidebar: React.FC<SidebarProps> = ({ onToggle, view }) => {
    return (
        <div className="fixed top-0 right-0 h-screen w-16 md:w-24 z-50 flex flex-col items-center justify-between py-12 pointer-events-auto">
            <div className="text-brand-accent font-heading text-xl md:text-2xl transform rotate-90 whitespace-nowrap tracking-widest opacity-80">
                PROJECT_VIEW.VOL
            </div>

            <button
                onClick={onToggle}
                className="group relative flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full border border-brand-accent/30 bg-brand-bg/20 backdrop-blur-sm hover:bg-brand-accent transition-all duration-300 active:scale-95"
            >
                <div className="flex flex-col gap-1.5 items-center">
                    <div className={`h-0.5 bg-brand-accent group-hover:bg-brand-bg transition-all duration-300 ${view === 'details' ? 'w-6 rotate-45 translate-y-2' : 'w-6'}`} />
                    <div className={`h-0.5 bg-brand-accent group-hover:bg-brand-bg transition-all duration-300 ${view === 'details' ? 'opacity-0' : 'w-4'}`} />
                    <div className={`h-0.5 bg-brand-accent group-hover:bg-brand-bg transition-all duration-300 ${view === 'details' ? 'w-6 -rotate-45 -translate-y-2' : 'w-6'}`} />
                </div>
            </button>

            <div className="flex flex-col gap-8 items-center opacity-60">
                {['IG', 'TW', 'LN'].map(social => (
                    <a key={social} href="#" className="text-brand-accent font-heading text-sm md:text-lg hover:text-brand-primary transition-colors">
                        {social}
                    </a>
                ))}
            </div>
        </div>
    );
};
