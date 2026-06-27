import React, { useState, useEffect } from "react";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

const NGODashboard = () => {
const { user, logout } = useAuth();
const navigate = useNavigate();


const [resources, setResources] = useState([]);
const [lowStock, setLowStock] = useState([]);
const [showForm, setShowForm] = useState(false);

const [name, setName] = useState("");
const [category, setCategory] = useState("");
const [quantity, setQuantity] = useState(0);
const [unit, setUnit] = useState("");
const [lowStockThreshold, setLowStockThreshold] = useState(0);

const [updateQuantity, setUpdateQuantity] = useState({});

useEffect(() => {
    fetchResources();
    fetchLowStock();
}, []);

const fetchResources = async () => {
    try {
        const res = await api.get("/api/resource/all");
        setResources(res.data.data);
    } catch (error) {
        console.log(error);
    }
};


const fetchLowStock = async () => {
    try {
        const res = await api.get("/api/resource/lowstock");
        setLowStock(res.data.data);
    } catch (error) {
        console.log(error);
    }
};

const handleAddResource = async (e) => {
    e.preventDefault();

    try {
        const res = await api.post("/api/resource/create", {
            name,
            category,
            quantity,
            unit,
            lowStockThreshold,
        });

        setResources((prev) => [...prev, res.data.data]);

        setName("");
        setCategory("");
        setQuantity(0);
        setUnit("");
        setLowStockThreshold(0);

        setShowForm(false);
        fetchLowStock();
    } catch (error) {
        console.log(error);
    }
};

const handleUpdateQuantity = async (id) => {
    try {
        const newQuantity = updateQuantity[id];

        const res = await api.put(`/api/resource/update/${id}`, {
            quantity: newQuantity,
        });

        setResources((prev) =>
            prev.map((resource) =>
                resource._id === id
                    ? res.data.resource
                    : resource
            )
        );

        fetchLowStock();
    } catch (error) {
        console.log(error);
    }
};

const handleLogout = () => {
    logout();
    navigate("/");
};

return (
    <div className="min-h-screen bg-gray-100">
        <nav className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-lg">
            <div className="text-2xl font-bold">
                🚨 CrisisConnect
            </div>

            <div className="flex items-center gap-3">

                 <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold border border-blue-200">
                    NGO
            </div>

            <button
                 onClick={handleLogout}
                 className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2 rounded-lg font-semibold transition duration-300 shadow-md"
                >
                Logout
            </button>

            </div>
        </nav>

        <div className="max-w-6xl mx-auto p-6">
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                <h1 className="text-3xl font-bold text-gray-800">
                    Welcome, {user?.name || "NGO"}
                </h1>

                <p className="text-gray-600 mt-2">
                    Manage disaster relief resources and inventory.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white rounded-xl shadow-md p-6">
                    <h3 className="text-gray-500 text-sm">
                        Total Resources
                    </h3>

                    <p className="text-4xl font-bold text-blue-600 mt-2">
                        {resources.length}
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6">
                    <h3 className="text-gray-500 text-sm">
                        Low Stock Items
                    </h3>

                    <p className="text-4xl font-bold text-red-600 mt-2">
                        {lowStock.length}
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6">
                    <h3 className="text-gray-500 text-sm">
                        Categories
                    </h3>

                    <p className="text-4xl font-bold text-green-600 mt-2">
                        4
                    </p>
                </div>
            </div>

            {lowStock.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
                    <h2 className="text-2xl font-bold text-red-700 mb-4">
                        ⚠️ Low Stock Alerts
                    </h2>

                    <div className="space-y-2">
                        {lowStock.map((item) => (
                            <div
                                key={item._id}
                                className="bg-white p-3 rounded-lg"
                            >
                                <span className="font-semibold">
                                    {item.name}
                                </span>{" "}
                                - {item.quantity} {item.unit} left
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="flex justify-center mb-8">
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-blue-600 text-white px-8 py-4 rounded-full text-xl font-bold hover:bg-blue-700 transition"
                >
                    ➕ Add New Resource
                </button>
            </div>

            {showForm && (
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                    <h2 className="text-2xl font-bold text-blue-600 mb-6">
                        Add Resource
                    </h2>

                    <form
                        onSubmit={handleAddResource}
                        className="space-y-4"
                    >
                        <input
                            type="text"
                            placeholder="Resource Name"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                            className="w-full border rounded-lg p-3"
                        />

                        <select
                            value={category}
                            onChange={(e) =>
                                setCategory(e.target.value)
                            }
                            className="w-full border rounded-lg p-3"
                        >
                            <option value="">
                                Select Category
                            </option>
                            <option value="food">Food</option>
                            <option value="medicine">
                                Medicine
                            </option>
                            <option value="clothes">
                                Clothes
                            </option>
                            <option value="shelter">
                                Shelter
                            </option>
                        </select>

                        <input
                            type="number"
                            placeholder="Quantity"
                            value={quantity}
                            onChange={(e) =>
                                setQuantity(e.target.value)
                            }
                            className="w-full border rounded-lg p-3"
                        />

                        <input
                            type="text"
                            placeholder="Unit"
                            value={unit}
                            onChange={(e) =>
                                setUnit(e.target.value)
                            }
                            className="w-full border rounded-lg p-3"
                        />

                        <input
                            type="number"
                            placeholder="Low Stock Threshold"
                            value={lowStockThreshold}
                            onChange={(e) =>
                                setLowStockThreshold(
                                    e.target.value
                                )
                            }
                            className="w-full border rounded-lg p-3"
                        />

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700"
                        >
                            Add Resource
                        </button>
                    </form>
                </div>
            )}

            <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Resource Inventory
            </h2>

            {resources.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
                    No resources available.
                </div>
            ) : (
                <div className="grid md:grid-cols-2 gap-4">
                    {resources.map((resource) => (
                        <div
                            key={resource._id}
                            className="bg-white rounded-xl shadow-md p-6"
                        >
                            <h3 className="text-xl font-bold text-gray-800 mb-2">
                                {resource.name}
                            </h3>

                            <p className="mb-2">
                                <strong>Category:</strong>{" "}
                                {resource.category}
                            </p>

                            <p className="mb-2">
                                <strong>Quantity:</strong>{" "}
                                {resource.quantity}
                            </p>

                            <p className="mb-4">
                                <strong>Unit:</strong>{" "}
                                {resource.unit}
                            </p>

                            <div className="flex gap-2">
                                <input
                                    type="number"
                                    placeholder="New Quantity"
                                    value={
                                        updateQuantity[
                                            resource._id
                                        ] || ""
                                    }
                                    onChange={(e) =>
                                        setUpdateQuantity({
                                            ...updateQuantity,
                                            [resource._id]:
                                                e.target.value,
                                        })
                                    }
                                    className="flex-1 border rounded-lg p-2"
                                />

                                <button
                                    onClick={() =>
                                        handleUpdateQuantity(
                                            resource._id
                                        )
                                    }
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                                >
                                    Update
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    </div>
);


};

export default NGODashboard;
