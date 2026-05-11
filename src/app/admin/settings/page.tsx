import { db, schema } from "@/lib/db";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import SettingsForm from "./SettingsForm";
import type {
  ContactSettings,
  SocialSettings,
  CompanySettings,
} from "./actions";

const DEFAULT_CONTACT: ContactSettings = {
  email: "",
  phone: "",
  address: "",
};

const DEFAULT_SOCIAL: SocialSettings = {
  linkedin: "",
  facebook: "",
  upwork: "",
};

const DEFAULT_COMPANY: CompanySettings = {
  name: "",
  tagline: "",
  description: "",
  founded: "",
  ceo: "",
};

async function getSettings() {
  try {
    const rows = await db.select().from(schema.siteSettings);
    const map: Record<string, unknown> = {};
    for (const row of rows) {
      map[row.key] = row.value;
    }
    return {
      contact: {
        ...DEFAULT_CONTACT,
        ...((map.contact as Partial<ContactSettings>) ?? {}),
      },
      social: {
        ...DEFAULT_SOCIAL,
        ...((map.social as Partial<SocialSettings>) ?? {}),
      },
      company: {
        ...DEFAULT_COMPANY,
        ...((map.company as Partial<CompanySettings>) ?? {}),
      },
      connected: true as const,
    };
  } catch {
    return { connected: false as const };
  }
}

export default async function AdminSettingsPage() {
  const result = await getSettings();

  return (
    <div className="p-8 max-w-6xl">
      <AdminPageHeader
        title="Site Settings"
        description="Configure global contact, social, and company details"
      />

      {!result.connected ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
          <p className="text-sm text-yellow-800">
            Database not connected. Configure Supabase first.
          </p>
        </div>
      ) : (
        <SettingsForm
          contact={result.contact}
          social={result.social}
          company={result.company}
        />
      )}
    </div>
  );
}
