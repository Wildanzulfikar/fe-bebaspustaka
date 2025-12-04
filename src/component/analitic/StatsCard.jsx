import React from "react"

function StatsCard({ icon, label, value }) {

    const bgColor =
        label === "Mahasiswa" || label === "Tunggakan"
            ? "bg-[#E9FDFF]"
            : "bg-[#FFE2B9]"

    return (
        <div className={`${bgColor} rounded-lg p-6 shadow-md hover:shadow-lg transition`}>
            <div className="flex flex-col items-start">

                {/* ICON */}
                <img src={icon} alt={label} className="w-12 h-12 mb-3" />

                {/* LABEL */}
                <p className="text-gray-600 text-sm">{label}</p>

                {/* VALUE */}
                <p className="text-blue-600 font-bold text-2xl mt-1">{value}</p>

            </div>
        </div>
    )
}

export default StatsCard
