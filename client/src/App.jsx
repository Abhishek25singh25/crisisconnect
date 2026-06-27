import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Landing from "./pages/Landing";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import VictimDashboard from "./pages/victim/VictimDashboard";
import VolunteerDashboard from "./pages/volunteer/VolunteerDashboard";
import NGODashboard from "./pages/ngo/NGODashboard";
import MapView from "./pages/map/MapView";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/map" element={<MapView />} />
                    <Route path="/victim" element={
                        <ProtectedRoute role="victim">
                            <VictimDashboard />
                        </ProtectedRoute>
                    }/>
                    <Route path="/volunteer" element={
                        <ProtectedRoute role="volunteer">
                            <VolunteerDashboard />
                        </ProtectedRoute>
                    }/>
                    <Route path="/ngo" element={
                        <ProtectedRoute role="ngo">
                            <NGODashboard />
                        </ProtectedRoute>
                    }/>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;