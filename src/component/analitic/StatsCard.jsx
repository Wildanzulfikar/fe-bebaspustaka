import React from "react"

function StatsCard({ icon, label, value }) {
    return (
        <div className="bg-gradient-to-br from-blue-100 to-cyan-50 rounded-lg p-6 shadow-md hover:shadow-lg transition">
            <div className="flex items-start gap-4">
                <img src={icon} alt={label} className="w-12 h-12" />
                <div>
                    <p className="text-gray-600 text-sm mb-1">{label}</p>
                    <p className="text-blue-600 font-bold text-xl">{value}</p>
                </div>
            </div>
        </div>
    )
}

export default StatsCard
