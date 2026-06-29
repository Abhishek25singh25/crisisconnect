import React, { useState, useEffect } from "react";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import useSocket from "../../hooks/useSocket";
import { useNavigate } from "react-router-dom";

const VolunteerDashboard = () => {
const navigate = useNavigate();
const { user, logout } = useAuth();


const [alerts, setAlerts] = useState([]);
const [isAvailable, setIsAvailable] = useState(true);

const socket = useSocket();

useEffect(() => {
    const fetchAlerts = async () => {
        try {
            const response = await api.get("/api/sos/all");

            if (response.data.success) {
                setAlerts(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching alerts:", error);
        }
    };

    fetchAlerts();
}, []);

useEffect(() => {
    if (!socket) return;

    socket.on("sos:received", (newAlert) => {
        setAlerts((prev) => [newAlert, ...prev]);
    });

    return () => {
        socket.off("sos:received");
    };
}, [socket]);

const handleAccept = async (id) => {
    try {
        const response = await api.put(`/api/sos/accept/${id}`);

        if (response.data.success) {
            setAlerts((prevAlerts) =>
                prevAlerts.filter((alert) => alert._id !== id)
            );

            alert("Accepted!");
        }
    } catch (error) {
        console.error("Error accepting alert:", error);
    }
};

const toggleAvailability = () => {
    setIsAvailable(!isAvailable);
};

return (
    <div className="min-h-screen bg-gray-100">
        <nav className="bg-green-600 text-white p-4 flex justify-between items-center shadow-lg">
            <div className="text-2xl font-bold">
                🚨 CrisisConnect
            </div>

            <div className="flex items-center gap-4">
                <span className="bg-white text-green-600 px-4 py-2 rounded-full font-semibold">
                    Volunteer
                </span>

                <button
                    onClick={toggleAvailability}
                    className={`px-4 py-2 rounded-lg font-semibold text-white transition ${
                        isAvailable
                            ? "bg-green-500 hover:bg-green-700"
                            : "bg-gray-500 hover:bg-gray-600"
                    }`}
                >
                    {isAvailable ? "Online" : "Offline"}
                </button>

                <button
                    onClick={() => {
                        logout();
                        navigate("/");
                    }}
                    className="bg-white text-green-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
                >
                    Logout
                </button>
            </div>
        </nav>

        <div className="max-w-6xl mx-auto p-6">
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                <h1 className="text-3xl font-bold text-gray-800">
                    Welcome, {user?.name || "Volunteer"}
                </h1>

                <p className="text-gray-600 mt-2">
                    View and respond to nearby SOS alerts.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white rounded-xl shadow-md p-6">
                    <h3 className="text-gray-500 text-sm">
                        Active Alerts
                    </h3>

                    <p className="text-4xl font-bold text-green-600 mt-2">
                        {alerts.length}
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6">
                    <h3 className="text-gray-500 text-sm">
                        Availability
                    </h3>

                    <p
                        className={`text-2xl font-bold mt-2 ${
                            isAvailable
                                ? "text-green-600"
                                : "text-gray-500"
                        }`}
                    >
                        {isAvailable ? "Online" : "Offline"}
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6">
                    <h3 className="text-gray-500 text-sm">
                        Volunteer Role
                    </h3>

                    <p className="text-2xl font-bold text-blue-600 mt-2">
                        Responder
                    </p>
                </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Nearby SOS Alerts
            </h2>

            {alerts.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
                    No SOS alerts available.
                </div>
            ) : (
                <div className="space-y-4">
                    {alerts.map((alert) => (
                        <div
                            key={alert._id}
                            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-bold capitalize text-gray-800">
                                        {alert.emergency}
                                    </h3>
                                </div>

                                <span
                                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                        alert.severity === "critical"
                                            ? "bg-red-100 text-red-800"
                                            : alert.severity === "urgent"
                                            ? "bg-orange-100 text-orange-800"
                                            : "bg-green-100 text-green-800"
                                    }`}
                                >
                                    {alert.severity}
                                </span>
                            </div>

                            <p className="text-gray-600 mb-4">
                                {alert.description}
                            </p>

                            {alert.images && alert.images.length > 0 && (
                                <div className="flex gap-2 mt-2 mb-4 flex-wrap">
                                    {alert.images.map((img, i) => (
                                        <img
                                            key={i}
                                            src={img}
                                            className="w-24 h-24 object-cover rounded"
                                        />
                                    ))}
                                </div>
                            )}

                            <div className="bg-gray-50 border rounded-lg p-4 mb-4">
                                <h4 className="font-semibold text-gray-700 mb-2">
                                    Victim Details
                                </h4>

                            <p>
                                👤 <strong>Victim:</strong>{" "}
                                {alert.victim?.name || "Unknown"}
                            </p>

                            <p>
                                📞 <strong>Phone:</strong>{" "}
                                    {alert.victim?.phone || "Not provided"}
                                </p>

                            <p>
                                📧 <strong>Email:</strong>{" "}
                                    {alert.victim?.email || "Not provided"}
                            </p>
                        </div>

                        <button
                                onClick={() => handleAccept(alert._id)}
                                className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
                                >
                                Accept Alert
                        </button>
                            
                        </div>
                    ))}
                </div>
            )}
        </div>
    </div>
);


};

export default VolunteerDashboard;
