import React, { useEffect, useState } from "react";
import StatsCard from "./StatsCard";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import ProdiAnalytics from "./ProdiAnalytics";

function MainAnalitic() {
  const [stats, setStats] = useState([
    { icon: "/personal.png", label: "Mahasiswa", value: 0 },
    { icon: "/book.png", label: "Peminjam", value: 0 },
    { icon: "/pen.png", label: "Tanggungan", value: 0 },
    { icon: "/free.png", label: "Bebas Kompen", value: 0 },
  ]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch(
        "http://localhost:3000/api/mahasiswa-bebas-pustaka"
      );
      const data = await res.json();

      const totalMahasiswa = data.length;
      const totalBebasKompen = data.filter(
        (m) => m.status === "Bebas Pustaka"
      ).length;

      const totalPeminjam = 0;
      const totalTunggakan = 0;

      setStats([
        {
          icon: "/personal.png",
          label: "Mahasiswa",
          value: totalMahasiswa,
        },
        {
          icon: "/book.png",
          label: "Peminjam",
          value: totalPeminjam,
        },
        {
          icon: "/pen.png",
          label: "Tanggungan",
          value: totalTanggungan,
        },
        {
          icon: "/free.png",
          label: "Bebas Kompen",
          value: totalBebasKompen,
        },
      ]);
    } catch (error) {
      console.error("Gagal fetch stats:", error);
    }
  };

  return (
    <div className="bg-white ml-2 mt-2 overflow-auto rounded-lg h-screen flex flex-col w-[1000px]">
      <div className="flex-1">
        <div className="p-8">
          <div className="flex items-center gap-2 mb-6">
            <h1 className="font-bold text-2xl">Welcome back, Wilz 👋</h1>
          </div>

          {/* CARD ATAS */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <StatsCard
                key={index}
                icon={stat.icon}
                label={stat.label}
                value={stat.value}
              />
            ))}
          </div>

          <div className="flex gap-4 h-full">
            <div className="flex flex-col grid-cols-3 gap-4 w-[70%] h-full">

              {/* BAR CHART */}
              <div className="col-span-2 rounded-xl shadow-md max-h-full">
                <BarChart />
              </div>

              {/* PEMINJAM + PIE CHART */}
              <div className="flex gap-4 h-full">

                {/* PEMINJAM LIST */}
                <div className="rounded-lg shadow-md h-full w-md bg-white overflow-hidden">
                  <div className="bg-purple-400 text-white text-center py-2 font-bold">
                    Peminjam
                  </div>

                  <div className="text-sm">
                    <div className="flex justify-between bg-purple-100 p-4 text-gray-900">
                      <span>Teknik Sipil</span>
                      <span className="text-red-500 font-semibold">120</span>
                    </div>

                    <div className="flex justify-between p-4 text-gray-900">
                      <span>Teknik Mesin</span>
                      <span className="text-red-500 font-semibold">80</span>
                    </div>

                    <div className="flex justify-between bg-purple-100 p-4 text-gray-900">
                      <span>Teknik Elektro</span>
                      <span className="text-red-500 font-semibold">60</span>
                    </div>

                    <div className="flex justify-between p-4 text-gray-900">
                      <span>Akuntansi</span>
                      <span className="text-red-500 font-semibold">110</span>
                    </div>

                    <div className="flex justify-between bg-purple-100 p-4 text-gray-900">
                      <span>Administrasi Niaga</span>
                      <span className="text-red-500 font-semibold">70</span>
                    </div>

                    <div className="flex justify-between p-4 text-gray-900">
                      <span>Teknik Grafika Penerbitan</span>
                      <span className="text-red-500 font-semibold">95</span>
                    </div>

                    <div className="flex justify-between bg-purple-100 p-4 text-gray-900">
                      <span>Teknik Informatika dan Komputer</span>
                      <span className="text-red-500 font-semibold">150</span>
                    </div>
                  </div>

                  <div className="bg-purple-400 py-2 rounded-b-lg"></div>
                </div>

                {/* PIE CHART SCROLLABLE */}
                <div className="flex w-full overflow-x-auto whitespace-nowrap scrollbar-thin">
                  <div className="min-w-[720px] h-[350px] flex items-center">
                    <PieChart />
                  </div>
                </div>

              </div>
            </div>

            {/* PRODI DROPDOWN */}
            <div className="col-span-1">
              <ProdiAnalytics />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainAnalitic;
