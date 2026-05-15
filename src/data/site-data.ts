export const siteConfig = {
  name: "SAARZ Int.",
  tagline: "Innovative Digital Solutions for a Connected World",
  description:
    "Empowering businesses with cutting-edge technology, design and strategy",
  founded: 2020,
  ceo: "Zaryab Raza",
  contact: {
    email: "contact@saarzint.com",
    phone: "+92-303-7688500",
    address:
      "Incubation Center, Huawei UET Telecom and IT Center (HUTIC), G.T Road, Lahore, Pakistan",
    coordinates: { lat: 31.5204, lng: 74.3587 },
  },
  social: {
    linkedin: "https://www.linkedin.com/company/saarz-int/",
    facebook: "https://www.facebook.com/profile.php?id=61575254662737",
    upwork: "https://www.upwork.com/fl/~01a7d80c05af48c396?mp_source=share",
  },
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "AI Development", href: "/services/ai-development" },
      {
        label: "Cloud Infrastructure",
        href: "/services/cloud-infrastructure",
      },
      { label: "MVP Development", href: "/services/mvp-development" },
      { label: "SaaS Development", href: "/services/saas-development" },
      { label: "Web Development", href: "/services/web-development" },
      { label: "Mobile Development", href: "/services/mobile-development" },
      { label: "CMS Development", href: "/services/cms-development" },
      { label: "Support 24/7", href: "/services/support" },
    ],
  },
  { label: "Our Work", href: "/our-work" },
  { label: "Our Team", href: "/our-team" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
  { label: "Careers", href: "/careers" },
];

export const services = [
  {
    slug: "ai-development",
    title: "AI Solutions",
    shortTitle: "AI Solutions",
    description:
      "Harness artificial intelligence to automate processes, gain insights, and create intelligent applications that transform your business.",
    icon: "Brain",
    image: "/pics/ai-solutions-homePage.webp",
    features: [
      "Custom Chatbots & Virtual Assistants",
      "Natural Language Processing (NLP)",
      "Computer Vision Solutions",
      "Process Automation with AI",
      "Predictive Analytics",
      "Machine Learning Models",
    ],
  },
  {
    slug: "cloud-infrastructure",
    title: "Cloud Infrastructure",
    shortTitle: "Cloud",
    description:
      "Build scalable, secure cloud infrastructure with automated deployments, monitoring, and cost optimization strategies.",
    icon: "Cloud",
    image: "/pics/cloud-infrastructure-homePage.webp",
    features: [
      "Infrastructure as Code (IaC)",
      "CI/CD Pipeline Setup",
      "Auto-scaling & Load Balancing",
      "Observability & Monitoring",
      "Cloud Cost Optimization",
      "Multi-cloud Strategy",
    ],
  },
  {
    slug: "mvp-development",
    title: "MVP Development",
    shortTitle: "MVP",
    description:
      "Launch your product faster with a Minimum Viable Product that validates your idea and captures early market feedback.",
    icon: "Rocket",
    image: "/pics/web-development-homePage.png",
    features: [
      "Rapid Prototyping",
      "Market Validation Strategy",
      "Lean Development Approach",
      "User Feedback Integration",
      "Iterative Development",
      "Go-to-Market Support",
    ],
  },
  {
    slug: "saas-development",
    title: "SaaS Development",
    shortTitle: "SaaS",
    description:
      "Build powerful Software-as-a-Service platforms with multi-tenancy, subscription management, and scalable architecture.",
    icon: "Layers",
    image: "/pics/cloud-infrastructure-homePage.webp",
    features: [
      "Multi-tenant Architecture",
      "Subscription & Billing Systems",
      "User Management & Roles",
      "API-first Design",
      "Analytics Dashboards",
      "White-label Solutions",
    ],
  },
  {
    slug: "web-development",
    title: "Web Development",
    shortTitle: "Web Dev",
    description:
      "Create responsive, user-friendly websites and web applications that drive engagement and deliver results.",
    icon: "Globe",
    image: "/pics/web-development-homePage.png",
    features: [
      "Responsive Web Design",
      "E-commerce Solutions",
      "Progressive Web Apps",
      "Custom Web Applications",
      "Performance Optimization",
      "SEO-friendly Architecture",
    ],
  },
  {
    slug: "mobile-development",
    title: "Mobile Development",
    shortTitle: "Mobile",
    description:
      "Build native and cross-platform mobile applications with offline-first architecture and seamless user experiences.",
    icon: "Smartphone",
    image: "/pics/mobile-development-homePage.webp",
    features: [
      "iOS & Android Development",
      "Cross-platform Solutions",
      "Offline-first Architecture",
      "Push Notifications",
      "App Store Optimization",
      "Mobile Analytics",
    ],
  },
  {
    slug: "cms-development",
    title: "CMS Development",
    shortTitle: "CMS",
    description:
      "Custom content management solutions that empower your team to manage and publish content effortlessly.",
    icon: "FileText",
    image: "/pics/cms-development-homePage.webp",
    features: [
      "WordPress Development",
      "Custom CMS Solutions",
      "Headless CMS Integration",
      "Content Migration",
      "Plugin Development",
      "SEO Optimization",
    ],
  },
  {
    slug: "support",
    title: "Support 24/7",
    shortTitle: "Support",
    description:
      "Round-the-clock technical support and maintenance to keep your systems running smoothly and securely.",
    icon: "Headphones",
    image: "/pics/cloud-infrastructure-homePage.webp",
    features: [
      "24/7 Technical Support",
      "System Monitoring",
      "Bug Fixes & Patches",
      "Performance Tuning",
      "Security Updates",
      "Disaster Recovery",
    ],
  },
];

export const testimonials = [
  {
    name: "Mark D. Halterman",
    text: "SAARZ Int. delivered an exceptional web application for our business. Their attention to detail and technical expertise exceeded our expectations.",
    rating: 5,
    image: "/pics/testimonials/mark.jpg",
  },
  {
    name: "Mark Robert",
    text: "The team at SAARZ transformed our digital presence completely. Professional, responsive, and incredibly talented.",
    rating: 5,
    image: "/pics/testimonials/robert.jpg",
  },
  {
    name: "Trevor B. Winford",
    text: "Outstanding AI solutions that automated our workflow and saved us countless hours. Highly recommend their services.",
    rating: 5,
    image: "/pics/testimonials/trevor.jpg",
  },
  {
    name: "Emily N. Stratton",
    text: "Their cloud infrastructure setup was flawless. Our applications now scale seamlessly with zero downtime.",
    rating: 5,
    image: "/pics/testimonials/Emily.jpg",
  },
  {
    name: "Janelle M. Rowan",
    text: "SAARZ built us a beautiful, responsive mobile app that our customers love. Great communication throughout the project.",
    rating: 4,
    image: "/pics/testimonials/rowan.jpg",
  },
  {
    name: "Lindsey Carrington",
    text: "From concept to launch, the SAARZ team was professional and delivered on time. Our e-commerce platform is performing beyond expectations.",
    rating: 5,
    image: "/pics/testimonials/Lindsey.jpg",
  },
];

export const partners = [
  { name: "Snipp", logo: "/pics/snipp.icon_.png" },
  { name: "Securly", logo: "/pics/securly.png" },
  { name: "Crossover", logo: "/pics/Crossover.Icon_.png" },
  { name: "GMAU", logo: "/pics/GMAU.icon_.png" },
  { name: "Pathomation", logo: "/pics/Pathomation-Icon.png" },
  { name: "Patient Studio", logo: "/pics/Patient-studio.Icon_.png" },
  { name: "Rhithm", logo: "/pics/Rhithm.icon_-2.png" },
  { name: "Sellution", logo: "/pics/sellution.icon_.png" },
  { name: "SimpleTix", logo: "/pics/SimpleTix.png" },
];

export const projects = [
  {
    id: "celebrity",
    name: "Celebrity",
    category: "Web Development",
    description: "A celebrity management and booking platform",
    images: [
      "/pics/projects/celebrity_1.jpg",
      "/pics/projects/celebrity_2.jpg",
      "/pics/projects/celebrity_3.jpg",
      "/pics/projects/celebrity_4.jpg",
    ],
    technologies: ["React", "Node.js", "MongoDB"],
  },
  {
    id: "shtabi",
    name: "Shtabi",
    category: "Mobile Apps",
    description: "A feature-rich mobile application for everyday use",
    images: [
      "/pics/projects/shtabi_1.jpg",
      "/pics/projects/shtabi_2.jpg",
      "/pics/projects/shtabi_3.jpg",
      "/pics/projects/shtabi_4.jpg",
    ],
    technologies: ["React Native", "Firebase"],
  },
  {
    id: "steamiron",
    name: "SteamIron",
    category: "E-commerce",
    description: "An e-commerce platform for industrial equipment",
    images: [
      "/pics/projects/steamiron_1.jpg",
      "/pics/projects/steamiron_2.jpg",
      "/pics/projects/steamiron_3.jpg",
    ],
    technologies: ["Next.js", "Stripe", "PostgreSQL"],
  },
  {
    id: "enigma",
    name: "Enigma",
    category: "AI Solutions",
    description: "AI-powered data analytics and visualization platform",
    images: [
      "/pics/projects/enigma_1.jpg",
      "/pics/projects/enigma_2.jpg",
    ],
    technologies: ["Python", "TensorFlow", "React"],
  },
  {
    id: "inspire",
    name: "Inspire",
    category: "Educational Tech",
    description: "An educational technology platform for modern learning",
    images: [
      "/pics/projects/inspire_1.jpg",
      "/pics/projects/inspire_2.jpg",
    ],
    technologies: ["Vue.js", "Django", "PostgreSQL"],
  },
  {
    id: "nextmove",
    name: "NextMove",
    category: "Real Estate",
    description: "Real estate listing and management application",
    images: [
      "/pics/projects/nextmove_1.jpg",
      "/pics/projects/nextmove_2.jpg",
      "/pics/projects/nextmove_3.jpg",
    ],
    technologies: ["React", "Express", "MongoDB"],
  },
  {
    id: "clicpad",
    name: "ClicPad",
    category: "Web Development",
    description: "A collaborative note-taking and productivity tool",
    images: [
      "/pics/projects/clicpad_1.jpg",
      "/pics/projects/clicpad_2.jpg",
    ],
    technologies: ["Next.js", "WebSocket", "Redis"],
  },
];

export const teamMembers = [
  {
    name: "Zaryab Raza",
    role: "CEO & Founder",
    image: "/pics/testimonials/mark.jpg",
    bio: "Visionary leader with a passion for technology and innovation. Founded SAARZ Int. in 2020 to deliver cutting-edge digital solutions.",
    linkedin: "https://www.linkedin.com/in/zaryabraza/",
  },
  {
    name: "Ahmad Ali",
    role: "Lead Developer",
    image: "/pics/testimonials/robert.jpg",
    bio: "Full-stack developer with expertise in modern web technologies and cloud architecture.",
    linkedin: "#",
  },
  {
    name: "Sarah Khan",
    role: "UI/UX Designer",
    image: "/pics/testimonials/Emily.jpg",
    bio: "Creative designer focused on building beautiful, intuitive user experiences that drive engagement.",
    linkedin: "#",
  },
  {
    name: "Hassan Malik",
    role: "AI Engineer",
    image: "/pics/testimonials/trevor.jpg",
    bio: "Machine learning specialist with experience in NLP, computer vision, and predictive analytics.",
    linkedin: "#",
  },
];

export const blogPosts = [
  {
    slug: "competitive-advantage-open-source-ai",
    title: "Competitive Advantage Open Source AI",
    description:
      "Explore how open-source AI tools can give your business a competitive edge in today's digital landscape.",
    author: "SAARZ Team",
    date: "2024-12-15",
    readTime: 8,
    image: "/pics/blog-images/blog01.jpg",
    tags: ["AI", "Open Source", "Strategy"],
  },
  {
    slug: "building-scalable-web-applications",
    title: "Building Scalable Web Applications",
    description:
      "Learn best practices for building web applications that scale efficiently with growing user demands.",
    author: "SAARZ Team",
    date: "2024-11-20",
    readTime: 6,
    image: "/pics/blog-images/blog02.jpg",
    tags: ["Web Development", "Scalability", "Architecture"],
  },
  {
    slug: "cloud-infrastructure-optimization",
    title: "Cloud Infrastructure Optimization",
    description:
      "Discover strategies to optimize your cloud infrastructure for cost efficiency and peak performance.",
    author: "SAARZ Team",
    date: "2024-10-10",
    readTime: 10,
    image: "/pics/blog_3.png",
    tags: ["Cloud", "DevOps", "Optimization"],
  },
];
