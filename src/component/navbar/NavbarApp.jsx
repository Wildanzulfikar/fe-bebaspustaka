import React from "react"

function Navbar() {

    const date = new Date("2025-10-22");

    const formatted = new Intl.DateTimeFormat("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    }).format(date);

    return (
        <div className="flex rounded-md drop-shadow-md font-medium text-[#464646] drop-shadow-gray-200 justify-between ml-2 px-6 h-20 items-center bg-white">
            <div>
                <h1>{formatted}</h1>
            </div>
            <div className="flex gap-3 items-center">
                <p>Wildan Zulfikar</p>
                <img className="" src="/avatar.png" alt="avatar" />
            </div>
        </div>
    )
}

export default Navbar