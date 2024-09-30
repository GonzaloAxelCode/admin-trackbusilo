"use client"



export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="max-w-[1500px]  w-full px-4 bg-white mx-auto">
      {children}
    </section>
  );
}

