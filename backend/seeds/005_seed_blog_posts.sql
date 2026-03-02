-- Seed blog posts
INSERT INTO blog_posts (title, slug, excerpt, content, author, category, tags, is_published, published_at) VALUES
(
  'OpenClaw and the End of the App Era: What It Means for Video Producers',
  'openclaw-ai-agents-creative-professionals',
  'OpenClaw exploded onto the scene with 160k+ GitHub stars in days. Here''s what the open-source AI agent revolution actually means for creative professionals who build with tools, not just use them.',
  '<p>The number landed like a gut-punch: 160,000 GitHub stars in less than two weeks. OpenClaw — the open-source AI agent built by Peter Steinberger — went from weekend project to one of the fastest-growing repositories in history before its creator even had time to write proper documentation.</p><p>Then OpenAI acquired him. And the whole thing is moving into a foundation.</p><p>If you''re a video producer watching this unfold, you''re probably asking the wrong question. Everyone''s debating what OpenClaw <em>is</em>. The better question: <strong>what does it signal?</strong></p><h2>The Agent Architecture That Changes Everything</h2><p>OpenClaw is, at its core, a local message router. It runs on your machine, connects AI models to your tools and files, and lets you issue commands through apps you already use — WhatsApp, Discord, Telegram. It bridges Claude, GPT-4, and other models to over 50 integrations.</p><p>What that means in practice: your AI stops living inside a chat window and starts living in your workflow.</p><p>For a video producer, this isn''t abstract. Think about what "workflow" actually means at scale. It''s culling 3,000 raw files from a shoot, routing selects to a client-facing Frame.io folder, generating rough-cut assembly edits from a shot list, triggering color grading presets based on project metadata, and distributing finished cuts across 7 social formats.</p><p>Right now, that''s 5 different apps, 5 different logins, and a human decision point at every transition. An agent-first setup collapses that into intent-driven commands. You say what you want. The system routes the work.</p><h2>What I''m Actually Building With This</h2><p>In my own production pipeline at Kreyol Essence, the pattern that saved us wasn''t any single AI tool — it was <strong>agent-orchestrated handoffs</strong>. Frame.io approval triggers → Slack notification → auto-export job → delivery folder update. That loop runs without human intervention.</p><p>OpenClaw formalizes that pattern and makes it accessible outside enterprise n8n setups.</p><h2>The Uncomfortable Truth About Tooling</h2><p>Here''s what I''ve learned building AI-first production pipelines: <strong>the bottleneck is never the tool. It''s the workflow design.</strong></p><p>OpenClaw is powerful exactly because it''s a primitive. It doesn''t make decisions for you. It executes decisions you''ve already codified into intent. If your workflow is chaotic, an agent makes it chaotically faster. If your workflow is disciplined — clear intake, clear approval gates, clear delivery specs — an agent multiplies that discipline.</p>',
  'Daniel Granda',
  'AI Workflow',
  ARRAY['ai-agents', 'openclaw', 'workflow-automation', 'video-production', 'tools'],
  true,
  '2026-02-17 00:00:00'
),
(
  'I''ve Been Using Claude as a Design Partner. Here''s What Actually Works.',
  'claude-as-design-partner',
  'Not as a code generator. Not as a copy assistant. As a design thinking collaborator that challenges assumptions, generates rapid visual variations, and accelerates the work between concept and client-ready.',
  '<p>Everyone''s using Claude to write code. That''s not wrong — it''s exceptional at that. But I''ve found the higher-value application is upstream: <strong>design thinking</strong>, before a single line of code is written or a pixel is placed.</p><h2>The Problem With "AI For Design"</h2><p>Most designers approach AI with the wrong frame. They treat it as an accelerant for decisions already made. "Generate me a button component." "Write the copy for this hero." That works. It''s faster. But it doesn''t change the quality ceiling.</p><p>The ceiling-breaking use is different: <strong>AI as a thinking partner who challenges your assumptions before you''ve committed to them.</strong></p><p>When I started building this portfolio, I didn''t open Figma. I opened a Claude conversation and described what I was trying to communicate — the specific positioning, the emotional register, the jobs I wanted the site to do. Claude pushed back on every assumption. Why serif for the headlines? Why red as the accent? Why 0px radius instead of something softer?</p><p>Those challenges forced me to articulate <em>why</em>, not just <em>what</em>. That clarity made every subsequent design decision faster and more defensible.</p><h2>Rapid Visual Conceptualization</h2><p>The workflow that''s changed my motion design process most is what I call "concept sprinting" with Claude. Before building anything in After Effects or Premiere, I describe a visual concept in detail and ask Claude to identify the strongest emotional or visual tension, propose 3 alternate visual metaphors, and flag any clichés in my original approach.</p><p>For a recent brand film for Kreyol Essence, this process surfaced a visual metaphor — botanical geometry — that we hadn''t considered. It became the central visual language of the piece.</p><h2>What Claude Can''t Do</h2><p>Claude cannot feel whether a design is <em>right</em>. The gap between analytical correctness and felt rightness is where craft lives. AI accelerates the path to that gap. Getting through the gap is still human work.</p>',
  'Daniel Granda',
  'Design & AI',
  ARRAY['claude', 'design', 'ui-ux', 'creative-process', 'ai-tools'],
  true,
  '2026-02-14 00:00:00'
),
(
  'Vibe Coding Is Real and Gemini Is Why. What That Means for Creative Builders.',
  'gemini-vibe-coding-production-builds',
  'Andrej Karpathy named it. Google shipped it. Gemini''s vibe coding tools have made "describe what you want and get working software" into something more than a demo. Here''s the honest assessment from someone building production tools with it.',
  '<p>Andrej Karpathy called it "vibe coding" in February 2025 — the act of describing what you want in plain language and letting AI generate the working code, without you understanding the details of what got built. A year later, Gemini has made that vision more real than most people expected.</p><h2>What Actually Changed</h2><p>Gemini 2.0 Flash introduced working web app generation inside Canvas: describe a React component or HTML interface, get functional code, preview it instantly, iterate in natural language. Gemini 3 Flash pushed this further — frontier reasoning with Flash-level latency, making the feedback loop genuinely fast enough to "code" at conversational speed.</p><p>The technical capability isn''t the story. The story is <strong>who this makes able to build</strong>.</p><p>A video producer who needs a shot tracking dashboard for a multi-day shoot. A motion designer who wants a custom export script for After Effects. A studio owner who needs a simple client intake system. Previously, these people hired developers or used off-the-shelf tools that didn''t quite fit. Now they describe, iterate, and ship.</p><h2>The Honest Constraints</h2><p>Vibe coding is not a replacement for engineering judgment at scale. It generates code you may not fully understand, which creates maintenance risk. The failure mode: you build faster than you understand, then spend more time debugging than you would have spent learning the fundamentals.</p><p>The success condition: you build within a scope you can reason about — even if you didn''t write the code — and you treat AI-generated output as an accelerant for your own judgment, not a replacement for it.</p><h2>The Creative Technologist Advantage</h2><p>The people who get most from vibe coding aren''t engineers and aren''t pure creatives. They''re the people in between — the ones who understand the <em>problem</em> deeply from a creative or production perspective, and now have tools that let them test solutions without needing to translate their understanding into someone else''s technical vocabulary.</p><p>That''s the creative technologist position. You own the problem definition <em>and</em> the solution testing. AI handles the translation layer.</p>',
  'Daniel Granda',
  'Development & AI',
  ARRAY['gemini', 'vibe-coding', 'web-development', 'ai-tools', 'production'],
  true,
  '2026-02-10 00:00:00'
),
(
  '2026 Is the Year AI Video Crossed the Line. Here''s My Honest Assessment.',
  'ai-video-production-2026-honest-assessment',
  'Sora 2 and Runway Gen-4 solved the jitter problem. Veo 3.1 ships native audio. Kling 2.6 generates synchronized dialogue. From inside the production trenches, here''s what''s actually changing and what still isn''t.',
  '<p>Sundance 2026 is where it became undeniable. Multiple AI-generated shorts premiered — using Sora 2 and Runway Gen-4 — that played to audiences without triggering the uncanny valley reaction that killed earlier AI video work. The temporal consistency problem has been solved at a technical level.</p><p>I''ve been using these tools professionally for three years. Here''s the honest assessment from the production trenches.</p><h2>What Actually Got Fixed</h2><p><strong>Temporal consistency.</strong> Sora 2 and Runway Gen-4 addressed this through architectural improvements in how they handle motion and scene coherence. The result is footage that can hold up over 15-30 second clips.</p><p><strong>Native audio generation.</strong> Sora 2, Veo 3.1, and Kling 2.6 now generate synchronized audio — sound effects, ambient audio, and in some cases dialogue that matches the visual content. This is transformative for short-form content workflows where audio post is often the most time-intensive phase.</p><h2>What Still Isn''t Fixed</h2><p><strong>Brand consistency.</strong> If you have a brand — a specific product, a recurring talent, a recognizable visual identity — current AI video generation can''t reliably maintain it. Every generation is probabilistic.</p><p><strong>Director control.</strong> The gap between "describe what you want" and "get exactly what you intended" is still enormous for complex narrative or emotional work.</p><h2>The 35% Figure Is Real</h2><p>The statistic from my Kreyol Essence work: AI-first post-production cut rough-cut turnaround by 35%. None of that came from AI video generation. It came from AI-assisted assembly — the tools that analyze footage metadata, suggest cuts based on transcript sync, and automate the mechanical work of rough cut assembly.</p><p>That''s the unsexy productivity story that''s actually happening in professional production right now. Not AI-generated footage replacing live-action shoots. AI-assisted editing reducing the labor cost of getting from raw media to client-ready rough cut.</p>',
  'Daniel Granda',
  'Video Production',
  ARRAY['ai-video', 'runway', 'sora', 'veo', 'post-production', 'workflow'],
  true,
  '2026-02-05 00:00:00'
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  content = EXCLUDED.content,
  is_published = EXCLUDED.is_published;

-- Seed curated links
INSERT INTO curated_links (title, url, source, excerpt, category, tags, is_published) VALUES
(
  'Eight Trends Defining How Software Gets Built in 2026',
  'https://claude.com/blog/eight-trends-defining-how-software-gets-built-in-2026',
  'Anthropic / Claude Blog',
  'Anthropic''s breakdown of the 8 structural shifts reshaping how software is built this year — from AI-native tooling to the collapse of the design-to-dev handoff.',
  'Development & AI',
  ARRAY['ai-development', 'claude', '2026-trends', 'software-engineering'],
  true
),
(
  'OpenAI''s OpenClaw Hire Signals a New Phase in the AI Agent Race',
  'https://fortune.com/2026/02/17/what-openais-openclaw-hire-says-about-the-future-of-ai-agents/',
  'Fortune',
  'Peter Steinberger joining OpenAI with OpenClaw changes the competitive landscape for AI agents. Fortune''s analysis of what the move signals for the next 18 months.',
  'AI Workflow',
  ARRAY['openclaw', 'ai-agents', 'openai', 'industry-news'],
  true
),
(
  'Sora 2 and Runway Gen-4 Solve AI Video''s Biggest Problem',
  'https://studio.aifilms.ai/blog/sora-2-runway-gen-4-solve-jitter-problem-2026',
  'AI Films Studio',
  'Deep technical analysis of how temporal consistency was solved — and what the Sundance 2026 AI film premieres actually mean for professional video production.',
  'Video Production',
  ARRAY['ai-video', 'sora', 'runway', 'post-production', 'temporal-consistency'],
  true
),
(
  'From Claude Code to Figma: Turning Production Code into Editable Figma Designs',
  'https://www.figma.com/blog/introducing-claude-code-to-figma/',
  'Figma Blog',
  'How the Claude Code → Figma MCP integration inverts the traditional design-to-dev handoff. Build in code first, generate Figma layers from the rendered state.',
  'Design & AI',
  ARRAY['figma', 'claude', 'design-systems', 'workflow', 'mcp'],
  true
)
ON CONFLICT DO NOTHING;
