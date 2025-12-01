import React from "react"

function ProdiAnalytics() {
    const programs = [
        { name: "Teknik Informatika dan Komputer", value: 3200 },
        { name: "Bebas Kompen", value: 3000 },
        { name: "Tunggakan", value: 200 }
    ]

    return (
        <div className="bg-red-200 rounded-lg shadow-md p-6 h-full">
            <h2 className="font-bold text-sm mb-4 text-white bg-red-400 px-3 py-2 rounded inline-block">
                Analytics Prodi
            </h2>
            
            <div className="mt-4 space-y-3">
                {programs.map((program, index) => (
                    <div key={index}>
                        <div className="flex justify-between mb-1">
                            <span className="text-xs font-medium text-gray-700">{program.name}</span>
                            <span className="text-xs font-bold text-gray-700">-</span>
                        </div>
                        <div className="text-sm font-bold text-gray-800">{program.value}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProdiAnalytics
