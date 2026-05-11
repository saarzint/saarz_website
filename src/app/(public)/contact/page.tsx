import { getSiteSettings } from "@/lib/content";
import ContactClient from "./ContactClient";

export default async function ContactPage() {
  const settings = await getSiteSettings();
  return <ContactClient contact={settings.contact} />;
}
