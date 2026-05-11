// Login page has its own minimal layout (no public navbar/footer)
export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
