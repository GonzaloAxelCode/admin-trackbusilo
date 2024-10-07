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

import { STATE_MARKING } from "@/constants/globalconstants";
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

    const renderCell = React.useCallback((marking, columnKey) => {
        const cellValue = marking[columnKey];

  
        switch (columnKey) {

            case "nombre_origen_ubicacion":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold  capitalize">{marking.nombre_origen_ubicacion}</p>

                    </div>
                );
            case "hora_marca_formated":
                return (

                    <p className="">{formatTime(marking.hora_marca)}</p>

                );
            case "state":
                const stateColor: any = marking.state == STATE_MARKING.EXACTO ? "success" : marking.state === STATE_MARKING.TARDE ? "danger" : "warning"

  const color = (statemarking: any) => {

    if (statemarking === STATE_MARKING.TARDE) {
      return "rgba(255, 0,0, 0.4)"//red
    } else if (statemarking === STATE_MARKING.EXACTO) {
      return "rgba(0, 215, 0, 0.4)" //green
    } else {
      return "rgba(238, 221, 10, 0.5)"//yellow
    }
  }
                return (
                    <div className="capitalize" style={{
                        background:color(marking.state)

                        }}>
                        <p>
                            {marking.state}
                        </p>
                    </div>
                );

            default:
                return cellValue;
        }
    }, []);


    return (
        <Table

            isHeaderSticky
            classNames={{
                wrapper: "min-h-[382px]",
            }}
            showSelectionCheckboxes={false}
            topContent={null}
            topContentPlacement="outside"
            layout="auto"
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
                        {(columnKey) => <TableCell className="text-xl">{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
