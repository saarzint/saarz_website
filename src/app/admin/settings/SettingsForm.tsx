"use client";

import { useState, useTransition } from "react";
import {
  saveSiteSettings,
  type ContactSettings,
  type SocialSettings,
  type CompanySettings,
} from "./actions";
import { Save, Loader2, Check } from "lucide-react";

interface Props {
  contact: ContactSettings;
  social: SocialSettings;
  company: CompanySettings;
}

export default function SettingsForm({ contact, social, company }: Props) {
  const [pending, start] = useTransition();
  const [saved, setSaved] = useState(false);

  const [contactData, setContactData] = useState<ContactSettings>(contact);
  const [socialData, setSocialData] = useState<SocialSettings>(social);
  const [companyData, setCompanyData] = useState<CompanySettings>(company);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaved(false);
    start(async () => {
      await saveSiteSettings({
        contact: contactData,
        social: socialData,
        company: companyData,
      });
      setSaved(true);
    });
  }

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-[#e5e5e5] focus:border-[#3caefc] focus:ring-2 focus:ring-[#3caefc]/20 outline-none transition-all";

  return (
    <form onSubmit={submit} className="space-y-6 max-w-4xl">
      <div className="bg-white rounded-2xl border border-[#e5e5e5] p-6 space-y-5">
        <h2 className="text-lg font-semibold text-[#0b0e19]">Contact</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-[#0b0e19] mb-2">
              Email
            </label>
            <input
              type="email"
              value={contactData.email}
              onChange={(e) =>
                setContactData({ ...contactData, email: e.target.value })
              }
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#0b0e19] mb-2">
              Phone
            </label>
            <input
              type="text"
              value={contactData.phone}
              onChange={(e) =>
                setContactData({ ...contactData, phone: e.target.value })
              }
              className={inputClass}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#0b0e19] mb-2">
            Address
          </label>
          <textarea
            rows={2}
            value={contactData.address}
            onChange={(e) =>
              setContactData({ ...contactData, address: e.target.value })
            }
            className={`${inputClass} resize-none`}
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#e5e5e5] p-6 space-y-5">
        <h2 className="text-lg font-semibold text-[#0b0e19]">Social</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className="block text-sm font-medium text-[#0b0e19] mb-2">
              LinkedIn
            </label>
            <input
              type="text"
              value={socialData.linkedin}
              onChange={(e) =>
                setSocialData({ ...socialData, linkedin: e.target.value })
              }
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#0b0e19] mb-2">
              Facebook
            </label>
            <input
              type="text"
              value={socialData.facebook}
              onChange={(e) =>
                setSocialData({ ...socialData, facebook: e.target.value })
              }
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#0b0e19] mb-2">
              Upwork
            </label>
            <input
              type="text"
              value={socialData.upwork}
              onChange={(e) =>
                setSocialData({ ...socialData, upwork: e.target.value })
              }
              className={inputClass}
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#e5e5e5] p-6 space-y-5">
        <h2 className="text-lg font-semibold text-[#0b0e19]">Company</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-[#0b0e19] mb-2">
              Name
            </label>
            <input
              type="text"
              value={companyData.name}
              onChange={(e) =>
                setCompanyData({ ...companyData, name: e.target.value })
              }
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#0b0e19] mb-2">
              Tagline
            </label>
            <input
              type="text"
              value={companyData.tagline}
              onChange={(e) =>
                setCompanyData({ ...companyData, tagline: e.target.value })
              }
              className={inputClass}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#0b0e19] mb-2">
            Description
          </label>
          <textarea
            rows={3}
            value={companyData.description}
            onChange={(e) =>
              setCompanyData({ ...companyData, description: e.target.value })
            }
            className={`${inputClass} resize-none`}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-[#0b0e19] mb-2">
              Founded
            </label>
            <input
              type="text"
              value={companyData.founded}
              onChange={(e) =>
                setCompanyData({ ...companyData, founded: e.target.value })
              }
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#0b0e19] mb-2">
              CEO
            </label>
            <input
              type="text"
              value={companyData.ceo}
              onChange={(e) =>
                setCompanyData({ ...companyData, ceo: e.target.value })
              }
              className={inputClass}
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#e5e5e5] p-6 flex items-center justify-end gap-3 sticky bottom-4">
        {saved && !pending && (
          <span className="text-sm text-green-600 flex items-center gap-1">
            <Check className="w-4 h-4" />
            Saved
          </span>
        )}
        <button
          type="submit"
          disabled={pending}
          className="btn-gradient text-white px-6 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {pending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          Save Settings
        </button>
      </div>
    </form>
  );
}
