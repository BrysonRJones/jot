import AccountLogo from "../ui/logo/AccountLogo";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex items-center justify-center md:h-screen flex-col gap-8">
      <div className="flex shrink-0 flex-1 justify-center items-center">
        <AccountLogo />
      </div>
      <div className="shrink-0 flex-[2]">{children}</div>
    </main>
  );
}
