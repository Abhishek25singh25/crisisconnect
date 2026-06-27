import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { useState, useEffect } from "react"
import api from "../../services/api"

const MapView = () => {
   
    const [alerts, setAlerts] = useState([])

    useEffect(() => {
        const fetchAlerts = async () => {
            const res = await api.get("/api/sos/all")
            setAlerts(res.data.data)
        }
        fetchAlerts()
    }, [])

    return (
        <MapContainer
            center={[28.6139, 77.2090]}
            zoom={13}
            style={{ height: "500px", width: "100%" }}
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {alerts.map((alert) => (
                <Marker
                    key={alert._id}
                    position={[
                        alert.location.coordinates[1],
                        alert.location.coordinates[0]
                    ]}
                >
                    <Popup>
                        <p>{alert.emergency}</p>
                        <p>{alert.severity}</p>
                        <p>{alert.description}</p>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    )
}

export default MapView