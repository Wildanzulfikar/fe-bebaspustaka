import React from "react";
import { 
    BarChart as ReBarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    Tooltip, 
    CartesianGrid, 
    ResponsiveContainer,
    Cell
} from "recharts";

function BarChart() {

    const data = [
        { jurusan: "Teknik Sipil", total: 8200 },
        { jurusan: "Teknik Mesin", total: 6100 },
        { jurusan: "Teknik Elektro", total: 7200 },
        { jurusan: "Teknik Grafika & Penerbitan", total: 5300 },
        { jurusan: "Teknik Informatika & Komputer", total: 9800 },
        { jurusan: "Akuntansi", total: 4500 },
        { jurusan: "Administrasi Niaga", total: 3900 },
    ];

    const COLORS = [
        "#4F46E5",
        "#FF8042",
        "#00C49F",
        "#4D96FF",
        "#FFBB28",
        "#8A2BE2",
        "#00C4FF"
    ];

    return (
        <div className="bg-white rounded-lg p-6">
            <h2 className="font-bold text-lg mb-4">Bebas Kompen</h2>

            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
                <div className="min-w-[950px] h-[360px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <ReBarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />

                            <XAxis 
                                dataKey="jurusan" 
                                tick={{ fontSize: 12 }}
                                interval={0}
                            />

                            <YAxis 
                                domain={[0, 10000]}
                                ticks={[0, 2000, 4000, 6000, 8000, 10000]}
                            />

                            <Tooltip />

                            <Bar 
                                dataKey="total" 
                                radius={[6, 6, 0, 0]}
                            >
                                {data.map((entry, index) => (
                                    <Cell 
                                        key={index} 
                                        fill={COLORS[index % COLORS.length]} 
                                    />
                                ))}
                            </Bar>

                        </ReBarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

export default BarChart;
