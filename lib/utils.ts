import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatTime(dateTimeStr: string): string {
  // Convertir la cadena a un objeto Date
  const date = new Date(dateTimeStr);

  // Extraer horas, minutos y segundos
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  // Determinar si es AM o PM
  const ampm = hours >= 12 ? 'PM' : 'AM';

  // Convertir el formato de 24 horas a 12 horas
  hours = hours % 12;
  hours = hours ? hours : 12; // La hora '0' debe ser '12'

  // Formatear con ceros a la izquierda si es necesario
  const hoursStr = hours < 10 ? `0${hours}` : `${hours}`;
  const minutesStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const secondsStr = seconds < 10 ? `0${seconds}` : `${seconds}`;

  // Retornar la hora formateada
  return `${hoursStr}:${minutesStr}:${secondsStr} ${ampm}`;
}