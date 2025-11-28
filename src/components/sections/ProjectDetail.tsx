'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatedButton, AnimatedText } from '@/components/ui';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Project data - In a real app, this would come from a CMS or database
const projectsData: Record<string, {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  color: string;
  year: string;
  client: string;
  role: string;
  link?: string;
  github?: string;
  gallery: string[];
  features: string[];
}> = {
  'project-one': {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A modern e-commerce solution with real-time inventory and AI-powered recommendations.',
    longDescription: 'A comprehensive e-commerce platform built with modern technologies. Features include real-time inventory management, AI-powered product recommendations, seamless checkout experience, and an intuitive admin dashboard for store management.',
    image: '/projects/project-1.jpg',
    tags: ['Next.js', 'TypeScript', 'Tailwind', 'Stripe', 'PostgreSQL'],
    color: 'from-violet-500 to-purple-500',
    year: '2024',
    client: 'TechRetail Inc.',
    role: 'Lead Frontend Developer',
    link: 'https://example.com',
    github: 'https://github.com',
    gallery: ['/projects/project-1-1.jpg', '/projects/project-1-2.jpg', '/projects/project-1-3.jpg'],
    features: [
      'Real-time inventory synchronization',
      'AI-powered product recommendations',
      'Multi-currency support',
      'Advanced analytics dashboard',
      'Mobile-first responsive design',
    ],
  },
  'project-two': {
    id: 2,
    title: 'SaaS Dashboard',
    description: 'Analytics dashboard with interactive charts and real-time data.',
    longDescription: 'A powerful analytics dashboard designed for SaaS companies. Provides real-time insights, customizable reports, and interactive data visualizations to help businesses make data-driven decisions.',
    image: '/projects/project-2.jpg',
    tags: ['React', 'D3.js', 'Node.js', 'MongoDB', 'WebSocket'],
    color: 'from-blue-500 to-cyan-500',
    year: '2023',
    client: 'DataFlow Systems',
    role: 'Full Stack Developer',
    link: 'https://example.com',
    github: 'https://github.com',
    gallery: ['/projects/project-2-1.jpg', '/projects/project-2-2.jpg', '/projects/project-2-3.jpg'],
    features: [
      'Real-time data streaming',
      'Custom report builder',
      'Interactive chart library',
      'Team collaboration features',
      'Export to multiple formats',
    ],
  },
  'project-three': {
    id: 3,
    title: 'Mobile Banking App',
    description: 'Secure mobile banking with biometric auth and real-time transactions.',
    longDescription: 'A secure and user-friendly mobile banking application featuring biometric authentication, instant transfers, bill payments, and comprehensive financial management tools.',
    image: '/projects/project-3.jpg',
    tags: ['React Native', 'Firebase', 'Stripe', 'Node.js'],
    color: 'from-emerald-500 to-teal-500',
    year: '2023',
    client: 'FinTech Solutions',
    role: 'Mobile Developer',
    link: 'https://example.com',
    gallery: ['/projects/project-3-1.jpg', '/projects/project-3-2.jpg', '/projects/project-3-3.jpg'],
    features: [
      'Biometric authentication',
      'Instant P2P transfers',
      'Bill payment automation',
      'Spending analytics',
      'Multi-account management',
    ],
  },
  'project-four': {
    id: 4,
    title: '3D Portfolio Experience',
    description: 'Interactive 3D portfolio with WebGL and particle systems.',
    longDescription: 'An immersive 3D portfolio experience built with Three.js and WebGL. Features include interactive 3D navigation, particle systems, dynamic lighting, and scroll-based animations.',
    image: '/projects/project-4.jpg',
    tags: ['Three.js', 'GSAP', 'WebGL', 'React'],
    color: 'from-orange-500 to-red-500',
    year: '2024',
    client: 'Personal Project',
    role: 'Creative Developer',
    github: 'https://github.com',
    gallery: ['/projects/project-4-1.jpg', '/projects/project-4-2.jpg', '/projects/project-4-3.jpg'],
    features: [
      '3D interactive navigation',
      'Custom particle systems',
      'Dynamic lighting effects',
      'Scroll-based animations',
      'Performance optimized',
    ],
  },
  'project-five': {
    id: 5,
    title: 'AI Content Generator',
    description: 'AI-powered platform for generating marketing content.',
    longDescription: 'An AI-powered content generation platform that helps marketers create engaging social media posts, blog articles, and marketing copy in seconds using advanced language models.',
    image: '/projects/project-5.jpg',
    tags: ['OpenAI', 'Next.js', 'MongoDB', 'Tailwind'],
    color: 'from-pink-500 to-rose-500',
    year: '2024',
    client: 'ContentAI Co.',
    role: 'Full Stack Developer',
    link: 'https://example.com',
    gallery: ['/projects/project-5-1.jpg', '/projects/project-5-2.jpg', '/projects/project-5-3.jpg'],
    features: [
      'Multiple content formats',
      'Brand voice customization',
      'SEO optimization',
      'Content scheduling',
      'Analytics integration',
    ],
  },
  'project-six': {
    id: 6,
    title: 'Real Estate Platform',
    description: 'Property listing with virtual tours and mortgage calculator.',
    longDescription: 'A comprehensive real estate platform featuring property listings with virtual 3D tours, advanced search filters, mortgage calculator, and agent matching system.',
    image: '/projects/project-6.jpg',
    tags: ['Vue.js', 'Three.js', 'PostgreSQL', 'Node.js'],
    color: 'from-indigo-500 to-violet-500',
    year: '2023',
    client: 'HomeFind Inc.',
    role: 'Lead Developer',
    link: 'https://example.com',
    gallery: ['/projects/project-6-1.jpg', '/projects/project-6-2.jpg', '/projects/project-6-3.jpg'],
    features: [
      'Virtual 3D property tours',
      'Advanced search filters',
      'Mortgage calculator',
      'Agent matching system',
      'Saved searches & alerts',
    ],
  },
};

interface ProjectDetailProps {
  slug: string;
}

export const ProjectDetail = ({ slug }: ProjectDetailProps) => {
  const project = projectsData[slug];
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax effect for hero image
      gsap.to('.project-hero-image', {
        scrollTrigger: {
          trigger: '.project-hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
        y: 100,
        scale: 1.1,
      });

      // Reveal animations for content sections
      gsap.from('.content-reveal', {
        scrollTrigger: {
          trigger: '.content-reveal',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Project Not Found
          </h1>
          <Link href="/#projects">
            <AnimatedButton variant="primary">Back to Projects</AnimatedButton>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="min-h-screen">
      {/* Hero section */}
      <div className="project-hero relative h-[70vh] overflow-hidden">
        {/* Background gradient */}
        <div
          className={`project-hero-image absolute inset-0 bg-gradient-to-br ${project.color}`}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Content */}
        <div className="relative h-full flex items-end">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Back button */}
              <Link
                href="/#projects"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Projects
              </Link>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
                {project.title}
              </h1>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm text-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2 content-reveal">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              <AnimatedText as="span" animation="slideUp">
                About This Project
              </AnimatedText>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-8">
              {project.longDescription}
            </p>

            {/* Features */}
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Key Features
            </h3>
            <ul className="space-y-3 mb-8">
              {project.features.map((feature, index) => (
                <motion.li
                  key={feature}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <svg
                    className="w-6 h-6 text-violet-500 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                </motion.li>
              ))}
            </ul>

            {/* Gallery placeholder */}
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Project Gallery
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {project.gallery.map((_, index) => (
                <motion.div
                  key={index}
                  className={`aspect-video bg-gradient-to-br ${project.color} rounded-xl opacity-60 ${
                    index === 0 ? 'col-span-2' : ''
                  }`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 0.6, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ opacity: 0.8 }}
                />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="content-reveal">
            <div className="sticky top-24 space-y-6">
              {/* Project info */}
              <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  Project Info
                </h3>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm text-gray-500 dark:text-gray-400">Year</dt>
                    <dd className="text-gray-900 dark:text-white font-medium">{project.year}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500 dark:text-gray-400">Client</dt>
                    <dd className="text-gray-900 dark:text-white font-medium">{project.client}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500 dark:text-gray-400">Role</dt>
                    <dd className="text-gray-900 dark:text-white font-medium">{project.role}</dd>
                  </div>
                </dl>
              </div>

              {/* Links */}
              <div className="space-y-3">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <AnimatedButton variant="primary" className="w-full">
                      Visit Live Site
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </AnimatedButton>
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <AnimatedButton variant="outline" className="w-full">
                      View on GitHub
                      <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                    </AnimatedButton>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
