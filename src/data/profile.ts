/**
 * ✏️  EDIT THIS FILE TO MAKE THE PORTFOLIO YOURS.
 * Everything on the site is driven from here — no need to touch components.
 *
 * Senior-designer tips while you fill it in:
 *  - Headline = the OUTCOME you deliver, not your job title.
 *  - Every project: Problem → Solution → Result (numbers win clients).
 *  - 3–6 strong projects beat 15 weak ones. Put your best one first.
 *  - Real testimonials (even from a friend's small business) build trust fast.
 */

export const profile = {
  name: "Your Name",
  initials: "YN",
  roles: [
    "Full-Stack Developer",
    "UI Engineer",
    "Problem Solver",
    "Freelance Partner",
  ],
  headline: "I build fast, beautiful web products that grow your business.",
  intro:
    "Freelance developer helping startups, creators & small businesses turn ideas into polished, high-converting websites and apps — on time and without the agency price tag.",
  location: "India · Working worldwide",
  available: true,
  email: "hello@yourdomain.com",
  calendly: "https://calendly.com/your-handle", // or any booking link
  resume: "#",
  socials: {
    github: "https://github.com/your-handle",
    linkedin: "https://linkedin.com/in/your-handle",
    twitter: "https://x.com/your-handle",
    upwork: "https://www.upwork.com/freelancers/your-handle",
  },
};

export const stats = [
  { value: 20, suffix: "+", label: "Projects shipped" },
  { value: 15, suffix: "+", label: "Happy clients" },
  { value: 3, suffix: "yrs", label: "Building for the web" },
  { value: 100, suffix: "%", label: "On-time delivery" },
];

export const services = [
  {
    icon: "Rocket",
    title: "Landing Pages that Convert",
    problem: "Visitors land, scroll, and leave.",
    solution:
      "Fast, animated, SEO-ready pages designed around one goal — getting the click, sign-up, or sale.",
    color: "cyan",
  },
  {
    icon: "LayoutDashboard",
    title: "Web Apps & Dashboards",
    problem: "Your team runs the business on spreadsheets.",
    solution:
      "Custom React / Next.js apps with auth, databases and clean dashboards that save hours every week.",
    color: "magenta",
  },
  {
    icon: "ShoppingBag",
    title: "E-commerce Stores",
    problem: "Selling online feels complicated.",
    solution:
      "Shopify or custom storefronts with payments, inventory and a checkout that doesn't leak customers.",
    color: "lime",
  },
  {
    icon: "Gauge",
    title: "Speed & Redesigns",
    problem: "Your old site is slow and looks dated.",
    solution:
      "Modern redesigns with 90+ Lighthouse scores, accessibility fixes and a brand refresh.",
    color: "violet",
  },
] as const;

export type Project = {
  title: string;
  tag: string;
  problem: string;
  solution: string;
  result: string;
  stack: string[];
  live?: string;
  code?: string;
  /** Optional screenshot in /public, e.g. "/projects/shop.png". Falls back to an animated neon cover. */
  image?: string;
  gradient: [string, string];
};

export const projects: Project[] = [
  {
    title: "NovaShop",
    tag: "E-commerce · Client project",
    problem: "A local fashion brand was losing 70% of buyers at checkout.",
    solution: "Rebuilt the store with a one-page checkout, UPI/Stripe payments and image CDN.",
    result: "+38% conversions in the first month",
    stack: ["Next.js", "Stripe", "Tailwind", "Sanity"],
    live: "https://example.com",
    code: "https://github.com/your-handle/novashop",
    gradient: ["#00f0ff", "#8b5cf6"],
  },
  {
    title: "PulseBoard",
    tag: "SaaS Dashboard",
    problem: "A gym chain tracked 2,000 members in Excel.",
    solution: "Built a real-time admin dashboard with memberships, payments and attendance charts.",
    result: "Saved ~12 staff-hours per week",
    stack: ["React", "Node.js", "PostgreSQL", "Chart.js"],
    live: "https://example.com",
    code: "https://github.com/your-handle/pulseboard",
    gradient: ["#ff2bd6", "#8b5cf6"],
  },
  {
    title: "Lumen Studio",
    tag: "Agency Website",
    problem: "A design studio's site didn't reflect the quality of their work.",
    solution: "Immersive scroll-animated site with case-study CMS and 3D hero.",
    result: "3× more inbound enquiries",
    stack: ["React", "Motion", "Three.js", "Vercel"],
    live: "https://example.com",
    gradient: ["#b6ff3b", "#00f0ff"],
  },
  {
    title: "QuickBite",
    tag: "Mobile-first PWA",
    problem: "A restaurant paid 30% commission to delivery apps.",
    solution: "Own-brand ordering PWA with WhatsApp order alerts and offline menu.",
    result: "₹40k/month saved in commissions",
    stack: ["React", "Firebase", "PWA", "Razorpay"],
    code: "https://github.com/your-handle/quickbite",
    gradient: ["#ff2bd6", "#ff8a00"],
  },
];

export const process = [
  { step: "01", title: "Discover", text: "A free 20-min call to understand your goals, users and budget." },
  { step: "02", title: "Design", text: "Wireframes & a clickable prototype so you see it before it's built." },
  { step: "03", title: "Develop", text: "Clean, tested code with weekly demos — you're never in the dark." },
  { step: "04", title: "Deliver", text: "Launch, hand-over docs and 30 days of free support." },
];

export const stack = [
  "React", "Next.js", "TypeScript", "Node.js", "Tailwind CSS", "Framer Motion",
  "PostgreSQL", "MongoDB", "Firebase", "Figma", "Three.js", "Docker", "AWS", "Stripe",
];

export const testimonials = [
  {
    quote: "Delivered ahead of schedule and the site looks incredible. Our sales jumped the very first week.",
    name: "Priya S.",
    role: "Founder, NovaShop",
  },
  {
    quote: "Communicates like a pro, codes like a senior. Weekly demos made the whole project stress-free.",
    name: "Arjun M.",
    role: "Ops Lead, PulseFit",
  },
  {
    quote: "Took our vague idea and turned it into something our customers genuinely love using.",
    name: "Sara K.",
    role: "Owner, QuickBite",
  },
];
