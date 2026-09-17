/**
 * Layout for the public marketing site and the auth/onboarding flow.
 * No sidebar, no signed-in chrome - see docs/DECISIONS.md (route groups).
 */
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
