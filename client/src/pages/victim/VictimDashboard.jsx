import React, { useState, useEffect } from "react";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const VictimDashboard = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const [showForm, setShowForm] = useState(false);
    const [emergencyType, setEmergencyType] = useState("medical");
    const [description, setDescription] = useState("");
    const [severity, setSeverity] = useState("critical");
    const [myAlerts, setMyAlerts] = useState([]);
    
    useEffect(() => {
        const fetchAlerts = async () => {
            try {
                const res = await api.get("/api/sos/my-alerts");
                setMyAlerts(res.data.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchAlerts();
    }, []);

    const handleSubmit = async (e) => {
    e.preventDefault();
    navigator.geolocation.getCurrentPosition(async (position) => {
        const location = {
            type: "Point",
            coordinates: [
                position.coords.longitude,
                position.coords.latitude,
            ],
        };
        try {
            await api.post("/api/sos/create", {
                emergency: emergencyType,
                description,
                severity,
                location,
            });
            alert("SOS Sent!");
            setDescription("");
            setEmergencyType("medical");
            setSeverity("critical");
            setShowForm(false);
            const res = await api.get("/api/sos/my-alerts");
            setMyAlerts(res.data.data);
        } catch (error) {
            console.error(error);
            alert("Failed to send SOS");
        }
    });
};
    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navbar */}
            <nav className="bg-red-600 text-white p-4 flex justify-between items-center shadow-lg">
                <div>
                    <h1 className="text-2xl font-bold">
                        🚨 CrisisConnect
                    </h1>
                </div>

                <div className="flex items-center gap-4">
                    <span className="bg-white text-red-600 px-4 py-2 rounded-full font-semibold">
                        Victim
                    </span>

                    <button
                        onClick={() => {
                            logout();
                            navigate("/");
                        }}
                        className="bg-white text-red-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
                    >
                        Logout
                    </button>
                </div>
            </nav>

            {/* Main Content */}
            <div className="max-w-5xl mx-auto p-6">
                {/* Welcome Section */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                    <h2 className="text-3xl font-bold text-gray-800">
                        Welcome, {user?.name || "Victim"}
                    </h2>

                    <p className="text-gray-600 mt-2">
                        Need immediate help? Send an SOS alert and our volunteers
                        will be notified.
                    </p>
                </div>

                {/* SOS Button */}
                <div className="flex justify-center mb-8">
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="bg-red-600 text-white px-8 py-4 rounded-full text-xl font-bold shadow-lg hover:bg-red-700 transition"
                    >
                        🚨 Send SOS
                    </button>
                </div>

                {/* SOS Form */}
                {showForm && (
                    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                        <h3 className="text-2xl font-bold text-red-600 mb-6">
                            Emergency Request Form
                        </h3>

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-4"
                        >
                            {/* Emergency Type */}
                            <div>
                                <label className="block font-semibold mb-2">
                                    Emergency Type
                                </label>

                                <select
                                    value={emergencyType}
                                    onChange={(e) =>
                                        setEmergencyType(e.target.value)
                                    }
                                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                                >
                                    <option value="medical">Medical</option>
                                    <option value="flood">Flood</option>
                                    <option value="earthquake">Earthquake</option>
                                    <option value="fire">Fire</option>
                                    <option value="rescue">Rescue</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block font-semibold mb-2">
                                    Description
                                </label>

                                <textarea
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                    placeholder="Describe your situation..."
                                    rows="4"
                                    required
                                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                                />
                            </div>
                            
                            

                            {/* Severity */}
                            <div>
                                <label className="block font-semibold mb-2">
                                    Severity
                                </label>

                                <select
                                    value={severity}
                                    onChange={(e) =>
                                        setSeverity(e.target.value)
                                    }
                                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                                >
                                    <option value="critical">Critical</option>
                                    <option value="urgent">Urgent</option>
                                    <option value="stable">Stable</option>
                                </select>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                className="w-full bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 transition"
                            >
                                Send SOS Alert
                            </button>
                        </form>
                    </div>
                )}

                {/* Alerts Section */}
                <div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">
                        My Alerts
                    </h2>

                    {myAlerts.length === 0 ? (
                        <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
                            No alerts found.
                        </div>
                    ) : (
                        myAlerts.map((alert) => (
                            <div
                                key={alert._id}
                                className="bg-white rounded-lg shadow p-4 mb-4 hover:shadow-lg transition"
                            >
                                <div className="grid md:grid-cols-3 gap-4">
                                    <div>
                                        <p className="font-semibold text-gray-700">
                                            Type
                                        </p>
                                        <p className="capitalize">
                                            {alert.emergency}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="font-semibold text-gray-700">
                                            Severity
                                        </p>

                                        <span
                                            className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                                                alert.severity === "critical"
                                                    ? "bg-red-100 text-red-700"
                                                    : alert.severity === "urgent"
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : "bg-green-100 text-green-700"
                                            }`}
                                        >
                                            {alert.severity}
                                        </span>
                                    </div>

                                    <div>
                                        <p className="font-semibold text-gray-700">
                                            Status
                                        </p>

                                        <span
                                            className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                                                alert.status === "pending"
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : alert.status === "accepted"
                                                    ? "bg-blue-100 text-blue-700"
                                                    : alert.status === "completed"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-gray-100 text-gray-700"
                                            }`}
                                        >
                                            {alert.status}
                                        </span>
                                    </div>
                                </div>

                                {alert.description && (
                                    <div className="mt-4 border-t pt-4">
                                        <p className="font-semibold text-gray-700">
                                            Description
                                        </p>

                                        <p className="text-gray-600">
                                            {alert.description}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default VictimDashboard;