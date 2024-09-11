"use client";
import { useDisclosure } from '@nextui-org/react';
import Cookies from 'js-cookie';

import moment from 'moment-timezone';

import { createContext, useContext, useState } from 'react';
import useSWR from 'swr';

function extractDate(dateTimeString) {
  // Crea un objeto Date a partir de la cadena de fecha y hora
  const date = new Date(dateTimeString);

  // Extrae la fecha en formato 'YYYY:MM:DD'
  const year = date.getFullYear().toString().padStart(4, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Los meses empiezan en 0
  const day = date.getDate().toString().padStart(2, '0');

  // Formatea la fecha en el formato deseado
  return `${year}-${month}-${day}`;
}
const formatDate = (date: Date): string => {
  // Devolver la fecha y la hora en formato YYYY-MM-DDTHH:mm:ss
  return date.toISOString().replace('Z', '').split('.')[0];
};


const getToken = () => {
  const tokenCookie = Cookies.get('token');
  return tokenCookie ? `Bearer ${tokenCookie}` : '';
};
const DataContext = createContext(null);
const fetcher = async (url: string) => {
  const token = getToken(); // Obtener el token desde las cookies

  const response: any = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token, // Incluir el token en la cabecera
    },
  });

  if (!response.ok) {
    const error: any = new Error('Error en la solicitud');
    error.status = response.status;
    throw error;
  }

  return response.json();
};
export const DataProvider = ({ children }) => {

  const { data: users, error: errorUsers, isLoading: isLoadingUsers } = useSWR("https://apiexample.gonzaloaxelh.workers.dev/users", fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 10000,
    })
  const [selectTrip, setSelectTrip] = useState(0)


  const [selectUser, setSelectUser] = useState(1)


  function getLimaTime() {
    const date = moment.tz('America/Lima'); // Obtener la hora actual en la zona horaria de Lima
    return date.format('YYYY-MM-DDTHH:mm:ss'); // Formato similar a ISO 8601 sin milisegundos ni zona horaria
  }
  const [dateSelected, setDateSelected] = useState<string>(getLimaTime());
  console.log(dateSelected)
  const { data: tripsData, error: errorTrips, isLoading: loadingTrips } = useSWR(
    `https://apiexample.gonzaloaxelh.workers.dev/trips?iduser=${selectUser}&date_created=${extractDate(dateSelected)}`,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 10000,
    }
  );

  const registerUser = async (userData: any) => {
    try {
      const token = getToken();
      const response = await fetch("https://apiexample.gonzaloaxelh.workers.dev/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token// Asegúrate de añadir el token JWT si es necesario
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Usuario registrado exitosamente:", data);
      } else {
        console.error("Error al registrar el usuario:", response.statusText);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  }

  const logout = () => {

    Cookies.remove('token', { path: '/' });
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  };
  const { isOpen: isOpenCreate, onOpen: onOpenCreate, onOpenChange: onOpenChangeModalCreate } = useDisclosure();
  return (
    <DataContext.Provider value={{ registerUser, isOpenCreate, onOpenCreate, onOpenChangeModalCreate, logout, loadingTrips, isLoadingUsers, errorUsers, dateSelected, setDateSelected, users: users?.users || [], selectUser, setSelectUser, selectTrip, setSelectTrip, trips: tripsData?.trips || [], markings: tripsData?.trips[selectTrip]?.markingtime || [], errorTrips } as any}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => useContext(DataContext);
