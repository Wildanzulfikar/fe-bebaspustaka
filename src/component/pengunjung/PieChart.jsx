import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
} from "recharts";


function PieChartPengunjung() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3000/api/visitor-summary/recap-per-bulan")
      .then((res) => {
        if (!res.ok) throw new Error("Gagal fetch data");
        return res.json();
      })
      .then((result) => {
        // result: [{ bulan: 1, total: 12 }, ...]
        const bulanNames = [
          "Januari", "Februari", "Maret", "April", "Mei", "Juni",
          "Juli", "Agustus", "September", "Oktober", "November", "Desember"
        ];
        const totalAll = result.reduce((sum, item) => sum + item.total, 0);
        const mapped = result.map((item) => ({
          name: bulanNames[item.bulan - 1],
          value: item.total,
          percent: totalAll > 0 ? (item.total / totalAll) * 100 : 0
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
    "#8884D8",
    "#FF8042",
    "#4D96FF",
    "#FFBB28",
    "#00C4FF",
    "#00C49F",
    "#0088FE",
    "#A020F0",
    "#8BC34A",
    "#FF5722",
    "#03A9F4",
    "#9C27B0",
  ];

  const renderLabelInside = ({ cx, cy, midAngle, outerRadius, index }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius * 0.65;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    const percent = data[index]?.percent || 0;
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
        {percent.toFixed(0)}%
      </text>
    );
  };

  if (loading) {
    return <div className="bg-white rounded-lg p-8 text-center">Loading...</div>;
  }
  if (error) {
    return <div className="bg-white rounded-lg p-8 text-center text-red-500">{error}</div>;
  }
  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[650px] mx-auto">
        <PieChart width={550} height={420}>
          <Pie
            data={data}
            cx={200}
            cy={200}
            outerRadius={150}
            paddingAngle={0}
            dataKey="value"
            label={renderLabelInside}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
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
      </div>
    </div>
  );
}

export default PieChartPengunjung;
