import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient();

const API_URL = 'http://localhost:4000/api';

export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    author: string;
    category: string;
    tags: string[];
    featured_image?: string;
    published_at: string;
}

export interface CuratedLink {
    id: string;
    title: string;
    url: string;
    source: string;
    excerpt: string;
    category: string;
    tags: string[];
    featured_image?: string;
    curated_at: string;
}

export type FeedItem =
    | ({ type: 'post' } & BlogPost)
    | ({ type: 'link' } & CuratedLink);

export const api = {
    getFeed: async (): Promise<FeedItem[]> => {
        try {
            const response = await fetch(`${API_URL}/blog/feed`);
            if (!response.ok) throw new Error('Network response was not ok');
            return await response.json();
        } catch (error) {
            console.error('Error fetching feed:', error);
            return [];
        }
    },
    getPosts: async (): Promise<BlogPost[]> => {
        try {
            const response = await fetch(`${API_URL}/blog/posts`);
            if (!response.ok) throw new Error('Network response was not ok');
            return await response.json();
        } catch (error) {
            console.error('Error fetching posts:', error);
            return [];
        }
    },
    getProjectBySlug: async (slug: string): Promise<any> => {
        try {
            const response = await fetch(`${API_URL}/projects/${slug}`);
            if (!response.ok) throw new Error('Network response was not ok');
            return await response.json();
        } catch (error) {
            console.warn(`Error fetching project ${slug}, utilizing fallback data.`);
            // FALLBACK DATA for "Case Study" design
            const fallbackProjects: Record<string, any> = {
                'ilo-documentary-series': {
                    title: 'ILO Documentary Series',
                    full_description: "A comprehensive documentary series highlighting the impact of ILO initiatives across the Andes, Amazon, and Coastal regions. We traveled to remote locations to capture authentic stories of change, resulting in a campaign adopted by 5 international NGOs.",
                    images: [
                        '/images/ILO-hero.gif',
                        'https://images.unsplash.com/photo-1542206395-9feb3edaa68d?auto=format&fit=crop&q=80&w=1000', // Amazon context
                        'https://images.unsplash.com/photo-1518182170546-0766aa6f5d56?auto=format&fit=crop&q=80&w=1000'  // Andes context
                    ],
                    image_url: '/images/ILO-hero.gif',
                    client: 'United Nations / ILO',
                    outcome: '100k+ Views',
                    tags: ['Documentary', 'UN/ILO', 'Cannes']
                },
                'dinamo-zagreb': {
                    title: 'Dinamo Zagreb',
                    full_description: 'Reimagining the visual identity for a legendary European football club. The motion graphics package brings dynamic energy to stadium screens and broadcast overlays, reflecting the team\'s aggressive playstyle.',
                    images: [
                        '/images/dinamo-hero.gif',
                        'https://images.unsplash.com/photo-1522778119026-d647f0565c6d?auto=format&fit=crop&q=80&w=1000', // Stadium
                        'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&q=80&w=1000' // Football action
                    ],
                    image_url: '/images/dinamo-hero.gif',
                    client: 'Dinamo Zagreb',
                    outcome: 'Brand Refresh',
                    tags: ['Motion', 'Brand Identity', 'Sports']
                },
                // Fallback for any other slug to prevent page crash during dev
                'default': {
                    title: 'Project Case Study',
                    full_description: 'This is a detailed case study of the project. It showcases the creative process, technical challenges, and the final impact delivered to the client.',
                    images: [
                        'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1000',
                        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000',
                        'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1000'
                    ],
                    image_url: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1000',
                    client: 'Client Name',
                    outcome: 'Successful Launch',
                    tags: ['Strategy', 'Design', 'Development']
                }
            };
            return fallbackProjects[slug] || fallbackProjects['default'];
        }
    }
};
