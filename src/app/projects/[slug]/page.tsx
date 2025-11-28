import { ProjectDetail } from '@/components/sections/ProjectDetail';

// Define the params type explicitly
interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  return <ProjectDetail slug={slug} />;
}

// Generate static params for all projects
export function generateStaticParams() {
  return [
    { slug: 'project-one' },
    { slug: 'project-two' },
    { slug: 'project-three' },
    { slug: 'project-four' },
    { slug: 'project-five' },
    { slug: 'project-six' },
  ];
}
