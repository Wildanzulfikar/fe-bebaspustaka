import React, { useEffect, useState } from "react";
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
    const [data, setData] = useState([
        { jurusan: "Teknik Sipil", total: 0 },
        { jurusan: "Teknik Mesin", total: 0 },
        { jurusan: "Teknik Elektro", total: 0 },
        { jurusan: "Teknik Grafika dan Penerbitan", total: 0 },
        { jurusan: "Teknik Informatika dan Komputer", total: 0 },
        { jurusan: "Akuntansi", total: 0 },
        { jurusan: "Administrasi Niaga", total: 0 },
    ]);

    useEffect(() => {
        fetchBarChartData();
    }, []);

    const fetchBarChartData = async () => {
        try {
            const res = await fetch("http://localhost:3000/api/bebas-pustaka-jurusan");
            const apiData = await res.json();
            const jurusanOrder = [
                "Teknik Sipil",
                "Teknik Mesin",
                "Teknik Elektro",
                "Teknik Grafika dan Penerbitan",
                "Teknik Informatika dan Komputer",
                "Akuntansi",
                "Administrasi Niaga"
            ];
            const mapped = jurusanOrder.map(jurusan => {
                const found = apiData.find(d => d.jurusan === jurusan);
                return { jurusan, total: found ? found.total : 0 };
            });
            setData(mapped);
        } catch (err) {
            // fallback: kosongkan data
            setData([]);
        }
    };

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
                                domain={[0, Math.max(3000, ...data.map(d => d.total))]}
                                ticks={[0, 500, 1000, 1500, 2000, 2500]}
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
