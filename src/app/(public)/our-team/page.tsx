export const dynamic = "force-dynamic";
import { getTeamMembers } from "@/lib/content";
import OurTeamClient from "./OurTeamClient";

export default async function OurTeamPage() {
  console.log("Fetching team...");
  const teamMembers = await getTeamMembers();
  console.log("Team fetched:", teamMembers.length);
  return <OurTeamClient teamMembers={teamMembers} />;
}
