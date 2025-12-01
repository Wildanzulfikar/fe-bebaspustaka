import React from "react"

function BarChart() {
    const data = [
        { label: "Teknik Informatika\ndan Komputer", value: 4300, color: "bg-blue-600" },
        { label: "Teknik Elektro", value: 4700, color: "bg-pink-500" },
        { label: "Teknik Grafika\nPenerbitan", value: 2300, color: "bg-red-500" },
        { label: "Teknik Mesin", value: 4800, color: "bg-lime-500" },
        { label: "Asuransi", value: 9700, color: "bg-green-300" }
    ]

    const maxValue = 10000

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="font-bold text-lg mb-6">Bebas Kompen</h2>
            
            <div className="flex items-end justify-between h-64 gap-2">
                {data.map((item, index) => (
                    <div key={index} className="flex flex-col items-center gap-2 flex-1">
                        <div className="w-full bg-gray-200 rounded-t relative h-full flex items-end justify-center overflow-hidden">
                            <div
                                className={`${item.color} w-full rounded-t transition-all`}
                                style={{ height: `${(item.value / maxValue) * 100}%` }}
                            >
                                <span className="text-white text-xs font-bold flex items-center justify-center h-full">
                                    {item.value}
                                </span>
                            </div>
                        </div>
                        <label className="text-xs text-center text-gray-600 font-medium leading-tight">
                            {item.label}
                        </label>
                    </div>
                ))}
            </div>

            {/* Y-axis labels */}
            <div className="flex justify-between text-xs text-gray-500 mt-4 pl-2">
                <span>0</span>
                <span>2.5k</span>
                <span>5.0k</span>
                <span>7.5k</span>
                <span>10.0k</span>
            </div>
        </div>
    )
}

export default BarChart
