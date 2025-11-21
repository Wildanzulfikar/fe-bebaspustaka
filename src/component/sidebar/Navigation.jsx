import React from "react";
import { Link, useLocation } from "react-router-dom";

function Navigation({image, teks}) {
    const location = useLocation();
    const path = `/${teks.toLowerCase().replace(/ /g, "-")}`;

    const isActive = location.pathname === path

    return (
        <ul className="p-4">
            <li className={`flex gap-4 items-center w-full py-3 px-8 rounded-md ${
                isActive ?"bg-[#CEE5FF] text-white" : "text-gray-700 hover:bg-gray-200"
            }`}>
                <img className="w-9" src={image} alt="{teks}" />
                <Link className="font-semibold text-gray-700" to={path}>{teks}</Link>
            </li>
        </ul>
    )
}

export default Navigation;