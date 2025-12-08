import React from "react";
import BarChart from "./BarChart"; // BarChart Pengunjung
import PieChart from "./PieChart"; // PieChart Pengunjung

function MainPengunjung() {
  return (
    <div className="bg-white ml-2 mt-2 rounded-lg h-screen flex flex-col overflow-hidden">
      <div className="overflow-y-auto flex-1">
        <div className="p-8">

          {/* ===== HEADER ===== */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="font-bold text-2xl">Pengunjung</h1>
            <span className="text-gray-600 font-semibold">
              Rabu, 22 Oktober 2025
            </span>
          </div>

          {/* ===== STAT CARD ===== */}
          <div className="grid grid-cols-3 gap-4 mb-10">
            {[
              { label: "Total Pengunjung", value: "5.000" },
              { label: "Pengunjung Hari Ini", value: "500" },
              { label: "Pengunjung Bulan Ini", value: "1.200" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="border rounded-lg p-6 shadow-sm bg-white"
              >
                <p className="font-semibold text-gray-600">{item.label}</p>
                <h1 className="font-bold text-3xl mt-1">{item.value}</h1>
              </div>
            ))}
          </div>

          {/* ===== CHART SECTION ===== */}
          <div className="grid grid-cols-2 gap-6">
            <div className="border rounded-lg p-5 shadow-md bg-white">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-lg">Pengunjung Per Jurusan</h2>
              </div>
              <div className="w-full h-[420px]">
                <BarChart />
              </div>
            </div>

            <div className="border rounded-lg p-5 shadow-md bg-white">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-lg">Pengunjung Per Bulan</h2>
              </div>
              <div className="w-full h-[420px]">
                <PieChart />
              </div>
            </div>
          </div>

          {/* ===== FILTER SECTION ===== */}
          <div className="mt-10">
            <div className="flex justify-between items-center">
              {/* Select Jurusan */}
              <div className="flex items-center gap-2">
                <span className="font-semibold">Jurusan</span>
                <select className="border rounded-lg px-3 py-2 shadow-sm">
                  <option>Semua Jurusan</option>
                  <option>Teknik Sipil</option>
                  <option>Teknik Mesin</option>
                  <option>Teknik Elektro</option>
                  <option>Akuntansi</option>
                  <option>Administrasi Niaga</option>
                  <option>Teknik Grafika & Penerbitan</option>
                  <option>Teknik Informatika dan Komputer</option>
                </select>
              </div>

              {/* Date Picker */}
              <input
                type="date"
                className="border rounded-lg px-3 py-2 shadow-sm"
              />
            </div>

            {/* ===== TABLE SECTION ===== */}
            <div className="mt-6 border rounded-lg shadow-md overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-cyan-700 text-white">
                  <tr>
                    <th className="p-3">ID</th>
                    <th className="p-3">Member ID</th>
                    <th className="p-3">Nama</th>
                    <th className="p-3">Jurusan</th>
                    <th className="p-3">Date</th>
                  </tr>
                </thead>

                <tbody>
                  {[1, 2, 3].map((id) => (
                    <tr key={id} className="border-b hover:bg-gray-50">
                      <td className="p-3">{id}</td>
                      <td className="p-3">8723894327893</td>
                      <td className="p-3">Wildan Zulfiqar</td>
                      <td className="p-3">Teknik Informatika dan Komputer</td>
                      <td className="p-3">24-10-2025</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default MainPengunjung;
