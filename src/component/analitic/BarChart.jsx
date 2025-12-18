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
        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-2">
            <div className="flex items-center gap-2 mb-2">
                <span className="inline-block w-2 h-6 bg-blue-500 rounded-full"></span>
                <h2 className="font-bold text-base tracking-wide">Bebas Kompen Per Jurusan</h2>
            </div>

            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                <div className="min-w-[900px] h-[340px] flex items-center">
                    <ResponsiveContainer width="100%" height="100%">
                        <ReBarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />

                            <XAxis 
                                dataKey="jurusan" 
                                tick={{ fontSize: 12, fontWeight: 600, fill: '#2563eb' }}
                                interval={0}
                            />

                            <YAxis 
                                domain={[0, Math.max(3000, ...data.map(d => d.total))]}
                                ticks={[0, 500, 1000, 1500, 2000, 2500]}
                                tick={{ fontSize: 12, fontWeight: 500, fill: '#64748b' }}
                            />

                            <Tooltip wrapperClassName="!rounded-lg !shadow-md !border !border-gray-200 !bg-white" />

                            <Bar 
                                dataKey="total" 
                                radius={[8, 8, 0, 0]}
                                barSize={36}
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