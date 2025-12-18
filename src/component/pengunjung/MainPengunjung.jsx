import React, { useEffect, useState } from "react";
import BarChart from "./BarChart"; // BarChart Pengunjung
import PieChart from "./PieChart"; // PieChart Pengunjung

function MainPengunjung() {

  const [stat, setStat] = useState({ total: 0, today: 0, month: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visitorRank, setVisitorRank] = useState([]);
  const [visitorLoading, setVisitorLoading] = useState(true);
  const [visitorError, setVisitorError] = useState(null);
  const [filterJurusan, setFilterJurusan] = useState('all');
  const [filterDate, setFilterDate] = useState('');

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3000/api/visitor-summary/recap")
      .then((res) => res.json())
      .then((data) => {
        setStat({
          total: data.total || 0,
          today: data.today || 0,
          month: data.month || 0,
        });
        setLoading(false);
      })
      .catch((err) => {
        setError("Gagal mengambil data statistik visitor");
        setLoading(false);
      });
  }, []);

  // Fetch visitor summary for ranking
  useEffect(() => {
    setVisitorLoading(true);
    // Build query param
    let url = "http://localhost:3000/api/visitor-summary";
    const params = [];
    if (filterJurusan && filterJurusan !== 'all') params.push(`jurusan=${filterJurusan}`);
    if (filterDate) params.push(`date=${filterDate}`);
    if (params.length > 0) url += `?${params.join('&')}`;
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Gagal fetch data visitor");
        return res.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) data = [];
        // data: array of { id, kode_user, created_at }
        // group by kode_user, count login, ambil created_at terakhir
        const userMap = {};
        data.forEach((item) => {
          if (!userMap[item.kode_user]) {
            userMap[item.kode_user] = {
              kode_user: item.kode_user,
              count: 0,
              last_login: item.created_at,
            };
          }
          userMap[item.kode_user].count++;
          // update last_login jika lebih baru
          if (new Date(item.created_at) > new Date(userMap[item.kode_user].last_login)) {
            userMap[item.kode_user].last_login = item.created_at;
          }
        });
        // convert to array & sort by count desc
        const arr = Object.values(userMap).sort((a, b) => b.count - a.count);
        setVisitorRank(arr);
        setVisitorLoading(false);
      })
      .catch((err) => {
        setVisitorError(err.message);
        setVisitorLoading(false);
      });
  }, [filterJurusan, filterDate]);

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
          <div className="grid grid-cols-3 gap-6 mb-10">
            {loading ? (
              <div className="col-span-3 text-center py-8">Memuat data...</div>
            ) : error ? (
              <div className="col-span-3 text-center text-red-500 py-8">{error}</div>
            ) : (
              [
                {
                  label: "Total Pengunjung",
                  value: stat.total,
                  icon: (
                    <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-cyan-100 text-cyan-600 shadow-md">
                      <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-4.418 0-8 2.239-8 5v1a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-1c0-2.761-3.582-5-8-5Z"/></svg>
                    </span>
                  )
                },
                {
                  label: "Pengunjung Hari Ini",
                  value: stat.today,
                  icon: (
                    <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600 shadow-md">
                      <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M12 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 2c-4.418 0-8 2.239-8 5v1a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-1c0-2.761-3.582-5-8-5Z"/></svg>
                    </span>
                  )
                },
                {
                  label: "Pengunjung Bulan Ini",
                  value: stat.month,
                  icon: (
                    <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-yellow-100 text-yellow-600 shadow-md">
                      <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 11h4a1 1 0 1 1 0 2h-5a1 1 0 0 1-1-1V7a1 1 0 1 1 2 0v6Z"/></svg>
                    </span>
                  )
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 bg-white rounded-xl shadow-lg p-6 min-h-[110px]"
                >
                  {item.icon}
                  <div className="flex flex-col justify-center">
                    <span className="text-gray-500 font-semibold text-base mb-1">{item.label}</span>
                    <span className="font-bold text-3xl text-gray-800">{item.value.toLocaleString()}</span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* ===== CHART SECTION ===== */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col justify-between min-h-[480px]">
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-block w-2 h-6 bg-cyan-500 rounded-full"></span>
                <h2 className="font-bold text-xl text-cyan-700 tracking-wide">Pengunjung Per Jurusan</h2>
              </div>
              <div className="w-full h-[400px] flex items-center justify-center">
                <BarChart />
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col justify-between min-h-[480px]">
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-block w-2 h-6 bg-yellow-400 rounded-full"></span>
                <h2 className="font-bold text-xl text-yellow-600 tracking-wide">Pengunjung Per Bulan</h2>
              </div>
              <div className="w-full h-[400px] flex items-center justify-center">
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
                <select
                  className="border rounded-lg px-3 py-2 shadow-sm"
                  value={filterJurusan}
                  onChange={e => setFilterJurusan(e.target.value)}
                >
                  <option value="all">Semua Jurusan</option>
                  <option value="01">Teknik Sipil</option>
                  <option value="02">Teknik Mesin</option>
                  <option value="03">Teknik Elektro</option>
                  <option value="04">Akuntansi</option>
                  <option value="05">Administrasi Niaga</option>
                  <option value="06">Teknik Grafika & Penerbitan</option>
                  <option value="07">Teknik Informatika dan Komputer</option>
                </select>
              </div>

              {/* Date Picker */}
              <input
                type="date"
                className="border rounded-lg px-3 py-2 shadow-sm"
                value={filterDate}
                onChange={e => setFilterDate(e.target.value)}
              />
            </div>

            {/* ===== TABLE SECTION ===== */}
            <div className="mt-8 bg-white rounded-2xl shadow-xl overflow-x-auto">
              <table className="w-full min-w-[650px] text-left text-base font-medium">
                <thead className="bg-cyan-700 text-white sticky top-0 z-10">
                  <tr>
                    <th className="p-5 font-bold tracking-wide rounded-tl-2xl">Rank</th>
                    <th className="p-5 font-bold tracking-wide">Kode User</th>
                    <th className="p-5 font-bold tracking-wide">Jumlah Login</th>
                    <th className="p-5 font-bold tracking-wide rounded-tr-2xl">Last Login</th>
                  </tr>
                </thead>
                <tbody>
                  {visitorLoading ? (
                    <tr><td colSpan={4} className="text-center p-10">Loading...</td></tr>
                  ) : visitorError ? (
                    <tr><td colSpan={4} className="text-center text-red-500 p-10">{visitorError}</td></tr>
                  ) : visitorRank.length === 0 ? (
                    <tr><td colSpan={4} className="text-center p-10">Tidak ada data</td></tr>
                  ) : (
                    visitorRank.map((item, idx) => (
                      <tr
                        key={item.kode_user}
                        className={
                          `transition-colors duration-150 ${idx % 2 === 0 ? 'bg-white' : 'bg-cyan-50'} hover:bg-cyan-100` +
                          (idx === 0 ? ' font-extrabold text-cyan-700' : '')
                        }
                      >
                        <td className="p-5 text-cyan-700 font-bold text-center">{idx + 1}</td>
                        <td className="p-5 text-gray-800">{item.kode_user}</td>
                        <td className="p-5 text-gray-800">{item.count}</td>
                        <td className="p-5 text-gray-600">{new Date(item.last_login).toLocaleString()}</td>
                      </tr>
                    ))
                  )}
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
