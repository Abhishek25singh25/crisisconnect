import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("victim");
    const [phone, setPhone] = useState("");

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await api.post("/api/auth/register", {
                name,
                email,
                password,
                role,
                phone,
            });

            const { user, token } = res.data;

            login(user, token);

            if (user.role === "victim") {
                navigate("/victim");
            } else if (user.role === "volunteer") {
                navigate("/volunteer");
            } else if (user.role === "ngo") {
                navigate("/ngo");
            }
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center relative"
            style={{
                backgroundImage:
                    "url('https://images.unsplash.com/photo-1587745416684-47953f16f02f?w=1920')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black opacity-60"></div>

            {/* Register Card */}
            <div className="bg-white p-8 rounded-lg shadow-lg w-96 relative z-10">
                <h2 className="text-2xl font-bold text-center mb-6">
                    🚨 CrisisConnect
                </h2>

                <p className="text-center text-gray-600 mb-6">
                    Create your account
                </p>

                <form onSubmit={handleSubmit}>
                    <input
                        className="w-full border p-2 rounded mb-4"
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <input
                        className="w-full border p-2 rounded mb-4"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        className="w-full border p-2 rounded mb-4"
                        type="text"
                        placeholder="Enter your phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />

                    <input
                        className="w-full border p-2 rounded mb-4"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <select
                        className="w-full border p-2 rounded mb-4"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                    >
                        <option value="victim">Victim</option>
                        <option value="volunteer">Volunteer</option>
                        <option value="ngo">NGO</option>
                    </select>

                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition"
                    >
                        Register
                    </button>
                </form>

                <p className="text-center mt-4">
                    Already have an account?{" "}
                    <Link
                        to="/"
                        className="text-blue-500 hover:underline"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;

