import { useDataContext } from "@/context/DataContext";
import { Calendar } from "@nextui-org/react";
import "react-day-picker/style.css";

import { getLocalTimeZone, now } from "@internationalized/date";
import { useState } from "react";

const DropdownSelectDate = () => {
  let [value, setValue] = useState<any>(now(getLocalTimeZone()));
  function formatDate(obj) {
    const date = new Date(obj.year, obj.month - 1, obj.day, obj.hour, obj.minute, obj.second, obj.millisecond);
    const utcDate = new Date(date.getTime() - obj.offset);
    const formattedDate = utcDate.toISOString().replace('Z', '000000000Z');
    return formattedDate;
  }
  const { dateSelected, setDateSelected } = useDataContext();
  return (

    <Calendar   defaultValue={now(getLocalTimeZone())}
      onChange={(val) => {
        setDateSelected(formatDate(val))

      }}
    />

  );
};

export default DropdownSelectDate;

