import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

function PieChartComponent() {
  const [data, setData] = useState([
    { name: "Teknik Sipil", value: 0 },
    { name: "Teknik Mesin", value: 0 },
    { name: "Teknik Elektro", value: 0 },
    { name: "Akuntansi", value: 0 },
    { name: "Administrasi Niaga", value: 0 },
    { name: "Teknik Grafika dan Penerbitan", value: 0 },
    { name: "Teknik Informatika dan Komputer", value: 0 },
  ]);

  useEffect(() => {
    fetchPieChartData();
  }, []);

  const fetchPieChartData = async () => {
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
        return { name: jurusan, value: found ? found.total : 0 };
      });
      setData(mapped);
    } catch (err) {
      setData([]);
    }
  };

  const COLORS = [
    "#8884D8",
    "#FF8042",
    "#4D96FF",
    "#FFBB28",
    "#00C4FF",
    "#00C49F",
    "#0088FE",
  ];

  const renderLabelInside = ({ cx, cy, midAngle, outerRadius, percent }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius * 0.65;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text
        x={x}
        y={y}
        fill="#fff"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={13}
        fontWeight="bold"
      >
        {(percent * 100).toFixed(0)}%
      </text>
    );
  };

  return (
    <div className="flex flex-col w-full h-full bg-white rounded-xl shadow-md p-5">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-2 px-2">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-6 bg-blue-500 rounded-full"></span>
          <h2 className="font-bold text-base tracking-wide">Persentase Bebas Kompen</h2>
        </div>
      </div>

      {/* PIE CHART */}
      <div className="h-[420px] w-full flex items-center justify-center">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              cx="40%"
              cy="50%"
              outerRadius={120}
              paddingAngle={0}
              dataKey="value"
              label={renderLabelInside}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip wrapperClassName="!rounded-lg !shadow-md !border !border-gray-200 !bg-white" />
            <Legend
              layout="vertical"
              verticalAlign="middle"
              align="right"
              iconSize={12}
              wrapperStyle={{ paddingLeft: 8, fontSize: 13, lineHeight: 1.2 }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default PieChartComponent;