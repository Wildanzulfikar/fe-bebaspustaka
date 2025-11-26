import React from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await fetch("http://localhost:3000/api/logout", {
                method: "POST",
                credentials: "include"
            });
        } catch (err) {
        }
        navigate("/login");
    };

    return (
        <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 p-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-b-md w-full"
        >
            <div className="w-8">
                <img src="/logout.png" alt="logout" />
            </div>
            <div className="text-white font-semibold text-xl">
                Logout
            </div>
        </button>
    );
}

export default Logout;