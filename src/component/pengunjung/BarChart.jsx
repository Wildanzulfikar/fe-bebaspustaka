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

function BarChartPengunjung() {

    // Data pengunjung — disamakan jurusannya seperti BarChart Analitic
    const data = [
        { jurusan: "Teknik Sipil", total: 430 },
        { jurusan: "Teknik Mesin", total: 480 },
        { jurusan: "Teknik Elektro", total: 470 },
        { jurusan: "Teknik Grafika & Penerbitan", total: 230 },
        { jurusan: "Teknik Informatika & Komputer", total: 970 },
        { jurusan: "Akuntansi", total: 390 },
        { jurusan: "Administrasi Niaga", total: 310 },
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
        <div className="bg-white rounded-lg">
            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
                <div className="min-w-[950px] h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <ReBarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />

                            <XAxis 
                                dataKey="jurusan" 
                                tick={{ fontSize: 12 }}
                                interval={0}
                            />

                            <YAxis />

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

export default BarChartPengunjung;
