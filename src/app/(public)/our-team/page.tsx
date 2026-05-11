import { getTeamMembers } from "@/lib/content";
import OurTeamClient from "./OurTeamClient";

export default async function OurTeamPage() {
  const teamMembers = await getTeamMembers();
  return <OurTeamClient teamMembers={teamMembers} />;
}
