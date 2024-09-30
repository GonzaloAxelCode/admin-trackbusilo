"use client";


import { useDataContext } from "@/context/DataContext";
import { Autocomplete, AutocompleteItem, Avatar, Skeleton } from "@nextui-org/react";
import { useEffect, useState } from "react";
import DropdownSelectDate from "./DropdownSelectDate";


export default function ListConductoresScroll() {
    const { users, isLoadingUsers, setSelectUser } = useDataContext();

    const [value, setValue] = useState(users[0]?.username || "");
    const [selectedKey, setSelectedKey] = useState(users[0]?.id_user);
    useEffect(() => {
        setValue(users[0]?.username || "")
        setSelectedKey(users[0]?.id_user)
    }, [])
    const onSelectionChange = (id) => {
        setSelectedKey(id);
        console.log(users[id - 1]?.id_user)
        setSelectUser(users[id - 1]?.id_user)
    };

    const onInputChange = (value) => {
        setValue(value)
        console.log(value)
    };

    if (isLoadingUsers) {
        return <div className="flex gap-3  items-center justify-center">
            <div className="w-full flex items-center gap-3">
                
                <div className="w-full flex flex-col gap-2">
                    <Skeleton className="h-3 w-full rounded-lg" />
                    <Skeleton className="h-3 w-full rounded-lg" />
                </div>
            </div>
            <DropdownSelectDate />
        </div>

    }
    return (
        <div className="flex gap-3 flex-col items-center justify-center px-5 mb-5">

            <Autocomplete
                allowsCustomValue={true}
                onSelectionChange={onSelectionChange}
                onInputChange={onInputChange}
                defaultInputValue={users[0]?.username || ""}
                defaultItems={users}
                variant="underlined"
                label="Seleccionado"
                placeholder="Selecciona un conductor"
                className="max-w-xs"
            >
                {(user: any) => (
                    <AutocompleteItem
                        key={user.id_user} textValue={user.username} >
                        <div className="flex gap-2 items-center">
                                                       <div className="flex flex-col">
                                <span className="text-small">{user.username}</span>

                            </div>
                        </div>
                    </AutocompleteItem>
                )}
            </Autocomplete>
            <DropdownSelectDate />
        </div>
    );
}



