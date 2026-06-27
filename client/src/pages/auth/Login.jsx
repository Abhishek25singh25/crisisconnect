import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await api.post("/api/auth/login", {
                email,
                password,
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
            alert(error.response?.data?.message || "Login failed");
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

            {/* Login Card */}
            <div className="bg-white p-8 rounded-lg shadow-lg w-96 relative z-10">
                <h2 className="text-2xl font-bold text-center mb-6">
                    🚨 CrisisConnect
                </h2>

                <p className="text-center text-gray-600 mb-6">
                    Sign in to your account
                </p>

                <form onSubmit={handleSubmit}>
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
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
                    >
                        Login
                    </button>
                </form>

                <p className="text-center mt-4">
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="text-blue-500 hover:underline"
                    >
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;

