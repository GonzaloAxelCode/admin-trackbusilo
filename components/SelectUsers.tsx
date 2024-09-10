import { Avatar, Select, SelectItem } from "@nextui-org/react";
import { users } from "./data";

export default function SelectUsers() {
    return (
        <Select
            items={users}
            label="Conductor asignado"
            className="max-w-xs"
            variant="bordered"

            inputMode="search"
            classNames={{
                label: "group-data-[filled=true]:-translate-y-5",
                trigger: "min-h-16",
                listboxWrapper: "max-h-[400px]",
            }}
            listboxProps={{
                itemClasses: {
                    base: [
                        "rounded-md",
                        "text-default-500",
                        "transition-opacity",
                        "data-[hover=true]:text-foreground",
                        "data-[hover=true]:bg-default-100",
                        "dark:data-[hover=true]:bg-default-50",
                        "data-[selectable=true]:focus:bg-default-50",
                        "data-[pressed=true]:opacity-70",
                        "data-[focus-visible=true]:ring-default-500",
                    ],
                },
            }}
            popoverProps={{
                classNames: {
                    base: "before:bg-default-200",
                    content: "p-0 border-small border-divider bg-background",
                },
            }}
            renderValue={(items) => {
                return items.map((item) => (
                    <div key={item.key} className="flex items-center gap-2">
                        <Avatar
                            alt={item.data.name}
                            className="flex-shrink-0"
                            size="sm"
                            src={item.data.avatar}
                        />
                        <div className="flex flex-col">
                            <span>{item.data.name}</span>
                            <span className="text-default-500 text-tiny">({item.data.email})</span>
                        </div>
                    </div>
                ));
            }}
        >
            {(user) => (
                <SelectItem key={user.id} textValue={user.name}>
                    <div className="flex gap-2 items-center">
                        <Avatar alt={user.name} className="flex-shrink-0" size="sm" src={user.avatar} />
                        <div className="flex flex-col">
                            <span className="text-small">{user.name}</span>
                            <span className="text-tiny text-default-400">{user.email}</span>
                        </div>
                    </div>
                </SelectItem>
            )}
        </Select>
    );
}
