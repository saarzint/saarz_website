import { getProjects } from "@/lib/content";
import OurWorkClient from "./OurWorkClient";

export default async function OurWorkPage() {
  console.log("Fetching projects...");
  const projects = await getProjects();
  console.log("Projects fetched:", projects.length);
  return <OurWorkClient projects={projects} />;
}
