import { Seo } from '../components/ui/Seo';
import { PageStub } from '../components/sections/PageStub';
import { breadcrumbs } from '../data/seo';

export default function Projects() {
  return (
    <>
      <Seo
        title="Projects: Wall Murals, Water Features & Installations | Invent Fine Art"
        description="Past work by Invent Fine Art: wall murals, water features, rockery and outdoor installations."
        image="gallery/wall_murals/9"
        jsonLd={breadcrumbs([{ name: 'Projects', path: '/projects' }])}
      />
      <PageStub
        crumbs={[{ name: 'Projects' }]}
        eyebrow="Past work"
        title="Projects"
        sections={[
          ['Photo header', '', 'Phase 7'],
          ['Tabs', 'All · Wall murals · Water features · Outdoor structures (?type= after hydration)', 'Phase 7'],
          ['Masonry + lightbox', '?img= deep links, Show more', 'Phase 7'],
        ]}
      />
    </>
  );
}
