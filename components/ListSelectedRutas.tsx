
"use client"
import { Listbox, ListboxItem } from "@nextui-org/react";
import React from "react";

export default function ListSelectedRutas() {
    const [selectedKeys, setSelectedKeys] = React.useState<any>(new Set(["text"]));

    const selectedValue = React.useMemo(
        () => Array.from(selectedKeys).join(", "),
        [selectedKeys]
    );

    return (
        <div className="flex mt-10 flex-col gap-2 relative z-10 bg-white">
            <div className="w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">

                <Listbox
                    aria-label="Single selection example"
                    variant="flat"
                    disallowEmptySelection
                    selectionMode="single"
                    selectedKeys={selectedKeys}
                    onSelectionChange={setSelectedKeys}
                >
                    <ListboxItem key="text">Text</ListboxItem>
                    <ListboxItem key="number">Number</ListboxItem>
                    <ListboxItem key="date">Date</ListboxItem>
                    <ListboxItem key="single_date">Single Date</ListboxItem>
                    <ListboxItem key="iteration">Iteration</ListboxItem>
                </Listbox>
            </div>

        </div>
    );
}
