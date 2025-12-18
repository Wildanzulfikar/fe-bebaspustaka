import React, { useEffect, useState } from "react";
import StatsCard from "./StatsCard";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import ProdiAnalytics from "./ProdiAnalytics";

function MainAnalitic() {
    const [peminjamJurusan, setPeminjamJurusan] = useState([
      { jurusan: "Teknik Sipil", total: 0 },
      { jurusan: "Teknik Mesin", total: 0 },
      { jurusan: "Teknik Elektro", total: 0 },
      { jurusan: "Teknik Grafika dan Penerbitan", total: 0 },
      { jurusan: "Teknik Informatika dan Komputer", total: 0 },
      { jurusan: "Akuntansi", total: 0 },
      { jurusan: "Administrasi Niaga", total: 0 },
    ]);

    useEffect(() => {
      fetchPeminjamJurusan();
    }, []);

    const fetchPeminjamJurusan = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/peminjam-per-jurusan");
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
        setPeminjamJurusan(mapped);
      } catch (err) {
        setPeminjamJurusan([]);
      }
    };
  const [stats, setStats] = useState([
    { icon: "/personal.png", label: "Mahasiswa", value: 0 },
    { icon: "/book.png", label: "Peminjam", value: 0 },
    { icon: "/pen.png", label: "Tunggakan", value: 0 },
    { icon: "/free.png", label: "Bebas Kompen", value: 0 },
  ]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/dashboard-stats");
      const data = await res.json();

      setStats([
        {
          icon: "/personal.png",
          label: "Mahasiswa",
          value: data.total_mahasiswa ?? 0,
        },
        {
          icon: "/book.png",
          label: "Peminjam",
          value: data.total_peminjam ?? 0,
        },
        {
          icon: "/pen.png",
          label: "Tunggakan",
          value: data.total_tunggakan ?? 0,
        },
        {
          icon: "/free.png",
          label: "Bebas Kompen",
          value: data.total_bebas_pustaka ?? 0,
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

                {/* PEMINJAM LIST DINAMIS */}
                <div className="rounded-lg shadow-md h-full w-md bg-white overflow-hidden">
                  <div className="bg-purple-400 text-white text-center py-2 font-bold">
                    Peminjam
                  </div>
                  <div className="text-sm">
                    {peminjamJurusan.map((item, idx) => (
                      <div
                        key={item.jurusan}
                        className={`flex justify-between p-4 text-gray-900 ${idx % 2 === 0 ? "bg-purple-100" : ""}`}
                      >
                        <span>{item.jurusan}</span>
                        <span className="text-red-500 font-semibold">{item.total}</span>
                      </div>
                    ))}
                  </div>
                  <div className="bg-purple-400 py-2 rounded-b-lg"></div>
                </div>

                {/* PIE CHART SCROLLABLE */}
                <div className="flex w-full overflow-x-auto whitespace-nowrap scrollbar-thin">
                  <div className="min-w-[720px] h-[420px] flex items-center">
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