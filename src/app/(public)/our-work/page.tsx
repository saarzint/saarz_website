import { getProjects } from "@/lib/content";
import OurWorkClient from "./OurWorkClient";

export default async function OurWorkPage() {
  const projects = await getProjects();
  return <OurWorkClient projects={projects} />;
}
