interface AdminPageHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export default function AdminPageHeader({
  title,
  description,
  action,
}: AdminPageHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4 mb-8">
      <div>
        <h1 className="text-2xl font-bold text-[#0b0e19]">{title}</h1>
        {description && (
          <p className="text-sm text-[#737373] mt-1">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}
