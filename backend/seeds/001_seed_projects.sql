DELETE FROM projects;
INSERT INTO projects (title, slug, summary, tags, image_url, sort_order, visible) VALUES
(
  'ILO Documentary Series',
  'ilo-documentary-series',
  '3-episode documentary for the United Nations. Andes, Amazon & Coast. Adopted by 5 NGOs. 100k+ views.',
  ARRAY['Documentary', 'UN/ILO', 'Cannes'],
  '/images/ILO-hero.gif',
  1,
  true
),
(
  'Dinamo Zagreb',
  'dinamo-zagreb',
  'Motion graphics and visual identity system for European football club.',
  ARRAY['Motion', 'Brand Identity', 'Sports'],
  '/images/dinamo-hero.gif',
  2,
  true
),
(
  'Miami Weddings',
  'miami-weddings',
  'Luxury wedding cinematography. Multi-cam, same-day edits, cinematic color.',
  ARRAY['Cinematography', 'Editing', 'Color'],
  '/images/miami-weddings-hero.gif',
  3,
  true
),
(
  'Alternative Audiovisual',
  'alternative-audiovisual',
  'Creative studio: brand films, music videos, and commercial production.',
  ARRAY['Production', 'Direction', 'Creative'],
  '/images/alternative-audiovisual-hero.jpg',
  4,
  true
),
(
  'AI Production Pipeline',
  'ai-production-pipeline',
  'Client: DTC Brands. 100+ monthly assets delivered with 35% faster turnaround and 96% on-time delivery.',
  ARRAY['AI Systems', 'Automation', 'n8n', 'Production Pipeline'],
  '/images/ai-systems-hero.webp',
  5,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  summary = EXCLUDED.summary,
  tags = EXCLUDED.tags,
  image_url = EXCLUDED.image_url,
  sort_order = EXCLUDED.sort_order,
  visible = EXCLUDED.visible;
