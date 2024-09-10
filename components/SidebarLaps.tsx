"use client"

import { useDataContext } from "@/context/DataContext";
import { Listbox, ListboxItem } from "@nextui-org/react";
import { useState } from "react";
import {
    IconWrapper,
    PullRequestIcon
} from "./icons";



function SidebarLaps() {
    const { trips, errorTrips, setSelectTrip, selectTrip, loadingTrips } = useDataContext();
    const [selected, setSelected] = useState(trips[0])
    const onActionTrips = (tripsnumber: any) => {
        setSelected(trips[tripsnumber])
        setSelectTrip(tripsnumber)
        console.log(trips[tripsnumber])
    }
    return (
        <div className="flex flex-col  mt-[17px]"><p className="text-center py-2 font-bold">Vueltas realizadas </p>

            <Listbox
                emptyContent={<div className="p-6 text-center text-sm flex justify-center items-center">
                    No existen vueltas para este usuario.
                </div>}
                aria-label="User Menu"

                onAction={onActionTrips}
                className="min-h-[382px]  w-[250px] p-0 gap-0 divide-y divide-default-300/50 dark:divide-default-100/80 bg-content1 max-w-[300px] overflow-visible shadow-small rounded-medium"
                itemClasses={{
                    base: "px-3 py-2  first:rounded-t-medium last:rounded-b-medium rounded-none gap-3 h-12 data-[hover=true]:bg-default-100/80",
                }}
            >

                {trips.map((el: any, index: any) => {
                    return <ListboxItem
                        textValue={el.id_trip}
                        key={index}
                        className="p-4"
                        startContent={
                            <IconWrapper className=" bg-primary/10 text-green">
                                <PullRequestIcon fill={"red"} className="text-lg" />
                            </IconWrapper>
                        }
                    >
                        Vuelta {index + 1}
                    </ListboxItem>
                })}

            </Listbox>
        </div>
    );
}

export default SidebarLaps
