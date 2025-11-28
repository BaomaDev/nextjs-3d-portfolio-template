'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { AnimatedCard, AnimatedText, AnimatedButton } from '@/components/ui';
import Link from 'next/link';

// Sample project data - replace with your actual projects
const projects = [
  {
    id: 1,
    slug: 'project-one',
    title: 'E-Commerce Platform',
    description: 'A modern e-commerce solution with real-time inventory and AI-powered recommendations.',
    image: '/projects/project-1.jpg',
    tags: ['Next.js', 'TypeScript', 'Tailwind'],
    color: 'from-violet-500 to-purple-500',
    featured: true,
  },
  {
    id: 2,
    slug: 'project-two',
    title: 'SaaS Dashboard',
    description: 'Analytics dashboard with interactive charts, real-time data, and custom reporting.',
    image: '/projects/project-2.jpg',
    tags: ['React', 'D3.js', 'Node.js'],
    color: 'from-blue-500 to-cyan-500',
    featured: true,
  },
  {
    id: 3,
    slug: 'project-three',
    title: 'Mobile Banking App',
    description: 'Secure mobile banking application with biometric authentication and real-time transactions.',
    image: '/projects/project-3.jpg',
    tags: ['React Native', 'Firebase', 'Stripe'],
    color: 'from-emerald-500 to-teal-500',
    featured: true,
  },
  {
    id: 4,
    slug: 'project-four',
    title: '3D Portfolio Experience',
    description: 'Interactive 3D portfolio with WebGL, particle systems, and immersive navigation.',
    image: '/projects/project-4.jpg',
    tags: ['Three.js', 'GSAP', 'WebGL'],
    color: 'from-orange-500 to-red-500',
    featured: false,
  },
  {
    id: 5,
    slug: 'project-five',
    title: 'AI Content Generator',
    description: 'AI-powered platform for generating marketing content, social posts, and blog articles.',
    image: '/projects/project-5.jpg',
    tags: ['OpenAI', 'Next.js', 'MongoDB'],
    color: 'from-pink-500 to-rose-500',
    featured: false,
  },
  {
    id: 6,
    slug: 'project-six',
    title: 'Real Estate Platform',
    description: 'Property listing platform with virtual tours, mortgage calculator, and agent matching.',
    image: '/projects/project-6.jpg',
    tags: ['Vue.js', 'Three.js', 'PostgreSQL'],
    color: 'from-indigo-500 to-violet-500',
    featured: false,
  },
];

interface ProjectCardProps {
  project: typeof projects[0];
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Link href={`/projects/${project.slug}`}>
        <AnimatedCard
          className="group cursor-pointer h-full"
          hoverEffect="tilt"
        >
          {/* Image container */}
          <div className="relative h-48 overflow-hidden">
            {/* Gradient placeholder - replace with actual image */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-80`}
            />
            
            {/* Hover overlay */}
            <motion.div
              className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={false}
            >
              <motion.div
                className="px-4 py-2 bg-white rounded-full text-gray-900 font-medium text-sm"
                initial={{ y: 20, opacity: 0 }}
                whileHover={{ scale: 1.05 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                View Project →
              </motion.div>
            </motion.div>

            {/* Featured badge */}
            {project.featured && (
              <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 dark:bg-gray-900/90 rounded-full text-xs font-medium text-violet-600 dark:text-violet-400">
                Featured
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
              {project.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-xs text-gray-600 dark:text-gray-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </AnimatedCard>
      </Link>
    </motion.div>
  );
};

export const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative pt-8 pb-20 md:pt-12 md:pb-32 bg-gray-50 dark:bg-gray-900"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-violet-500/5" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-indigo-500/5" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16 projects-title">
          <motion.span
            className="inline-block px-4 py-2 bg-violet-100 dark:bg-violet-900/30 rounded-full text-violet-600 dark:text-violet-400 text-sm font-medium mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            My Work
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            <AnimatedText as="span" animation="slideUp">
              Featured Projects
            </AnimatedText>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A selection of my recent work, showcasing creative solutions and technical expertise.
          </p>
        </div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* View all button */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <AnimatedButton variant="outline" size="lg">
            View All Projects
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </AnimatedButton>
        </motion.div>
      </div>

      {/* Wave divider to About */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" preserveAspectRatio="none">
          <path d="M0 0L48 8.9C96 17.8 192 35.5 288 44.5C384 53.5 480 53.5 576 48.9C672 44.5 768 35.5 864 40C960 44.5 1056 62.2 1152 66.7C1248 71.2 1344 62.2 1392 57.8L1440 53.4V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V0Z" className="fill-white dark:fill-gray-950"/>
        </svg>
      </div>
    </section>
  );
};

export default Projects;
