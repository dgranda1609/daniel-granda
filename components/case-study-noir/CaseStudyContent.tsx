import React from 'react';

interface Project {
    title: string;
    fullDescription: string;
    tags: string[];
    images?: string[];
    imageUrl: string;
}

interface CaseStudyContentProps {
    project: Project;
}

export const CaseStudyContent: React.FC<CaseStudyContentProps> = ({ project }) => {
    return (
        <div className="w-full min-h-screen pt-32 pb-20 px-8 flex justify-center animate-in fade-in slide-in-from-bottom-4 duration-1000 bg-brand-bg text-brand-primary">
            <div className="w-full max-w-3xl space-y-16">

                <header className="space-y-4">
                    <h2 className="text-brand-accent font-heading text-6xl md:text-8xl leading-none">THE PROCESS</h2>
                    <p className="text-brand-primary/60 font-body text-sm uppercase tracking-widest">Inquiry // Analysis // Revelation</p>
                </header>

                <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                        <h3 className="text-brand-accent font-heading text-3xl">VISION</h3>
                        <p className="text-brand-primary/80 font-body leading-relaxed text-lg">
                            {project.fullDescription || "No description available."}
                        </p>
                    </div>
                    <div className="space-y-6">
                        <h3 className="text-brand-accent font-heading text-3xl">TECHNIQUE</h3>
                        <ul className="text-brand-primary/80 font-body space-y-3">
                            {project.tags?.map((tag, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 bg-brand-accent rotate-45" /> {tag}
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                <section className="space-y-8">
                    <div className="aspect-video w-full bg-brand-secondary/10 border border-brand-accent/20 overflow-hidden relative">
                        <img
                            src={project.images?.[1] || project.imageUrl}
                            alt="Working process"
                            className="w-full h-full object-cover grayscale opacity-50 mix-blend-screen"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-brand-accent font-heading text-4xl tracking-[1em] opacity-30">WORKING_DOC</span>
                        </div>
                    </div>

                    <div className="columns-1 md:columns-2 gap-12 text-brand-primary/70 font-body leading-relaxed">
                        <p className="mb-6">
                            In the construction of the visual identity, we utilized a tiered grid system. The primary structural elements act as anchor points, drawing the viewer into a direct, confrontational gaze.
                        </p>
                        <p>
                            Typography plays a crucial role in balancing the aesthetic with modern digital precision. The juxtaposition of structured headings against the flow of content mimics the duality of systematic observation.
                        </p>
                    </div>
                </section>

                <footer className="pt-20 pb-10 border-t border-brand-accent/20 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-brand-accent font-heading text-2xl tracking-widest">PROJECT_STATUS: COMPLETED</div>
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="px-8 py-3 border border-brand-accent text-brand-accent font-heading text-xl hover:bg-brand-accent hover:text-brand-bg transition-all"
                    >
                        RETURN TO TOP
                    </button>
                </footer>
            </div>
        </div>
    );
};
