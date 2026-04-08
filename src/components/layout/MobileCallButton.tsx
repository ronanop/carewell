export function MobileCallButton({ phone }: { phone?: string | null }) {
  if (!phone) return null;
  const tel = phone.replace(/\s/g, "");
  return (
    <a
      href={`tel:${tel}`}
      className="fixed bottom-6 left-4 z-40 flex h-12 items-center rounded-full bg-primary px-4 text-sm font-semibold text-white shadow-lg md:hidden"
      style={{ bottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
    >
      Call
    </a>
  );
}
