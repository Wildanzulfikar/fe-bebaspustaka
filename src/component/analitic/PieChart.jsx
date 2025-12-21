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
    <div className="flex flex-col w-full h-full bg-white rounded-lg shadow-md p-6">

      {/* ======== TITLE FIXED ======== */}
      <div className="flex justify-end pr-8 mb-4">
        <h1 className="font-semibold text-xl text-gray-700">
          Data Persenan Bebas Kompen
        </h1>
      </div>

      {/* ======== PIE CHART ======== */}
      <div className="h-[500px] w-full">
        <ResponsiveContainer>
          <PieChart>

            <Pie
              data={data}
              cx="40%"
              cy="50%"
              outerRadius={130}
              paddingAngle={0}
              dataKey="value"
              label={renderLabelInside}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            <Tooltip />

            <Legend
              layout="vertical"
              verticalAlign="middle"
              align="right"
              wrapperStyle={{ paddingLeft: 20 }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default PieChartComponent;
