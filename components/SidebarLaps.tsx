"use client"

import { useDataContext } from "@/context/DataContext";
import { Tab, Tabs } from "@nextui-org/react";
import { useState } from "react";



function SidebarLaps() {
    const { trips, errorTrips, setSelectTrip, selectTrip, loadingTrips } = useDataContext();


    const onActionTrips = (tripsnumber: any) => {

        setSelectTrip(tripsnumber)
        console.log(trips[tripsnumber])
    }

    const [selected1, setSelected1] = useState<any>(0);
    const onSelectionChange = (val: any) => {
        console.log(val)
        setSelected1(val)
        setSelectTrip(val)
    }
    return (
        <div className="flex flex-col">
            <Tabs
                aria-label="Options"
                selectedKey={selected1}
                onSelectionChange={onSelectionChange}

            >
                {trips.map((el: any, index: number) => {
                    return <Tab key={index} title={`Vuelta ${index + 1}`}>

                    </Tab>
                })}


            </Tabs>
        </div>
    );
}

export default SidebarLaps
