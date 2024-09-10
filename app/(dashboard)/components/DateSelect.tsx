import { useDataContext } from "@/context/DataContext";
import { getLocalTimeZone, today } from "@internationalized/date";
import { Calendar } from "@nextui-org/react";
import React from "react";

function DateSelect() {
    let defaultDate = today(getLocalTimeZone());
    let [value, setValue] = React.useState(defaultDate);
    const { setDateSelected } = useDataContext()

    function convertirFecha(json) {
        const year = json.year;
        const month = json.month - 1; // Ajustar el mes (base 0 en JavaScript)
        const day = json.day;

        const fecha = new Date(year, month, day);

        const fechaISO = fecha.toISOString().split('.')[0]; // Obtener fecha en formato ISO sin milisegundos
        const milisegundos = ".2830000000"; // Ajustar aquí los milisegundos deseados

        return fechaISO + milisegundos;
    }

    return (


        <div className="flex flex-col gap-4">
            <Calendar
                aria-label="Date (Presets)"
                classNames={{
                    content: "w-full",
                }}
                focusedValue={value}
                nextButtonProps={{
                    variant: "bordered",
                }}
                prevButtonProps={{
                    variant: "bordered",
                }}

                value={value}
                onChange={(val) => {
                    setValue(val)
                    setDateSelected(convertirFecha(val))
                }}
                onFocusChange={setValue}
            />
        </div>
    );
}
export default DateSelect