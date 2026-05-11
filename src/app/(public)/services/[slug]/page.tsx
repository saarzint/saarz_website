import { notFound } from "next/navigation";
import { getServiceBySlug } from "@/lib/content";
import ServiceDetailContent from "./ServiceDetailContent";

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) return notFound();

  return <ServiceDetailContent service={service} />;
}
