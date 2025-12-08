import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
} from "recharts";

function PieChartPengunjung() {

  const data = [
    { name: "Januari", value: 12 },
    { name: "Februari", value: 18 },
    { name: "Maret", value: 40 },
    { name: "April", value: 22 },
    { name: "Mei", value: 10 },
    { name: "Juni", value: 14 },
    { name: "Juli", value: 25 },
    { name: "Agustus", value: 64 },
    { name: "September", value: 30 },
    { name: "Oktober", value: 28 },
    { name: "November", value: 16 },
    { name: "Desember", value: 88 },
  ];

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
