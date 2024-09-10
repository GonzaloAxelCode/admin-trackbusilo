
"use client"
//@ts-ignore
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { useEffect, useRef, useState } from 'react';

mapboxgl.accessToken = 'pk.eyJ1IjoiZ29uemFsb2F4ZWxoIiwiYSI6ImNrdjFyYnltYjA5Z3IycGwweWtwcnZzOWQifQ.3LHakWc4sqPqz84a8YaQ4w';

export default function MapScreen() {
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

        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });
    });

    return (


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

    );
}