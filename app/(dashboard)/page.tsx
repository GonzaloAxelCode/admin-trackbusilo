"use client"

import SidebarLaps from "@/components/SidebarLaps";
import ListConductoresScroll from "./components/ListConductoresScroll";
import TableLocationsMarkings from "./components/TableLocationsMarkings";

export const runtime = 'edge';
export default function ProductsPage() {
  return (
    <section className='bg-white justify-center items-center mx-auto flex-col flex gap-3 space-between pt-10'>
      <div className="mx-auto">
        <ListConductoresScroll />
      </div>
      <div className="flex gap-3 space-between pt-10">

        <div className="flex flex-col gap-3">
          <SidebarLaps />
        </div>
        <div>
          <TableLocationsMarkings />
        </div>
      </div>
    </section>
  );
}
