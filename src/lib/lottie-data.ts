// Sample Lottie animation data
// In production, you would load these from external JSON files or a CDN
// You can find free Lottie animations at: https://lottiefiles.com/

// This is a placeholder - replace with actual Lottie JSON data
export const loadingAnimation = {
  v: '5.7.4',
  fr: 60,
  ip: 0,
  op: 60,
  w: 200,
  h: 200,
  nm: 'Loading',
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: 'Circle',
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: {
          a: 1,
          k: [
            { t: 0, s: [0] },
            { t: 60, s: [360] },
          ],
        },
        p: { a: 0, k: [100, 100, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] },
      },
      shapes: [
        {
          ty: 'el',
          s: { a: 0, k: [80, 80] },
          p: { a: 0, k: [0, 0] },
        },
        {
          ty: 'st',
          c: { a: 0, k: [0.545, 0.361, 0.965, 1] },
          o: { a: 0, k: 100 },
          w: { a: 0, k: 8 },
          lc: 2,
          lj: 1,
          d: [
            { n: 'd', v: { a: 0, k: 0 } },
            { n: 'g', v: { a: 0, k: 60 } },
            { n: 'o', v: { a: 0, k: 0 } },
          ],
        },
      ],
    },
  ],
};

// Placeholder for success checkmark animation
export const successAnimation = {
  // Add your Lottie JSON here
};

// Placeholder for error animation
export const errorAnimation = {
  // Add your Lottie JSON here
};

// Placeholder for hero animation
export const heroAnimation = {
  // Add your Lottie JSON here
};

// URLs for popular free Lottie animations you can use:
export const lottieUrls = {
  // Loading animations
  loading: 'https://lottie.host/embed/your-animation-id/your-file.json',
  
  // Success/completion
  success: 'https://lottie.host/embed/your-animation-id/your-file.json',
  
  // Error states
  error: 'https://lottie.host/embed/your-animation-id/your-file.json',
  
  // Developer/coding themed
  coding: 'https://lottie.host/embed/your-animation-id/your-file.json',
  
  // Scroll indicators
  scrollDown: 'https://lottie.host/embed/your-animation-id/your-file.json',
  
  // Contact/communication
  email: 'https://lottie.host/embed/your-animation-id/your-file.json',
};

// How to use Lottie animations in your components:
/*
import { LottieAnimation } from '@/components/ui';
import { loadingAnimation } from '@/lib/lottie-data';

// Option 1: Using local animation data
<LottieAnimation 
  animationData={loadingAnimation}
  loop={true}
  autoplay={true}
  className="w-24 h-24"
/>

// Option 2: Using remote URL (requires fetching the JSON first)
const [animationData, setAnimationData] = useState(null);

useEffect(() => {
  fetch(lottieUrls.loading)
    .then(res => res.json())
    .then(data => setAnimationData(data));
}, []);

{animationData && (
  <LottieAnimation 
    animationData={animationData}
    playOnHover={true}
  />
)}
*/
