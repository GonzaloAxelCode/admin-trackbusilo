"use client"

import SidebarLaps from "@/components/SidebarLaps";
import { useDataContext } from "@/context/DataContext";
import DropdownSelectDate from "./components/DropdownSelectDate";
import TableLocationsMarkings from "./components/TableLocationsMarkings";
export default function ProductsPage() {

  const { users, isLoadingUsers, selectUser, setSelectUser, trips, setSelectTrip } = useDataContext();

  return (
    <div className='bg-white flex flex-wrap md:flex-nowrap w-full gap-2 relative mt-8 flex-col'>
      <div className="flex w-full gap-4">
        <div>
          <DropdownSelectDate />
        </div>
        <div className="flex flex-wrap w-full  gap-3 h-[280px] overflow-y-auto">
          {[...users].map((user: any, index: any) => (
            <div
              onClick={() => setSelectUser(user.id_user)}
              key={index}
              className={` w-[100px] max-h-[30px] ${user.id_user === selectUser ? "bg-[#2b2b2b]" : "bg-white"} border-2 border-[#2b2b2b] cursor-pointer  rounded-lg flex items-center justify-center  ${user.id_user === selectUser ? "text-white" : "text-black"}`}
            >
              <p className="font-bold text-xs ">
                {user.username || user.placa_auto}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full md:w-[100%] h-screen md:h-auto">
        <div className="flex w-full flex-col mb-4 ">
          <SidebarLaps />
        </div>
        <TableLocationsMarkings />
      </div>
    </div>
  );
}



/**
 * 
 * 
 * <div className="mx-auto">
        <ListConductoresScroll />
      </div>
      <div className="flex gap-3 space-between pt-10">

        <div className="flex flex-col gap-3">
          <SidebarLaps />
        </div>
        <div>
                 </div>
      </div>
 * 
 */
