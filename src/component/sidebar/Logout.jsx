import React from "react";

function Logout() {
    return (
        <div className="flex items-center justify-center gap-2 p-2 bg-linear-to-r from-cyan-500 to-blue-500 rounded-b-md">
            <div className="w-8">
                <img src="/logout.png" alt="logout" />
            </div>
            <div className="text-white font-semibold text-xl">
                <a href="">Logout</a>
            </div>
        </div>
    )
}

export default Logout;