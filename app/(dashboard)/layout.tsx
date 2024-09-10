"use client"



export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (

    <section className="flex  w-full flex-col bg-muted/40">

      {children}

    </section>


  );
}

