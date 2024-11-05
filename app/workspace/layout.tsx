import Navbar from "@/components/navbar";

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}