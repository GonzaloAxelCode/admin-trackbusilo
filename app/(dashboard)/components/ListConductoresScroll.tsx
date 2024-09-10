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
            <div className="w-[249px] flex items-center gap-3">
                <div>
                    <Skeleton className="flex rounded-full w-12 h-12" />
                </div>
                <div className="w-full flex flex-col gap-2">
                    <Skeleton className="h-3 w-3/5 rounded-lg" />
                    <Skeleton className="h-3 w-4/5 rounded-lg" />
                </div>
            </div>
            <DropdownSelectDate />
        </div>

    }
    return (
        <div className="flex gap-3  items-center justify-center">

            <Autocomplete
                allowsCustomValue={true}
                onSelectionChange={onSelectionChange}
                onInputChange={onInputChange}
                defaultInputValue={users[0]?.username || ""}
                defaultItems={users}
                variant="bordered"
                label="Seleccionado"
                placeholder="Selecciona un conductor"
                className="max-w-xs"
            >
                {(user: any) => (
                    <AutocompleteItem
                        key={user.id_user} textValue={user.username} >
                        <div className="flex gap-2 items-center">
                            <Avatar alt={user.nombres} className="flex-shrink-0" size="sm" src="https://d2u8k2ocievbld.cloudfront.net/memojis/male/1.png" />
                            <div className="flex flex-col">
                                <span className="text-small">{user.username}</span>
                                <span className="text-tiny text-default-400">{user.correo_electronico}</span>
                            </div>
                        </div>
                    </AutocompleteItem>
                )}
            </Autocomplete>
            <DropdownSelectDate />
        </div>
    );
}
