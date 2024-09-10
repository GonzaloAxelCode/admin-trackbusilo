import ListSelectedRutas from "@/components/ListSelectedRutas";
import MapScreen from "@/components/MapScreen";
export const runtime = 'edge';
export default function RutasPage() {
    return <div>
        <ListSelectedRutas />

        <MapScreen />
    </div>
}