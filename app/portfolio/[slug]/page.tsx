import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PORTFOLIO_PROJECTS } from '@/src/constants/portfolio';
import ProjectPageClient from '@/src/components/sections/ProjectPageClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PORTFOLIO_PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = PORTFOLIO_PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    return { title: 'Project Not Found | Gokulraj Pictures' };
  }

  return {
    title: `${project.title} | Gokulraj Pictures`,
    description: project.description,
    openGraph: {
      title: `${project.title} | Gokulraj Pictures`,
      description: project.description,
      images: [project.coverImage],
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const projectIndex = PORTFOLIO_PROJECTS.findIndex((p) => p.slug === slug);

  if (projectIndex === -1) {
    notFound();
  }

  const project = PORTFOLIO_PROJECTS[projectIndex];
  const prevProject = projectIndex > 0 ? PORTFOLIO_PROJECTS[projectIndex - 1] : null;
  const nextProject =
    projectIndex < PORTFOLIO_PROJECTS.length - 1
      ? PORTFOLIO_PROJECTS[projectIndex + 1]
      : null;

  return (
    <ProjectPageClient
      project={project}
      prevProject={prevProject}
      nextProject={nextProject}
    />
  );
}
