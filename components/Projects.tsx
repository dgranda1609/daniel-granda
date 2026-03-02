
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProjects } from '../lib/hooks/useApi';

// Fallback data for offline/error states
const FALLBACK_PROJECTS = [
  { id: '1', title: 'ILO Documentary Series', summary: '3-episode documentary for the United Nations. Andes, Amazon & Coast. Adopted by 5 NGOs. 100k+ views.', tags: ['Documentary', 'UN/ILO', 'Cannes'], imageUrl: '/images/ILO-hero.gif', slug: 'ilo-documentary-series' },
  { id: '2', title: 'Dinamo Zagreb', summary: 'Motion graphics and visual identity system for European football club.', tags: ['Motion', 'Brand Identity', 'Sports'], imageUrl: '/images/dinamo-hero.gif', slug: 'dinamo-zagreb' },
  { id: '3', title: 'Miami Weddings', summary: 'Luxury wedding cinematography. Multi-cam, same-day edits, cinematic color.', tags: ['Cinematography', 'Editing', 'Color'], imageUrl: '/images/miami-weddings-hero.gif', slug: 'miami-weddings' },
  { id: '4', title: 'Alternative Audiovisual', summary: 'Creative studio: brand films, music videos, and commercial production.', tags: ['Production', 'Direction', 'Creative'], imageUrl: '/images/alternative-audiovisual-hero.jpg', slug: 'alternative-audiovisual' },
  { id: '5', title: 'AI Production Pipeline', summary: 'Client: DTC Brands. 100+ monthly assets delivered with 35% faster turnaround and 96% on-time delivery.', tags: ['AI Systems', 'Automation', 'n8n', 'Production Pipeline'], imageUrl: '/images/ai-systems-hero.webp', slug: 'ai-production-pipeline' },
];

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    summary: string;
    tags: string[];
    imageUrl: string;
    slug: string;
  };
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 6, y: -y * 6 }); // Max 3 degrees tilt
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      className="group cursor-pointer reveal"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '1000px',
        transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
        transition: 'transform 150ms ease-out'
      }}
    >
      <Link to={`/work/${project.slug}`}>
        <div className="relative aspect-square mb-16 overflow-hidden rounded-lg">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-brand-accent/0 group-hover:bg-brand-accent/10 transition-colors pointer-events-none"></div>
        </div>
        <h3 className="font-heading text-20 font-bold mb-4 group-hover:text-brand-accent transition-colors">{project.title}</h3>
        <p className="text-14 opacity-60 mb-8">{project.summary}</p>
        <div className="flex gap-8">
          {project.tags.map((tag: string) => (
            <span key={tag} className="text-[10px] uppercase tracking-widest border border-brand-primary/20 px-8 py-2 rounded-full opacity-40">
              {tag}
            </span>
          ))}
        </div>
      </Link>
    </div>
  );
};

export const Projects: React.FC = () => {
  // Fetch projects from API
  const { data: apiProjects, isLoading, error } = useProjects();

  // Map API data to component format, fallback to hardcoded data if API fails
  const projects = React.useMemo(() => {
    if (!apiProjects || error) {
      return FALLBACK_PROJECTS;
    }
    // After snakeToCamel conversion, image_url becomes imageUrl
    return apiProjects.map((p: any) => ({
      id: p.id,
      title: p.title,
      summary: p.summary,
      tags: p.tags,
      imageUrl: p.imageUrl || p.image_url, // Handle both cases
      slug: p.slug
    }));
  }, [apiProjects, error]);

  return (
    <section id="work" className="pt-12 pb-64 px-24 md:px-64 bg-brand-bg">
      <div className="max-w-6xl mx-auto">
        {isLoading ? (
          <div className="flex justify-center items-center py-64">
            <div className="text-brand-primary/40">Loading projects...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-64">
            {projects.map((p: any) => <ProjectCard key={p.id} project={p} />)}
          </div>
        )}
      </div>
      <div className="flex justify-center mt-64 reveal">
        <button className="bg-brand-accent text-brand-primary px-48 py-16 font-heading font-bold text-20 border-beam transition-transform hover:scale-105 active:scale-95">
          View All Work
        </button>
      </div>
    </section>
  );
};
