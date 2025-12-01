import React from "react"

function PieChart() {
    const data = [
        { label: "Teknik Informatika dan Komputer", value: 40, color: "bg-blue-500" },
        { label: "Teknik Elektro", value: 28, color: "bg-orange-400" },
        { label: "Teknik Grafika Penerbitan", value: 15, color: "bg-cyan-400" },
        { label: "Teknik Mesin", value: 12, color: "bg-green-400" },
        { label: "Akuntansi", value: 5, color: "bg-purple-500" }
    ]

    // Simple SVG pie chart
    let currentAngle = -90
    const slices = data.map((item) => {
        const sliceAngle = (item.value / 100) * 360
        const startAngle = currentAngle
        const endAngle = currentAngle + sliceAngle
        
        const startRad = (startAngle * Math.PI) / 180
        const endRad = (endAngle * Math.PI) / 180
        
        const x1 = 50 + 50 * Math.cos(startRad)
        const y1 = 50 + 50 * Math.sin(startRad)
        const x2 = 50 + 50 * Math.cos(endRad)
        const y2 = 50 + 50 * Math.sin(endRad)
        
        const largeArc = sliceAngle > 180 ? 1 : 0
        
        const path = `M 50 50 L ${x1} ${y1} A 50 50 0 ${largeArc} 1 ${x2} ${y2} Z`
        
        currentAngle = endAngle
        
        return { path, color: item.color, value: item.value }
    })

    const colors = [
        "#3B82F6", // blue
        "#FB923C", // orange
        "#22D3EE", // cyan
        "#22C55E", // green
        "#A855F7"  // purple
    ]

    return (
        <div className="bg-white rounded-lg shadow-md p-6 h-full">
            <h2 className="font-bold text-lg mb-6">Data Persenan Bebas Kompen</h2>
            
            <div className="flex items-center justify-between h-full">
                {/* Pie Chart SVG */}
                <div className="w-40 h-40">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                        {slices.map((slice, index) => (
                            <path
                                key={index}
                                d={slice.path}
                                fill={colors[index]}
                                stroke="white"
                                strokeWidth="2"
                            />
                        ))}
                    </svg>
                </div>

                {/* Legend */}
                <div className="flex-1 ml-4 space-y-1">
                    {data.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: colors[index] }}
                            ></div>
                            <span className="text-xs text-gray-700">{item.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PieChart
