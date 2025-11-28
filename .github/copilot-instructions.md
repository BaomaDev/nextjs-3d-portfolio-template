# Portfolio 3D Template - Copilot Instructions

## Project Overview

This is a Next.js 14 interactive portfolio template with rich animations and 3D capabilities. It's designed as a customizable template for developers and designers.

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: GSAP, Framer Motion, Lottie
- **3D**: React Three Fiber (Three.js)

## Architecture Patterns

### Component Organization

- `components/ui/` - Reusable animated UI components (buttons, cards, text, cursor, 3D scene)
- `components/sections/` - Page sections (Hero, Projects, About, Skills, Contact)
- `components/layout/` - Navigation, Footer
- `hooks/` - Custom animation and utility hooks
- `lib/` - Utilities, animation presets, constants

### Key Files for Customization

1. **Hero.tsx** - Main heading, tagline, stats
2. **Projects.tsx** - Project cards and data
3. **About.tsx** - Bio, timeline, fun facts
4. **Skills.tsx** - Skills list
5. **Contact.tsx** - Social links, contact form
6. **Scene3D.tsx** - 3D objects and avatar
7. **Navigation.tsx** & **Footer.tsx** - Branding, links

### Animation Guidelines

1. **GSAP** for complex timeline animations (floating objects, camera movement)
2. **Framer Motion** for component-level animations (hover, entrance)
3. **Lottie** for vector/icon animations (optional)
4. Always check for reduced motion preference
5. Use `useEffect` cleanup for animation contexts

### Code Style

- Use `'use client'` directive for interactive components
- Export named components alongside default exports
- Keep animations configurable via props
- Use semantic HTML with proper ARIA labels

### Performance Considerations

- Dynamic imports for heavy libraries (Three.js, Lottie)
- Use `gsap.context()` for proper cleanup
- Wave dividers use SVG for seamless section transitions
- Minimize blur effects for better performance

## Section Flow

The sections connect seamlessly with wave SVG dividers:
```
Hero (gradient) → Projects (gray) → About (white) → Skills (gray) → Contact (white) → Footer (dark)
```

## Common Tasks

### Adding a New Project

1. Add project data to `projects` array in `Projects.tsx`
2. Add detailed data to `projectsData` in `ProjectDetail.tsx`
3. Add image to `public/projects/`

### Modifying the 3D Scene

1. Edit `Scene3D.tsx` for object positions, colors, animations
2. Avatar customization starts around line 210
3. GSAP controls floating animations

### Changing Colors

1. Update Tailwind classes (violet/indigo palette)
2. Modify CSS variables in `globals.css`
3. Update cursor color in `CustomCursor.tsx`
