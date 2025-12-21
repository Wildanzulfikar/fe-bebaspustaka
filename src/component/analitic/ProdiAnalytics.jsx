import React, { useState, useEffect } from "react";

const prodiToJurusan = [
  { name: "Teknik Sipil", prodis: [
    "Konstruksi Gedung (D3)", "Teknik Perancangan Jalan dan Jembatan (D4)", "Konstruksi Sipil (D3)", "Konstruksi Gedung (D4)"
  ] },
  { name: "Teknik Mesin", prodis: [
    "Teknik Mesin (D3)", "Teknologi Rekayasa Manufaktur (D4)", "Teknologi Rekayasa Pembangkit Energi (D4)", "Teknologi Rekayasa Konversi Energi (D4)", "Teknologi Rekayasa Konversi Energi (D3/D4)", "Teknologi Rekayasa Pemeliharaan Alat Berat (D4)", "Teknologi Rekayasa Konversi Energi (D4)"
  ] },
  { name: "Teknik Elektro", prodis: [
    "Teknik Listrik (D3)", "Teknik Otomasi Listrik Industri (D4)", "Elektronika Industri (D3)", "Broadband Multimedia (D4)", "Teknik Telekomunikasi (D3)", "Instrumentasi (D4)"
  ] },
  { name: "Akuntansi", prodis: [
    "Akuntansi Keuangan (D3/D4)", "Keuangan dan Perbankan Syariah (D4)", "Keuangan dan Perbankan (D3)", "Keuangan dan Perbankan (D4)", "Akuntansi Keuangan (D4)", "Manajemen Keuangan (D4)", "Manajemen Pemasaran WNBK (D3)"
  ] },
  { name: "Administrasi Niaga", prodis: [
    "BISPRO/MICE (D4)", "Administrasi Bisnis Terapan (D4)", "Administrasi Bisnis Terapan (D3)", "Bahasa Inggris untuk Komunikasi Bisnis (D4)"
  ] },
  { name: "Teknik Grafika Penerbitan", prodis: [
    "Teknologi Industri Cetak Kemasan (D4)", "Desain Grafis (D4)", "Penerbitan (D3)"
  ] },
  { name: "Teknik Informatika dan Komputer", prodis: [
    "Teknik Informatika (D4)", "Teknik Komputer dan Jaringan (D1)", "Teknik Multimedia Jaringan (D4)", "Teknik Multimedia Digital (D4)"
  ] },
];

function ProdiAnalytics() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openJurusan, setOpenJurusan] = useState(null);
  const [openProdi, setOpenProdi] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3000/api/analytics/prodi")
      .then((res) => {
        if (!res.ok) throw new Error("Gagal fetch data");
        return res.json();
      })
      .then((result) => {
        // Map ke struktur jurusan-prodi
        const prodiMap = {};
        result.forEach((item) => {
          prodiMap[item.prodi] = item;
        });
        const jurusanData = prodiToJurusan.map((jurusan) => ({
          name: jurusan.name,
          children: jurusan.prodis.map((prodiName) => ({
            name: prodiName,
            mahasiswa: prodiMap[prodiName]?.mahasiswa || 0,
            bebasPustaka: prodiMap[prodiName]?.bebasPustaka || 0,
            tunggakan: prodiMap[prodiName]?.tunggakan || 0,
          })),
        }));
        setData(jurusanData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="rounded-lg shadow-md bg-white h-full relative p-4 pt-8">
      {/* HEADER */}
      <h2
        className="font-bold text-sm px-4 py-2 inline-block shadow-sm absolute"
        style={{
          top: "0",
          left: "0",
          backgroundColor: "#FFA6A6",
          borderTopLeftRadius: "12px",
        }}
      >
        Analytics Prodi
      </h2>

      {/* CONTENT */}
      <div className="mt-4">
        {data.map((jurusan, jIndex) => (
          <div key={jIndex} className="mb-4">
            {/* JURUSAN ROW */}
            <div
              onClick={() => setOpenJurusan(openJurusan === jIndex ? null : jIndex)}
              className="flex justify-between items-center cursor-pointer text-gray-800 font-semibold text-sm hover:bg-gray-100 px-4 py-2 rounded-lg"
              style={{ minHeight: 36 }}
            >
              <span>{jurusan.name}</span>
              <span>{openJurusan === jIndex ? "▾" : "▸"}</span>
            </div>

            {/* LIST PRODI */}
            {openJurusan === jIndex && (
              <div className="ml-4 mt-2 flex flex-col gap-2">
                {jurusan.children.map((prodi, pIndex) => (
                  <div key={pIndex}>
                    {/* PRODI ROW */}
                    <div
                      onClick={() => setOpenProdi(openProdi === `${jIndex}-${pIndex}` ? null : `${jIndex}-${pIndex}`)}
                      className="flex justify-between items-center cursor-pointer text-gray-700 font-medium text-sm px-3 py-1 rounded border border-gray-100 hover:bg-gray-50"
                      style={{ minHeight: 30 }}
                    >
                      <span>{prodi.name}</span>
                      <span>{openProdi === `${jIndex}-${pIndex}` ? "▾" : "▸"}</span>
                    </div>

                    {/* DETAIL PRODI (Mahasiswa, Bebas Pustaka, Tunggakan) */}
                    {openProdi === `${jIndex}-${pIndex}` && (
                      <div className="ml-5 mt-1 text-xs text-gray-600 bg-gray-50 border border-gray-100 rounded p-2 space-y-1">
                        <div className="flex justify-between">
                          <span>Mahasiswa</span>
                          <span>{prodi.mahasiswa}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Bebas Pustaka</span>
                          <span>{prodi.bebasPustaka}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tunggakan</span>
                          <span>{prodi.tunggakan}</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProdiAnalytics;
