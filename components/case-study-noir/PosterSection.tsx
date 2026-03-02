import React from 'react';

interface Project {
    title: string;
    client?: string;
    images?: string[];
    imageUrl: string;
}

interface PosterSectionProps {
    project: Project;
}

export const PosterSection: React.FC<PosterSectionProps> = ({ project }) => {
    const mainImage = project.images?.[0] || project.imageUrl;
    const secondaryImage = project.images?.[1] || project.imageUrl;
    const tertiaryImage = project.images?.[2] || project.imageUrl;

    return (
        <div className="relative w-full min-h-screen flex flex-col items-center justify-center p-8 overflow-hidden bg-brand-bg text-brand-primary">

            {/* Background Graphic Element */}
            <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center overflow-hidden">
                <h2 className="text-[30vw] font-heading text-brand-primary leading-none select-none whitespace-nowrap">
                    PROJECT
                </h2>
            </div>

            <div className="relative w-full max-w-5xl z-10 flex flex-col items-center">

                {/* Top Header Group */}
                <div className="relative mb-12 text-center pointer-events-auto">
                    <h1 className="flex flex-col items-center">
                        <span className="text-brand-primary font-heading text-6xl md:text-[10rem] tracking-tight leading-[0.85] drop-shadow-lg uppercase text-center break-words max-w-full">
                            {project.title.split(' ')[0]} {/* First word usually acts as main title */}
                            <span className="absolute top-[35%] -right-4 md:-right-8 text-brand-accent text-3xl md:text-5xl opacity-80">©</span>
                        </span>
                        <span className="text-brand-accent font-serif text-5xl md:text-8xl -mt-4 md:-mt-10 tracking-wide drop-shadow-xl z-20 transform -rotate-3 italic text-center">
                            {project.client || "CASE STUDY"}
                        </span>
                    </h1>

                    {/* Barcode Element */}
                    <div className="mt-8 flex flex-col items-start w-full">
                        <div className="bg-brand-accent h-8 w-40 flex items-center justify-around px-1">
                            {Array.from({ length: 40 }).map((_, i) => (
                                <div key={i} className={`bg-brand-bg ${Math.random() > 0.5 ? 'w-[1px]' : 'w-[2px]'} h-6`} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Image Grid / Cropping */}
                <div className="w-full flex flex-col items-center gap-4 pointer-events-auto">
                    {/* Main Crop */}
                    <div className="relative w-full max-w-2xl aspect-[2/1] border-2 border-brand-accent/50 p-1 group">
                        <div className="w-full h-full overflow-hidden grayscale contrast-125 brightness-75">
                            <img
                                src={mainImage}
                                alt="Main View"
                                className="w-full h-full object-cover object-[center_35%] transform group-hover:scale-110 transition-transform duration-1000"
                            />
                        </div>
                        {/* Corner Markers */}
                        <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-brand-accent" />
                        <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-right-2 border-brand-accent" />
                    </div>

                    <div className="flex gap-4 w-full max-w-2xl">
                        {/* Detail Crop 1 */}
                        <div className="flex-1 aspect-square border-2 border-brand-accent/50 p-1">
                            <div className="w-full h-full overflow-hidden grayscale contrast-150 brightness-75">
                                <img
                                    src={secondaryImage}
                                    alt="Detail 1"
                                    className="w-full h-full object-cover object-center"
                                />
                            </div>
                        </div>
                        {/* Detail Crop 2 */}
                        <div className="flex-1 aspect-square border-2 border-brand-accent/50 p-1">
                            <div className="w-full h-full overflow-hidden contrast-125 saturate-0 hover:saturate-100 transition-all duration-500">
                                <img
                                    src={tertiaryImage}
                                    alt="Detail 2"
                                    className="w-full h-full object-cover object-center"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Floating Poetic Text Block */}
                <div className="mt-12 max-w-xl text-center pointer-events-auto">
                    <p className="text-brand-primary/80 font-body text-[10px] md:text-xs leading-relaxed tracking-[0.2em] uppercase">
                        Every detail matters. The flicker of a dying light, the whisper of the wind, the code that shouldn't be there. Patterns form, secrets unravel.
                    </p>
                </div>

                {/* Studio Branding */}
                <div className="mt-16 flex justify-between w-full max-w-lg pointer-events-auto">
                    {['S', 'T', 'U', 'D', 'I', 'O'].map((char, i) => (
                        <span key={i} className="text-brand-primary font-heading text-2xl md:text-3xl tracking-widest opacity-60">{char}</span>
                    ))}
                </div>

                {/* Bottom Rating Label */}
                <div className="mt-12 pointer-events-auto">
                    <div className="border border-brand-accent/50 flex items-stretch h-12">
                        <div className="bg-brand-accent text-brand-bg font-heading flex items-center justify-center px-4 text-2xl">P</div>
                        <div className="p-2 flex flex-col justify-center text-[6px] md:text-[8px] uppercase tracking-tighter leading-none text-brand-accent font-body border-l border-brand-accent/30">
                            <div className="font-bold border-b border-brand-accent/20 pb-0.5 mb-0.5">PROJECT</div>
                            <div>VISUAL DESIGN, DEVELOPMENT, BRANDING</div>
                            <div>CASE STUDY ARCHIVE VOL. 1</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating Side Text Fragments (Absolute Positioned) */}
            <div className="hidden lg:block">
                <SideText pos="top-20 left-10" text="Perceive the unseen within the seen." />
                <SideText pos="top-20 right-10" text="Be present with the unfolding." />
                <SideText pos="bottom-20 left-10" text="Attend to the whispers." />
                <SideText pos="bottom-20 right-10" text="Gaze deeply into the fabric." />
            </div>
        </div>
    );
};

const SideText: React.FC<{ pos: string; text: string }> = ({ pos, text }) => (
    <div className={`absolute ${pos} max-w-[120px] text-[10px] uppercase font-body tracking-widest text-brand-primary/40 leading-tight pointer-events-none`}>
        {text}
    </div>
);
