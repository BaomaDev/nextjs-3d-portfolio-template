# 🎨 Portfolio 3D Template

A stunning, interactive portfolio template with 3D elements, smooth animations, and seamless section transitions. Built for developers, designers, and creatives who want to stand out.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)
![Three.js](https://img.shields.io/badge/Three.js-R3F-black?style=flat-square&logo=three.js)

## ✨ Features

- 🎭 **Rich Animations** - GSAP + Framer Motion for smooth, professional animations
- 🧊 **3D Scene** - React Three Fiber with floating low-poly objects
- 🖱️ **Custom Cursor** - Interactive cursor with hover states
- 🌊 **Seamless Sections** - Wave dividers connecting all sections
- 📱 **Fully Responsive** - Mobile-first design
- 🌙 **Dark Mode** - Automatic theme detection
- ♿ **Accessible** - Semantic HTML, ARIA labels, reduced motion support

---

## 🚀 Quick Start

```bash
# Clone the template
git clone https://github.com/yourusername/portfolio-3d-template.git
cd portfolio-3d-template

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to see your portfolio!

---

## 📁 Project Structure

```
src/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   ├── globals.css          # Global styles
│   └── projects/[slug]/     # Dynamic project pages
│
├── components/
│   ├── layout/              # Navigation & Footer
│   ├── sections/            # Page sections (Hero, Projects, About, etc.)
│   └── ui/                  # Reusable components
│
├── hooks/                   # Custom animation hooks
└── lib/                     # Utilities
```

---

## 🎯 Customization Guide

### Step 1: Personal Information

#### `src/components/sections/Hero.tsx`
Update your name and tagline:
```tsx
// Line ~65-80: Change the heading
<AnimatedText as="span" animation="wave" className="block" staggerChildren={0.05}>
  Hello, I'm           // ← Change greeting
</AnimatedText>
<span className="block bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
  <AnimatedText as="span" animation="wave" delay={0.3} staggerChildren={0.05}>
    Your Name            // ← Your name here
  </AnimatedText>
</span>

// Line ~85: Change subtitle
<motion.p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-xl mx-auto lg:mx-0 mb-8">
  I craft beautiful, interactive digital experiences...  // ← Your bio
</motion.p>

// Line ~115-120: Update stats
{[
  { value: '50+', label: 'Projects' },      // ← Your stats
  { value: '5+', label: 'Years Exp.' },
  { value: '30+', label: 'Happy Clients' },
]}
```

#### `src/components/layout/Navigation.tsx`
Update the logo:
```tsx
// Line ~55: Change portfolio name
<Link href="/" className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
  <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
    Your Name            // ← Your name/brand
  </motion.span>
</Link>
```

---

### Step 2: Projects

#### `src/components/sections/Projects.tsx`
Edit the projects array (around line 10-60):
```tsx
const projects = [
  {
    id: 1,
    slug: 'project-one',                    // ← URL slug
    title: 'Your Project Name',             // ← Project title
    description: 'What this project does...', // ← Short description
    image: '/projects/project-1.jpg',       // ← Image path (put in public/projects/)
    tags: ['Next.js', 'TypeScript'],        // ← Tech stack
    color: 'from-violet-500 to-purple-500', // ← Gradient colors
    featured: true,                         // ← Show "Featured" badge
  },
  // Add more projects...
];
```

#### `src/components/sections/ProjectDetail.tsx`
Update detailed project data (around line 10-100):
```tsx
const projectsData: Record<string, ProjectData> = {
  'project-one': {
    title: 'Your Project Name',
    description: 'Full project description...',
    longDescription: `
      Detailed explanation of the project.
      Can be multiple paragraphs.
    `,
    tags: ['Next.js', 'TypeScript', 'Tailwind'],
    image: '/projects/project-1.jpg',
    color: 'from-violet-500 to-purple-500',
    liveUrl: 'https://your-live-site.com',   // ← Live demo link
    githubUrl: 'https://github.com/you/repo', // ← GitHub repo
    year: '2024',
    role: 'Full Stack Developer',
    highlights: [
      'Key achievement 1',
      'Key achievement 2',
    ],
  },
  // Add more project details...
};
```

---

### Step 3: About Section

#### `src/components/sections/About.tsx`

**Update your bio** (around line 130-150):
```tsx
<h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
  Hello! I'm a passionate developer    // ← Your headline
</h3>
<div className="space-y-4 text-gray-600 dark:text-gray-400">
  <p>
    Your bio paragraph 1...            // ← About you
  </p>
  <p>
    Your bio paragraph 2...            // ← More about you
  </p>
</div>
```

**Update fun facts** (around line 155-165):
```tsx
{[
  { icon: '☕', label: 'Cups of Coffee', value: '2,847' },  // ← Your stats
  { icon: '🎯', label: 'Commits This Year', value: '1,200+' },
  { icon: '📚', label: 'Books Read', value: '24' },
  { icon: '🌍', label: 'Countries Visited', value: '12' },
]}
```

**Update career timeline** (around line 10-40):
```tsx
const timelineData = [
  {
    year: '2023 - Present',
    title: 'Your Current Role',              // ← Job title
    company: 'Company Name',                 // ← Company
    description: 'What you do there...',     // ← Description
    icon: '🚀',                              // ← Emoji icon
  },
  // Add more timeline items...
];
```

---

### Step 4: Skills

#### `src/components/sections/Skills.tsx`
Edit the skills array (around line 10-25):
```tsx
const skills = [
  { name: 'React / Next.js', category: 'Frontend' },
  { name: 'TypeScript', category: 'Frontend' },
  { name: 'Node.js', category: 'Backend' },
  // Add your skills...
];
```

Update the learning note (around line 65):
```tsx
<motion.p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-8">
  Always exploring new technologies — currently diving into WebGL and AI/ML
  // ← What you're learning
</motion.p>
```

---

### Step 5: Contact Information

#### `src/components/sections/Contact.tsx`
Update social links (around line 45-65):
```tsx
const socialLinks = [
  {
    name: 'Email',
    href: 'mailto:your@email.com',          // ← Your email
    icon: '📧',
    label: 'your@email.com',
  },
  {
    name: 'GitHub',
    href: 'https://github.com/yourusername', // ← Your GitHub
    icon: '🐙',
    label: '@yourusername',
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/you',     // ← Your LinkedIn
    icon: '💼',
    label: '/in/yourusername',
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com/you',         // ← Your Twitter
    icon: '🐦',
    label: '@yourusername',
  },
];
```

#### `src/components/layout/Footer.tsx`
Update footer social links (same format as Contact.tsx, around line 10-50).

---

### Step 6: 3D Avatar (Optional)

#### `src/components/ui/Scene3D.tsx`

The avatar component starts around line 210. Customize appearance:

```tsx
// Hair color (line ~250)
<meshStandardMaterial color="#1a1a1a" />  // ← Hair color

// Skin tone (line ~230)
<meshStandardMaterial color="#e8beac" />  // ← Skin color

// Shirt color (line ~215)
<meshStandardMaterial color="#2d3748" />  // ← Shirt color

// Glasses - remove or modify the glasses group if needed (line ~260-290)
```

---

### Step 7: Colors & Theme

#### `src/app/globals.css`
Update CSS variables:
```css
:root {
  --background: #ffffff;
  --foreground: #171717;
  --violet-glow: rgba(139, 92, 246, 0.3);   /* ← Primary glow color */
  --indigo-glow: rgba(99, 102, 241, 0.3);   /* ← Secondary glow color */
}
```

#### Throughout components
The template uses Tailwind's violet/indigo palette. Search and replace:
- `violet-500` → your primary color
- `indigo-500` → your secondary color
- `purple-500` → your accent color

---

## 🖼️ Adding Images

1. Create folder: `public/projects/`
2. Add your images there
3. Reference them as `/projects/your-image.jpg`

For the About section photo, update in `About.tsx`:
```tsx
// Replace the placeholder div with an actual image
<img 
  src="/your-photo.jpg" 
  alt="Your name" 
  className="relative w-full h-full object-cover rounded-3xl"
/>
```

---

## 🎭 Animation Reference

### GSAP (Complex animations)
```tsx
import gsap from 'gsap';

// Timeline animation
const tl = gsap.timeline({ repeat: -1, yoyo: true });
tl.to(element, { y: 20, duration: 2, ease: 'sine.inOut' });

// Cleanup
return () => tl.kill();
```

### Framer Motion (Component animations)
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  whileHover={{ scale: 1.05 }}
  transition={{ duration: 0.5 }}
>
```

---

## 📦 Tech Stack

| Package | Purpose |
|---------|---------|
| Next.js 14 | React framework |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| GSAP | Animation engine |
| Framer Motion | React animations |
| Three.js + R3F | 3D graphics |
| @react-three/drei | 3D helpers |

---

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Other platforms
Build and deploy the `out` folder:
```bash
npm run build
# Deploy .next folder to your hosting
```

---

## 🤝 Contributing

Contributions welcome! Feel free to:
- 🐛 Report bugs
- 💡 Suggest features
- 🔧 Submit PRs

---

## 📄 License

MIT License - Use this template freely for your portfolio!

---

Made with 💜 and lots of ☕
