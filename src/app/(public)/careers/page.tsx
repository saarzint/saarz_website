export const dynamic = "force-dynamic";
import { getJobs } from "@/lib/content";
import CareersClient, { type CareersJob } from "./CareersClient";

const fallbackJobs: CareersJob[] = [
  {
    id: 1,
    title: "Web Developer",
    type: "Full Time",
    location: "Remote / Lahore",
    department: "Engineering",
    description:
      "We're looking for an experienced web developer proficient in modern front-end and back-end technologies to build responsive, high-performance web applications.",
    requirements: [
      "3+ years of experience in web development",
      "Proficiency in React, Next.js, and TypeScript",
      "Experience with Node.js and REST APIs",
      "Strong understanding of responsive design",
      "Familiarity with cloud services (AWS/GCP)",
    ],
  },
  {
    id: 2,
    title: "Mobile App Developer",
    type: "Full Time",
    location: "Remote / Lahore",
    department: "Engineering",
    description:
      "Join our mobile team to build cross-platform applications using React Native with a focus on performance and user experience.",
    requirements: [
      "2+ years of mobile development experience",
      "Proficiency in React Native or Flutter",
      "Experience with mobile CI/CD pipelines",
      "Understanding of offline-first architecture",
      "Published apps on App Store / Play Store",
    ],
  },
  {
    id: 3,
    title: "UI/UX Designer",
    type: "Full Time",
    location: "Remote",
    department: "Design",
    description:
      "Create beautiful, intuitive user interfaces and experiences that delight users and drive engagement.",
    requirements: [
      "3+ years of UI/UX design experience",
      "Expert in Figma and design systems",
      "Strong portfolio demonstrating web/mobile design",
      "Experience with user research and testing",
      "Understanding of front-end development basics",
    ],
  },
];

export default async function CareersPage() {
  const dbJobs = await getJobs();
  const jobs: CareersJob[] = dbJobs
    ? dbJobs.map((j) => ({
        id: j.id,
        title: j.title,
        type: j.type,
        location: j.location,
        department: j.department,
        description: j.description,
        requirements: j.requirements,
      }))
    : fallbackJobs;

  return <CareersClient jobs={jobs} />;
}
