

"use client"

//@ts-ignore
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { zonesiloruta2_miramar } from '@/data/rutas';
import { Listbox, ListboxItem } from "@nextui-org/react";
import React, { useEffect, useRef, useState } from "react";

mapboxgl.accessToken = 'pk.eyJ1IjoiZ29uemFsb2F4ZWxoIiwiYSI6ImNrdjFyYnltYjA5Z3IycGwweWtwcnZzOWQifQ.3LHakWc4sqPqz84a8YaQ4w';
mapboxgl.accessToken = 'TU_MAPBOX_ACCESS_TOKEN'; // Asegúrate de tener tu access token aquí

export default function RutasPage() {
    const [selectedKeys, setSelectedKeys] = React.useState<any>(new Set(["text"]));
    const selectedValue = React.useMemo(
        () => Array.from(selectedKeys).join(", "),
        [selectedKeys]
    );
    const mapContainer = useRef(null);
    const map = useRef<any>(null);
    const [lng, setLng] = useState(-70.9);
    const [lat, setLat] = useState(42.35);
    const [zoom, setZoom] = useState(9);

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/light-v11',
            center: [lng, lat],
            zoom: zoom
        });

        // Listener para actualizar coordenadas del mapa
        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });

        // Agregar marcadores de origen al mapa
        zonesiloruta2_miramar.forEach((zona: any) => {
            new mapboxgl.Marker({ color: 'red' }) // Color de los marcadores
                .setLngLat([zona.center_origen_lon, zona.center_origen_lat])
                .setPopup(new mapboxgl.Popup().setHTML(`<strong>${zona.nombre_origen_ubicacion}</strong>`)) // Popup al hacer clic
                .addTo(map.current);
        });

    }, []);

    return (
        <div>
            <div className="flex mt-10 flex-col gap-2 relative z-10 bg-white">
                <div className="w-[260px] absolute left-5 top-5 border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">

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
            <div ref={mapContainer} style={{
                flex: 1,
                width: "100%",
                height: "100%",
                color: '#fff',
                overflow: "hidden",
                fontFamily: 'monospace',
                zIndex: 1,
                position: 'absolute',
                top: 0,
                left: 0,
                borderRadius: '4px'
            }} />
        </div>
    );
}
