// Copy variants for Draft preview page
// Each section has 'current' (live site) and one or more alternatives

export interface HeroCopy {
  headline: string[];  // array of lines
  subtitle: string;
  cta: string;
  caption: string;
}

export const heroCopy: Record<string, HeroCopy> = {
  current: {
    headline: ['I make films, build systems,', 'and ship a hundred', 'assets a month.'],
    subtitle: 'Full-stack video producer and AI visual strategist. From documentary to brand content — every frame earns its place.',
    cta: 'My Work',
    caption: '10+ years of craft. AI-first execution.',
  },
  a: {
    headline: ['I grew up on film sets.', 'Now I build the systems', 'that run them.'],
    subtitle: "From my uncle's commercial shoots in Lima to AI-powered pipelines in Miami — I make things that move people. A decade of craft in every frame and workflow.",
    cta: 'See My Work',
    caption: 'Lima → Miami. Camera to code.',
  },
  b: {
    headline: ['Cameras since childhood.', 'Systems since the', 'future arrived.'],
    subtitle: "I'm Daniel Granda — a video producer and AI visual strategist who grew up watching his uncles run film shoots in Peru. That early love for the craft turned into a career across documentary, brand content, and now intelligent production systems. Every project I touch gets the same thing: a trained eye and the same obsession for getting it right.",
    cta: 'See My Work',
    caption: '10+ years of making things that matter.',
  },
};

export interface ManifestoCopy {
  phase1: string;
  phase1Sub: string;
  phase2Pre: string;
  phase2Accent: string;
  phase2Post: string;
  phase3Line1: string;
  phase3Line2: string;
  phase3Accent: string;
}

export const manifestoCopy: Record<string, ManifestoCopy> = {
  current: {
    phase1: 'Everyone has the tools now.',
    phase1Sub: 'Same prompts. Same presets. Same outputs.',
    phase2Pre: 'What changes everything is the',
    phase2Accent: 'eye',
    phase2Post: 'behind it.',
    phase3Line1: 'AI made me faster.',
    phase3Line2: 'A decade of cinema makes the work',
    phase3Accent: 'matter.',
  },
  a: {
    phase1: "I didn't learn this from a tutorial.",
    phase1Sub: "I learned it on set. Watching my uncles light a scene. Feeling the weight of a real camera.",
    phase2Pre: 'The tools changed. The',
    phase2Accent: 'eye',
    phase2Post: "didn't.",
    phase3Line1: 'AI gives me speed.',
    phase3Line2: "Ten years of cinema give me something it can't —",
    phase3Accent: 'taste.',
  },
  b: {
    phase1: 'Everyone has access to the same AI now.',
    phase1Sub: 'Same models. Same presets. Same shortcuts.',
    phase2Pre: "What you can't download is the",
    phase2Accent: 'instinct',
    phase2Post: 'behind it.',
    phase3Line1: "I've been behind a camera since I was a kid.",
    phase3Line2: 'AI made me faster. That history makes the work',
    phase3Accent: 'real.',
  },
};

export interface AboutParagraph {
  text: string;
  boldWords?: string[];
  italic?: boolean;
}

export interface AboutCopy {
  headline: string;
  paragraphs: AboutParagraph[];
}

export const aboutCopy: Record<string, AboutCopy> = {
  current: {
    headline: '10 years of cinema. AI-first since day one.',
    paragraphs: [
      {
        text: "I'm Daniel Granda — an independent video producer and AI visual strategist based in South Florida. Being a photographer and videographer since I was little gives me that core foundation and view, which I now use with AI to run fast, iterate, and expand the possibilities. I design AI-first production systems that ship 100+ brand assets monthly while cutting turnaround by 35%. Recent production partnerships include DTC brands, international NGOs, and sports organizations.",
        boldWords: ['DTC brands'],
      },
      {
        text: 'Before that: a documentary series for the United Nations across three ecosystems. 150+ videos at Miguel Angel Productions. Campaigns for Microsoft, The North Face, and America Television.',
        boldWords: ['United Nations', 'Microsoft', 'The North Face'],
      },
      {
        text: "I use AI every day. But AI doesn't replace knowing when to cut, how to light, or why a story needs silence.",
        italic: true,
      },
    ],
  },
  new: {
    headline: "I've been doing this my whole life.",
    paragraphs: [
      {
        text: 'When I was a kid in Lima, my mom would drop me off at my uncle\'s office when she needed a babysitter. The thing was — my uncles and grandfather were filmmakers. So "babysitting" meant watching them run commercial shoots, rig lighting setups, and argue about camera angles. I was hooked before I even knew what a producer was.',
      },
      {
        text: "By high school I had my first camera and was making short films, event videos, anything I could point a lens at. I studied film at the University of Lima, then dove straight in — assistant producing on Peru's Got Talent franchise at Latina Television, working my way from camera assistant to camera operator at America TV. All while running freelance projects on the side, because I couldn't help it.",
      },
      {
        text: 'Eventually I partnered with friends to build our own agency. We landed Microsoft, The North Face, KFC, and others. On my own, I picked up documentary work for the United Nations\' International Labour Organization — shooting across three ecosystems in the Andes, Amazon, and coast. That series was adopted by five NGOs.',
        boldWords: ['Microsoft', 'The North Face', 'KFC', "United Nations' International Labour Organization"],
      },
      {
        text: "Today I'm based in Miami, working independently as a video producer and AI visual strategist. My last full-time role was Art and Photography Manager at Kreyol Essence. Now I build AI-powered production systems that ship 100+ brand assets monthly — but everything I make still runs through the same instinct I developed watching my uncles work.",
        boldWords: ['Kreyol Essence'],
      },
      {
        text: "I use AI every single day. But AI doesn't know when a story needs silence, how to light a face so it tells the truth, or why sometimes the best edit is the one you don't make. That part is mine.",
        italic: true,
      },
    ],
  },
};

export interface GalleryNarrativeCopy {
  text: string;
  highlightWord?: string;
  alignClass: string;
  textAlign: string;
  start: number;
  end: number;
}

export interface GalleryCopy {
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  narratives: GalleryNarrativeCopy[];
}

export const galleryCopy: Record<string, GalleryCopy> = {
  current: {
    eyebrow: 'Portfolio',
    titleLine1: 'Selected',
    titleLine2: 'Works',
    narratives: [
      {
        text: "I've seen through a lens since I was little.",
        highlightWord: 'lens',
        alignClass: 'top-[25vh] left-[20vw] md:left-[25vw] items-start',
        textAlign: 'text-left',
        start: 0.1,
        end: 0.28,
      },
      {
        text: "Now, AI expands what's possible.",
        highlightWord: 'possible',
        alignClass: 'top-[35vh] right-[20vw] md:right-[25vw] items-end',
        textAlign: 'text-right',
        start: 0.32,
        end: 0.5,
      },
      {
        text: 'We iterate faster and push boundaries.',
        highlightWord: 'boundaries',
        alignClass: 'bottom-[35vh] left-[20vw] md:left-[25vw] items-start',
        textAlign: 'text-left',
        start: 0.54,
        end: 0.72,
      },
      {
        text: 'But the human eye defines the vision.',
        highlightWord: 'vision',
        alignClass: 'bottom-[25vh] right-[20vw] md:right-[25vw] items-end',
        textAlign: 'text-right',
        start: 0.76,
        end: 0.95,
      },
    ],
  },
  new: {
    eyebrow: 'A story in motion',
    titleLine1: 'Through',
    titleLine2: 'My Lens',
    narratives: [
      {
        text: "I've seen through a lens since I was little.",
        highlightWord: 'lens',
        alignClass: 'top-[25vh] left-[20vw] md:left-[25vw] items-start',
        textAlign: 'text-left',
        start: 0.1,
        end: 0.28,
      },
      {
        text: 'From Lima film sets to live TV, I learned to move with the moment.',
        highlightWord: 'moment',
        alignClass: 'top-[35vh] right-[20vw] md:right-[25vw] items-end',
        textAlign: 'text-right',
        start: 0.32,
        end: 0.5,
      },
      {
        text: 'Today AI helps me iterate faster without losing the human feel.',
        highlightWord: 'human',
        alignClass: 'bottom-[35vh] left-[20vw] md:left-[25vw] items-start',
        textAlign: 'text-left',
        start: 0.54,
        end: 0.72,
      },
      {
        text: 'The tools evolve. The eye stays honest.',
        highlightWord: 'eye',
        alignClass: 'bottom-[25vh] right-[20vw] md:right-[25vw] items-end',
        textAlign: 'text-right',
        start: 0.76,
        end: 0.95,
      },
    ],
  },
};

export interface ProjectsCopy {
  headline: string;
  subtitle: string;
}

export const projectsCopy: Record<string, ProjectsCopy | null> = {
  current: null, // no header currently
  new: {
    headline: 'Work that shaped me.',
    subtitle: "Every project here taught me something I couldn't have learned any other way. From UN documentaries in the Peruvian Amazon to AI production pipelines for beauty brands — this is the work that made me who I am.",
  },
};

export interface ServiceItem {
  title: string;
  description: string;
}

export interface ServicesCopy {
  headline: string;
  services: ServiceItem[];
}

export const servicesCopy: Record<string, ServicesCopy> = {
  current: {
    headline: 'What I build.',
    services: [
      { title: 'MOTION', description: 'Cinematic video from concept to color. Brand films, documentaries, animated explainers — 150+ projects delivered.' },
      { title: 'AI SYSTEMS', description: 'Production pipelines that think. n8n automations, AI-powered post, smart review workflows. Approvals: 70% → 96%.' },
      { title: 'BRANDING', description: 'Visual identity and marketing systems. From Shark Tank brands to UN campaigns.' },
    ],
  },
  new: {
    headline: 'What I do best.',
    services: [
      { title: 'MOTION', description: 'This is where it started — cinematic video from concept to color. Brand films, documentaries, animated explainers. Over 150 projects, from Got Talent to the United Nations. Every frame is a decision.' },
      { title: 'AI SYSTEMS', description: "The craft doesn't change — but the speed does. I build production pipelines with n8n and Claude, AI-powered post-production, and smart review workflows that took approval rates from 70% to 96%. Same quality, ten times the output." },
      { title: 'BRANDING', description: 'Visual identity and marketing systems built with the eye of a filmmaker. From Shark Tank brands to UN campaigns to DTC beauty — I design brands that look as good as they perform.' },
    ],
  },
};

export interface FooterCopy {
  cta: string;
  button: string;
  tagline: string;
}

export const footerCopy: Record<string, FooterCopy> = {
  current: {
    cta: "Cinematic video. Intelligent systems. Marketing that converts. Let's build something that actually works.",
    button: "Let's Connect",
    tagline: 'Visual production meets intelligent systems.',
  },
  a: {
    cta: "I love what I do — and I'd love to do it with you. Whether it's a brand film, a production system, or something we haven't figured out yet — let's start a conversation.",
    button: "Let's Talk",
    tagline: 'From Lima to Miami, making things that move people.',
  },
  b: {
    cta: "Good work starts with a good conversation. Tell me what you're building and I'll tell you how I can help — honestly.",
    button: 'Get In Touch',
    tagline: 'A decade of craft. A lifetime of curiosity.',
  },
};

export interface ContactCopy {
  headline: string;
  sub: string;
}

export const contactCopy: Record<string, ContactCopy> = {
  current: {
    headline: "Let's build something great.",
    sub: "Tell me about your project and I'll get back to you within 24 hours.",
  },
  new: {
    headline: "Tell me what you're working on.",
    sub: "I'd love to hear about your project. I'll get back to you within 24 hours.",
  },
};
