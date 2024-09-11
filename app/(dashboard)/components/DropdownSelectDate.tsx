import { useDataContext } from "@/context/DataContext";
import { DatePicker } from "@nextui-org/react";
import "react-day-picker/style.css";

import { getLocalTimeZone, now } from "@internationalized/date";
import { useState } from "react";

const DropdownSelectDate = () => {
  let [value, setValue] = useState(now(getLocalTimeZone()));


  function convertToISOString(dateTime: any): string {
    const { year, month, day, hour, minute, second, millisecond } = dateTime;

    // Asegurar que el mes y día tengan dos dígitos
    const monthStr = month < 10 ? `0${month}` : `${month}`;
    const dayStr = day < 10 ? `0${day}` : `${day}`;

    // Asegurar que la hora, minutos, y segundos tengan dos dígitos
    const hourStr = hour < 10 ? `0${hour}` : `${hour}`;
    const minuteStr = minute < 10 ? `0${minute}` : `${minute}`;
    const secondStr = second < 10 ? `0${second}` : `${second}`;

    // Asegurar que los milisegundos tengan tres dígitos
    const millisecondStr = millisecond.toString().padStart(3, '0');

    // Construir la cadena en formato ISO 8601
    return `${year}-${monthStr}-${dayStr}T${hourStr}:${minuteStr}:${secondStr}.${millisecondStr}0000000`;
  }
  const { dateSelected, setDateSelected } = useDataContext();
  return (
    <div>
      <DatePicker

        label="Seleccionar fecha"
        variant="faded"
        hideTimeZone

        value={value}


        defaultValue={now(getLocalTimeZone())}
        onChange={(val) => {
          setValue(val)
          setDateSelected(convertToISOString(val))
        }}
      />

    </div>
  );
};

export default DropdownSelectDate;

