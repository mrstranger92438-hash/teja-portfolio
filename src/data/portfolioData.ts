export interface SkillCategory {
  id: string;
  title: string;
  subtitle: string;
  gradient: string;
  iconBg: string;
  accentColor: string;
  skills: {
    name: string;
    detail: string;
  }[];
}

export interface ServiceItem {
  number: string;
  title: string;
  description: string;
  highlights: string;
  gradientBg: string;
  borderGlow: string;
  iconColor: string;
  iconKey: 'globe' | 'layout' | 'smartphone' | 'terminal' | 'cpu';
}

export type ProjectCategory = 'all' | 'web' | 'systems' | 'python';

export interface ProjectItem {
  id: string;
  title: string;
  category: Exclude<ProjectCategory, 'all'>;
  categoryLabel: string;
  description: string;
  fullDescription: string;
  technologies: string[];
  highlights: string[];
  image: string;
  accentGradient: string;
  repoUrl: string;
  repoNote: string;
}

export const PROFILE = {
  brandLogo: 'TEJESH.',
  name: 'Koppula Tejesh',
  subtitle: 'Aspiring Software Developer',
  titleLine: 'Aspiring Software Developer | Web Developer | Python Programmer',
  typingRoles: [
    'Web Developer',
    'Python Programmer',
    'Software Developer',
    'Creative Problem Solver',
  ],
  heroIntro:
    'Driven by curiosity for modern technologies, clean code, and creative problem-solving. Building responsive, user-friendly digital experiences while growing into a well-rounded software engineer.',
  bio: 'I am Koppula Tejesh, a passionate and dedicated aspiring technology professional with a strong interest in web development, modern technologies, and creative problem-solving. I enjoy learning new skills, exploring innovative ideas, and building responsive, user-friendly digital experiences. I am committed to continuous growth, improving my technical abilities, and creating meaningful projects that combine creativity with technology.',
  email: 'mr.stranger92438@gmail.com',
  githubUrl: 'https://github.com/dashboard',
  linkedinUrl: '',
  avatar: '/assets/aistudio/profile_photo_14e6f80d.jpeg',
};

export const ABOUT_HIGHLIGHTS = [
  {
    number: '01',
    title: 'Passion for Programming',
    description:
      'Writing structured, logical code across C, C++, Java, and Python to turn ideas into working software.',
    accent: 'from-[#8B5CF6]/20 to-[#3B82F6]/15 border-[#8B5CF6]/35',
    numberColor: 'text-[#8B5CF6]',
  },
  {
    number: '02',
    title: 'Interest in Web Development',
    description:
      'Crafting responsive interfaces with HTML, CSS, and JavaScript that adapt cleanly across every screen.',
    accent: 'from-[#3B82F6]/20 to-[#06B6D4]/15 border-[#3B82F6]/35',
    numberColor: 'text-[#3B82F6]',
  },
  {
    number: '03',
    title: 'Software Development Ambitions',
    description:
      'Strengthening object-oriented architecture and database skills with MySQL and MongoDB for scalable builds.',
    accent: 'from-[#EC4899]/20 to-[#8B5CF6]/15 border-[#EC4899]/35',
    numberColor: 'text-[#EC4899]',
  },
  {
    number: '04',
    title: 'Creative Problem-Solving',
    description:
      'Breaking down complex challenges with Data Structures and Algorithms while keeping user experience intuitive.',
    accent: 'from-[#F97316]/20 to-[#EC4899]/15 border-[#F97316]/35',
    numberColor: 'text-[#F97316]',
  },
  {
    number: '05',
    title: 'Continuous Learning',
    description:
      'Exploring emerging tools, practicing daily in VS Code, and tracking progress cleanly with Git and GitHub.',
    accent: 'from-[#06B6D4]/20 to-[#3B82F6]/15 border-[#06B6D4]/35',
    numberColor: 'text-[#06B6D4]',
  },
  {
    number: '06',
    title: 'Career Goals',
    description:
      'Preparing for software engineering internships and collaborative teams where creativity meets reliable technology.',
    accent: 'from-[#8B5CF6]/20 to-[#F97316]/15 border-[#8B5CF6]/35',
    numberColor: 'text-[#F97316]',
  },
];

export const EDUCATION = {
  degree: 'B.Tech – Computer Science and Engineering',
  institution: 'JOY University',
  expectedGraduation: '2027',
  timelineMilestones: [
    {
      period: '2023 – Present',
      title: 'Undergraduate Degree Pursuit',
      detail: 'Enrolled in B.Tech Computer Science and Engineering at JOY University.',
    },
    {
      period: 'Core Focus',
      title: 'Programming & Computer Science Foundations',
      detail: 'Data Structures, Algorithms, Object-Oriented Programming, and Database Systems.',
    },
    {
      period: '2027 Target',
      title: 'Expected Graduation',
      detail: 'Preparing for full-time Software Developer and Web Development roles.',
    },
  ],
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'languages',
    title: 'Programming Languages',
    subtitle: 'Foundational & object-oriented coding',
    gradient: 'from-[#8B5CF6]/20 via-[#111827]/70 to-[#3B82F6]/15',
    iconBg: 'bg-[#8B5CF6]/20 border-[#8B5CF6]/40',
    accentColor: 'text-[#8B5CF6]',
    skills: [
      { name: 'C', detail: 'Procedural programming & memory fundamentals' },
      { name: 'C++', detail: 'STL & algorithmic problem-solving' },
      { name: 'Java', detail: 'Object-oriented application structure' },
      { name: 'Python', detail: 'Readable scripting & utility development' },
    ],
  },
  {
    id: 'web',
    title: 'Web Technologies',
    subtitle: 'Modern browser & responsive UI stack',
    gradient: 'from-[#3B82F6]/20 via-[#111827]/70 to-[#06B6D4]/15',
    iconBg: 'bg-[#3B82F6]/20 border-[#3B82F6]/40',
    accentColor: 'text-[#3B82F6]',
    skills: [
      { name: 'HTML', detail: 'Semantic document architecture & SEO' },
      { name: 'CSS', detail: 'Flexbox, Grid, animations & responsive UI' },
      { name: 'JavaScript', detail: 'Interactive DOM logic & modern ES syntax' },
    ],
  },
  {
    id: 'database',
    title: 'Database Technologies',
    subtitle: 'Relational & document data modeling',
    gradient: 'from-[#06B6D4]/20 via-[#111827]/70 to-[#8B5CF6]/15',
    iconBg: 'bg-[#06B6D4]/20 border-[#06B6D4]/40',
    accentColor: 'text-[#06B6D4]',
    skills: [
      { name: 'MySQL', detail: 'Structured schemas, joins & queries' },
      { name: 'MongoDB', detail: 'Flexible collections & document CRUD' },
    ],
  },
  {
    id: 'tools',
    title: 'Development Tools',
    subtitle: 'Version control & daily engineering environment',
    gradient: 'from-[#EC4899]/20 via-[#111827]/70 to-[#8B5CF6]/15',
    iconBg: 'bg-[#EC4899]/20 border-[#EC4899]/40',
    accentColor: 'text-[#EC4899]',
    skills: [
      { name: 'Git', detail: 'Branching, commits & version tracking' },
      { name: 'GitHub', detail: 'Repository hosting & collaboration' },
      { name: 'Visual Studio Code', detail: 'Primary code editor & debugging workflow' },
    ],
  },
  {
    id: 'concepts',
    title: 'Core Computer Science',
    subtitle: 'Engineering logic & computational thinking',
    gradient: 'from-[#F97316]/20 via-[#111827]/70 to-[#EC4899]/15',
    iconBg: 'bg-[#F97316]/20 border-[#F97316]/40',
    accentColor: 'text-[#F97316]',
    skills: [
      { name: 'Data Structures', detail: 'Arrays, linked lists, stacks, queues & trees' },
      { name: 'Algorithms', detail: 'Sorting, searching & complexity reasoning' },
      { name: 'Object-Oriented Programming', detail: 'Encapsulation, inheritance & modularity' },
    ],
  },
  {
    id: 'soft',
    title: 'Soft Skills',
    subtitle: 'Teamwork, mindset & communication',
    gradient: 'from-[#8B5CF6]/20 via-[#111827]/70 to-[#EC4899]/15',
    iconBg: 'bg-[#06B6D4]/20 border-[#06B6D4]/40',
    accentColor: 'text-[#06B6D4]',
    skills: [
      { name: 'Communication', detail: 'Clear explanation of technical concepts' },
      { name: 'Teamwork', detail: 'Collaborative academic & project execution' },
      { name: 'Problem-Solving', detail: 'Analytical debugging & root-cause thinking' },
      { name: 'Creativity', detail: 'Fresh visual ideas & user-centric design' },
    ],
  },
];

export const SERVICES: ServiceItem[] = [
  {
    number: '01',
    title: 'Web Development',
    description:
      'Building clean, structured websites with semantic HTML5, modern CSS styling, and interactive JavaScript functionality.',
    highlights: 'Clean Structure · Modern Standards',
    gradientBg: 'from-[#8B5CF6]/20 via-[#111827]/75 to-[#3B82F6]/15',
    borderGlow: 'hover:border-[#8B5CF6]/60',
    iconColor: 'text-[#8B5CF6]',
    iconKey: 'globe',
  },
  {
    number: '02',
    title: 'Frontend Development',
    description:
      'Designing engaging, visually balanced user interfaces with smooth micro-interactions, clear typography, and intuitive flows.',
    highlights: 'Interactive UI · Accessibility',
    gradientBg: 'from-[#3B82F6]/20 via-[#111827]/75 to-[#06B6D4]/15',
    borderGlow: 'hover:border-[#3B82F6]/60',
    iconColor: 'text-[#3B82F6]',
    iconKey: 'layout',
  },
  {
    number: '03',
    title: 'Responsive Website Design',
    description:
      'Creating mobile-first Flexbox and CSS Grid layouts that look sharp and effortless across desktops, tablets, and phones.',
    highlights: 'Flexbox & Grid · All Viewports',
    gradientBg: 'from-[#EC4899]/20 via-[#111827]/75 to-[#8B5CF6]/15',
    borderGlow: 'hover:border-[#EC4899]/60',
    iconColor: 'text-[#EC4899]',
    iconKey: 'smartphone',
  },
  {
    number: '04',
    title: 'Python Programming',
    description:
      'Developing structured Python scripts and practical utilities focused on logic clarity, automation, and problem-solving.',
    highlights: 'Clean Logic · Practical Utilities',
    gradientBg: 'from-[#F97316]/20 via-[#111827]/75 to-[#EC4899]/15',
    borderGlow: 'hover:border-[#F97316]/60',
    iconColor: 'text-[#F97316]',
    iconKey: 'terminal',
  },
  {
    number: '05',
    title: 'Software Development',
    description:
      'Applying object-oriented design, core computer science concepts, and MySQL or MongoDB storage for dependable applications.',
    highlights: 'OOP Design · Database Integration',
    gradientBg: 'from-[#06B6D4]/20 via-[#111827]/75 to-[#3B82F6]/15',
    borderGlow: 'hover:border-[#06B6D4]/60',
    iconColor: 'text-[#06B6D4]',
    iconKey: 'cpu',
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'personal-portfolio',
    title: 'Personal Portfolio Website',
    category: 'web',
    categoryLabel: 'Web Development',
    description:
      'A modern personal portfolio website showcasing professional information, skills, and projects.',
    fullDescription:
      'A responsive developer portfolio crafted to highlight Koppula Tejesh’s academic background at JOY University, technical skills across web and programming languages, services, and project showcases with an interactive contact workflow.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Grid'],
    highlights: [
      'Responsive navigation bar with mobile drawer and smooth scrolling',
      'Interactive category filtering and project showcase modal',
      'Accessible semantic HTML structure and SEO metadata',
    ],
    image: '/src/assets/images/project_portfolio_1794577208820.jpg',
    accentGradient: 'from-[#8B5CF6] to-[#EC4899]',
    repoUrl: 'https://github.com/dashboard',
    repoNote: 'Placeholder repository link — public repository URL will be added once published.',
  },
  {
    id: 'library-management',
    title: 'Library Management System',
    category: 'systems',
    categoryLabel: 'Software Systems',
    description:
      'A system designed to organize library books and manage library-related information.',
    fullDescription:
      'An academic software system concept structured to streamline book cataloging, borrower tracking, and issue/return workflows using object-oriented modeling and relational database principles.',
    technologies: ['Python', 'Java', 'MySQL', 'OOP'],
    highlights: [
      'Organized book inventory search by title, author, and identifier',
      'Structured member borrowing and return status tracking',
      'Relational MySQL table architecture for consistent records',
    ],
    image: '/src/assets/images/project_library_1794577208567.jpg',
    accentGradient: 'from-[#3B82F6] to-[#06B6D4]',
    repoUrl: 'https://github.com/dashboard',
    repoNote: 'Placeholder repository link — public repository URL will be added once published.',
  },
  {
    id: 'student-management',
    title: 'Student Management System',
    category: 'systems',
    categoryLabel: 'Software Systems',
    description:
      'An application for organizing and managing student records.',
    fullDescription:
      'A structured student record application concept built around CRUD workflows, data validation, and clear academic profile organization for managing student details and course records.',
    technologies: ['C++', 'Java', 'MySQL', 'Data Structures'],
    highlights: [
      'Modular record management for student profiles and enrollments',
      'Fast lookup and filtering using core data structures',
      'Clean input validation to preserve accurate academic records',
    ],
    image: '/src/assets/images/project_student_1794577209513.jpg',
    accentGradient: 'from-[#06B6D4] to-[#8B5CF6]',
    repoUrl: 'https://github.com/dashboard',
    repoNote: 'Placeholder repository link — public repository URL will be added once published.',
  },
  {
    id: 'ecommerce-website',
    title: 'E-Commerce Website',
    category: 'web',
    categoryLabel: 'Web Development',
    description:
      'A modern online shopping website interface with product displays and user-friendly navigation.',
    fullDescription:
      'A frontend-oriented storefront interface concept focusing on clean product presentation grids, category browsing, and intuitive cart navigation designed for smooth usability across devices.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'MongoDB'],
    highlights: [
      'Responsive multi-column product cards built with CSS Grid',
      'User-friendly navigation and interactive product browsing layout',
      'Structured cart summary interface for clear checkout flow',
    ],
    image: '/src/assets/images/project_ecommerce_1794577209699.jpg',
    accentGradient: 'from-[#EC4899] to-[#F97316]',
    repoUrl: 'https://github.com/dashboard',
    repoNote: 'Placeholder repository link — public repository URL will be added once published.',
  },
  {
    id: 'python-applications',
    title: 'Python-Based Applications',
    category: 'python',
    categoryLabel: 'Python Programming',
    description:
      'Applications developed using Python to solve practical programming problems.',
    fullDescription:
      'A collection of Python utilities and algorithmic problem-solving builds created to practice modular scripting, file handling, and clean logical workflows.',
    technologies: ['Python', 'Algorithms', 'Data Structures', 'Git'],
    highlights: [
      'Practical scripts automating repetitive file and data tasks',
      'Algorithmic implementations applying sorting and searching logic',
      'Clean modular functions structured for maintainability',
    ],
    image: '/src/assets/images/project_python_1794577210066.jpg',
    accentGradient: 'from-[#F97316] to-[#8B5CF6]',
    repoUrl: 'https://github.com/dashboard',
    repoNote: 'Placeholder repository link — public repository URL will be added once published.',
  },
];
