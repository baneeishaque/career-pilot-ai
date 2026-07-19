export interface Feature {
  readonly id: string;
  readonly icon: string;
  readonly title: string;
  readonly description: string;
}

export interface RoadmapMilestone {
  readonly id: string;
  readonly level: string;
  readonly title: string;
  readonly description: string;
  readonly status: "live" | "upcoming";
  readonly date: string;
  readonly icon: string;
}

export interface StatItem {
  readonly id: string;
  readonly value: string;
  readonly label: string;
}

export const FEATURES: readonly Feature[] = [
  {
    id: "resume-analysis",
    icon: "description",
    title: "Resume Analysis",
    description: "Deep-scan your current document for structural weaknesses and missing keywords that recruiters look for.",
  },
  {
    id: "ats-optimization",
    icon: "rocket_launch",
    title: "ATS Optimization",
    description: "Bypass automated filters with AI-tuned formatting and semantic keyword injection specifically for each application.",
  },
  {
    id: "cover-letter",
    icon: "edit_note",
    title: "Cover Letter Generation",
    description: "Instantly draft compelling, personalized cover letters that weave your experience into the job requirements.",
  },
  {
    id: "qualification-match",
    icon: "check_circle",
    title: "Qualification Match",
    description: "Get a percentage score of how well you fit a role and specific advice on how to bridge the gap.",
  },
  {
    id: "privacy-first",
    icon: "shield",
    title: "Privacy First",
    description: "Your data is encrypted and never sold. We process your documents locally whenever possible to ensure total security.",
  },
  {
    id: "fast-processing",
    icon: "speed",
    title: "Fast Processing",
    description: "Our high-performance infrastructure delivers results in under 30 seconds, keeping your search momentum high.",
  },
];

export const STATS: readonly StatItem[] = [
  {
    id: "stat-optimization",
    value: "10x Faster",
    label: "Resume Optimization",
  },
  {
    id: "stat-match",
    value: "85%+",
    label: "Average Match Score",
  },
  {
    id: "stat-optimized",
    value: "15k+",
    label: "Resumes Optimized",
  },
];

export const ROADMAP: readonly RoadmapMilestone[] = [
  {
    id: "level-1",
    level: "Level 1",
    title: "Resume Optimization & Analysis Platform",
    description: "Tailor and optimize your resume and cover letter with advanced AI models.",
    status: "live",
    date: "Live",
    icon: "verified",
  },
  {
    id: "level-2",
    level: "Level 2",
    title: "Auto-Apply Agent",
    description: "Smart form filling and auto-applications for major platform job boards.",
    status: "upcoming",
    date: "Q3 2026",
    icon: "lock",
  },
  {
    id: "level-3",
    level: "Level 3",
    title: "Job Search Tracker",
    description: "Intelligent job application tracking, status aggregation, and automated check-ins.",
    status: "upcoming",
    date: "Q4 2026",
    icon: "lock",
  },
  {
    id: "level-4",
    level: "Level 4",
    title: "Recruiter Dashboard",
    description: "Recruiter portal and direct talent connection interface for vetted candidates.",
    status: "upcoming",
    date: "2027",
    icon: "lock",
  },
];
