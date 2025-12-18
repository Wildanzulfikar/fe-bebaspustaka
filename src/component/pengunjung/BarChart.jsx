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


function BarChartPengunjung() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetch("http://localhost:3000/api/visitor-summary/recap-per-jurusan")
            .then((res) => {
                if (!res.ok) throw new Error("Gagal fetch data");
                return res.json();
            })
            .then((result) => {
                // Pastikan field sesuai: jurusan, total
                const mapped = result.map((item) => ({
                    jurusan: item.jurusan,
                    total: item.total,
                }));
                setData(mapped);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    const COLORS = [
        "#4F46E5",
        "#FF8042",
        "#00C49F",
        "#4D96FF",
        "#FFBB28",
        "#8A2BE2",
        "#00C4FF"
    ];

    if (loading) {
        return <div className="bg-white rounded-2xl shadow-xl p-10 text-center min-h-[350px] flex items-center justify-center">Loading...</div>;
    }
    if (error) {
        return <div className="bg-white rounded-2xl shadow-xl p-10 text-center text-red-500 min-h-[350px] flex items-center justify-center">{error}</div>;
    }
    return (
        <div className="min-w-[400px]">
            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
                <div className="min-w-[400px] h-[350px]">
                    <ResponsiveContainer width={500} height={350}>
                        <ReBarChart width={500} height={350} data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis 
                                dataKey="jurusan" 
                                tick={{ fontSize: 13, fontWeight: 600, fill: '#0e7490' }}
                                interval={0}
                            />
                            <YAxis tick={{ fontSize: 13, fontWeight: 600, fill: '#64748b' }} />
                            <Tooltip />
                            <Bar 
                                dataKey="total" 
                                radius={[8, 8, 0, 0]}
                                barSize={38}
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

export default BarChartPengunjung;
