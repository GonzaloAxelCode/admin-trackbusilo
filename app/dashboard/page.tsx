"use client"

import {Tabs, Tab, Chip} from "@nextui-org/react";
import { useDataContext } from "@/context/DataContext";
import { useEffect, useState } from "react";
import TableLocationsMarkings from "./components/TableLocationsMarkings";
import {Autocomplete, Calendar,AutocompleteItem} from "@nextui-org/react";
import {parseDate} from '@internationalized/date';
import ListConductoresScroll from "./components/ListConductoresScroll";
import SidebarLaps from "@/components/SidebarLaps";
export default function ProductsPage() {

  const { users, isLoadingUsers, setSelectUser ,trips,setSelectTrip} = useDataContext();

   return (
    <div className='bg-white flex flex-wrap md:flex-nowrap w-full gap-2 relative mt-8'>
      
      <div className="w-[100%]  md:w-[30%]">

        <div className="top-[50px] sticky">

           
          <ListConductoresScroll />
        
      <div className="hidden md:grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-auto gap-2">
        {users.map((user:any,index:any) => (
          <div
            onClick={()=> setSelectUser (user.id_user)}
            key={index}
            className="aspect-square bg-[#2b2b2b] cursor-pointer  border-2 rounded-lg flex items-center justify-center text-white   w-full  max-w-[100px] border border-white mx-auto"
          >
            <p className="font-bold text-xs sm:text-sm ">
            </p>
            { user.username || user.placa_auto}
          </div>
        ))}
      </div>

        </div>

      </div>
      <div className="w-full md:w-[100%] h-screen md:h-auto">
        <div className=" pb-6 flex justify-between">
         
                 </div>
        <div className="flex w-full flex-col mb-4 ">
          <SidebarLaps />
     </div>  
           <TableLocationsMarkings  />

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
