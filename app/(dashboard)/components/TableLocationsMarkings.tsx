import {
    Button,
    Chip,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Input,
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow
} from "@nextui-org/react";
import React from "react";

import { ChevronDownIcon, SearchIcon } from "@/components/icons";
import { columns, statusOptions } from "./datamarkings";

import { useDataContext } from "@/context/DataContext";
import { capitalize, formatTime } from "@/lib/utils";

const statusColorMap = {
    temprano: "success",
    tarde: "danger",
    ultimo_minuto: "warning",
};

const INITIAL_VISIBLE_COLUMNS = ["diferencia_tiempo", "nombre_origen_ubicacion", "nombre_destino_ubicacion", "hora_marca", "state"];

export default function TableLocationsMarkings() {
    const { markings, errorTrips, loadingTrips, selectTrip } = useDataContext();
    const [filterValue, setFilterValue] = React.useState<any>("");

    const [visibleColumns, setVisibleColumns] = React.useState<any>(new Set(INITIAL_VISIBLE_COLUMNS));
    const [statusFilter, setStatusFilter] = React.useState<any>("all");
    const [rowsPerPage, setRowsPerPage] = React.useState<any>(20);

    const [page, setPage] = React.useState<any>(1);

    const hasSearchFilter = Boolean(filterValue);

    const headerColumns = React.useMemo(() => {
        if (visibleColumns === "all") return columns;

        return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [visibleColumns]);

    const filteredItems = React.useMemo(() => {
        let filteredUsers = [...markings];

        if (hasSearchFilter) {
            filteredUsers = filteredUsers.filter((user) =>
                user.nombre_origen_ubicacion.toLowerCase().includes(filterValue.toLowerCase()),
            );
        }
        if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
            filteredUsers = filteredUsers.filter((user) =>
                Array.from(statusFilter).includes(user.state),
            );
        }

        return filteredUsers;
    }, [markings, filterValue, statusFilter]);



    const items = React.useMemo(() => {
        return filteredItems
    }, [page, filteredItems, rowsPerPage]);

    const renderCell = React.useCallback((user, columnKey) => {
        const cellValue = user[columnKey];

        switch (columnKey) {

            case "nombre_origen_ubicacion":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small capitalize">{user.nombre_origen_ubicacion}</p>
                        <p className="text-bold text-tiny capitalize text-default-400">{user.nombre_destino_ubicacion}</p>
                    </div>
                );
            case "hora_marca":
                return (

                    <p className="">{formatTime(user.hora_marca)}</p>

                );
            case "state":
                const stateColor: any = user.state == "Temprano" ? "success" : user.state === "Tarde" ? "danger" : "warning"
                return (
                    <Chip className="capitalize" color={stateColor} size="sm" variant="flat">
                        {user.state}
                    </Chip>
                );

            default:
                return cellValue;
        }
    }, []);



    const onRowsPerPageChange = React.useCallback((e) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);

    const onSearchChange = React.useCallback((value) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue("");
        }
    }, []);

    const onClear = React.useCallback(() => {
        setFilterValue("")
        setPage(1)
    }, [])

    const topContent = React.useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-3 items-end">
                    <Input
                        isClearable
                        className="w-full sm:max-w-[44%]"
                        placeholder="Buscar por ubicacion"
                        startContent={<SearchIcon />}
                        value={filterValue}
                        onClear={() => onClear()}
                        onValueChange={onSearchChange}
                    />
                    <div className="flex gap-3">
                        <Dropdown>
                            <DropdownTrigger className="hidden sm:flex">
                                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                                    Estado de marca
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Table Columns"
                                closeOnSelect={false}
                                selectedKeys={statusFilter}
                                selectionMode="multiple"
                                onSelectionChange={setStatusFilter}
                            >
                                {statusOptions.map((status) => (
                                    <DropdownItem key={status.uid} className="capitalize">
                                        {capitalize(status.name)}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>

                    </div>
                </div>

            </div>
        );
    }, [
        filterValue,
        statusFilter,
        visibleColumns,
        onRowsPerPageChange,
        markings.length || 0,
        onSearchChange,
        hasSearchFilter,
    ]);

    return (
        <Table
            aria-label="Example table with custom cells, pagination and sorting"
            isHeaderSticky


            classNames={{
                wrapper: "min-h-[382px]",
            }}
            showSelectionCheckboxes={false}


            topContent={topContent}
            topContentPlacement="outside"


        >
            <TableHeader columns={headerColumns}>
                {(column) => (
                    <TableColumn
                        key={column.uid}
                        align={"start"}

                    >
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody emptyContent={loadingTrips ? <Skeleton isLoaded={loadingTrips} className="rounded-lg">
                <div className="h-full w-full rounded-lg bg-secondary"></div>
            </Skeleton> : "No hay marcas de tiempo"} items={items}>
                {(item) => (
                    <TableRow key={item.id_marca}>
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
