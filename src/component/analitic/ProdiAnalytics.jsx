import React, { useState } from "react";

function ProdiAnalytics() {
  // =============================
  // DATA DUMMY (NANTI DIGANTIKAN BACKEND)
  // =============================
  const data = [
    {
      name: "Teknik Sipil",
      children: [
        { name: "Konstruksi Sipil", mahasiswa: 200, bebasPustaka: 180, tunggakan: 20 },
        { name: "Konstruksi Gedung", mahasiswa: 190, bebasPustaka: 170, tunggakan: 20 },
        { name: "Teknik Perancangan Jalan dan Jembatan", mahasiswa: 160, bebasPustaka: 140, tunggakan: 20 },
        { name: "Teknik Konstruksi Gedung", mahasiswa: 175, bebasPustaka: 160, tunggakan: 15 },
      ],
    },

    {
      name: "Teknik Mesin",
      children: [
        { name: "Teknik Mesin", mahasiswa: 220, bebasPustaka: 200, tunggakan: 20 },
        { name: "Teknik Konversi Energi", mahasiswa: 180, bebasPustaka: 165, tunggakan: 15 },
        { name: "Alat Berat", mahasiswa: 140, bebasPustaka: 120, tunggakan: 20 },
        { name: "Manufaktur", mahasiswa: 160, bebasPustaka: 145, tunggakan: 15 },
        { name: "Pembangkit Tenaga Listrik", mahasiswa: 130, bebasPustaka: 118, tunggakan: 12 },
        { name: "Teknologi Rekayasa Konversi Energi", mahasiswa: 150, bebasPustaka: 135, tunggakan: 15 },
        { name: "Teknologi Rekayasa Pemeliharaan Alat Berat", mahasiswa: 120, bebasPustaka: 110, tunggakan: 10 },
      ],
    },

    {
      name: "Teknik Elektro",
      children: [
        { name: "Elektronika Industri", mahasiswa: 210, bebasPustaka: 195, tunggakan: 15 },
        { name: "Teknik Listrik", mahasiswa: 190, bebasPustaka: 170, tunggakan: 20 },
        { name: "Telekomunikasi", mahasiswa: 180, bebasPustaka: 160, tunggakan: 20 },
        { name: "Instrumentasi Kontrol Industri", mahasiswa: 160, bebasPustaka: 145, tunggakan: 15 },
        { name: "Teknik Otomasi Listrik Industri", mahasiswa: 170, bebasPustaka: 150, tunggakan: 20 },
        { name: "Broadband Multimedia", mahasiswa: 150, bebasPustaka: 135, tunggakan: 15 },
      ],
    },

    {
      name: "Akuntansi",
      children: [
        { name: "Akuntansi", mahasiswa: 300, bebasPustaka: 270, tunggakan: 30 },
        { name: "Keuangan dan Perbankan", mahasiswa: 260, bebasPustaka: 240, tunggakan: 20 },
        { name: "Akuntansi Keuangan", mahasiswa: 230, bebasPustaka: 215, tunggakan: 15 },
        { name: "Keuangan dan Perbankan Syariah", mahasiswa: 200, bebasPustaka: 185, tunggakan: 15 },
        { name: "Manajemen Keuangan", mahasiswa: 220, bebasPustaka: 200, tunggakan: 20 },
        { name: "Manajemen Pemasaran (WNBK)", mahasiswa: 180, bebasPustaka: 165, tunggakan: 15 },
      ],
    },

    {
      name: "Administrasi Niaga",
      children: [
        { name: "Administrasi Bisnis", mahasiswa: 280, bebasPustaka: 260, tunggakan: 20 },
        { name: "Administrasi Bisnis Terapan", mahasiswa: 240, bebasPustaka: 220, tunggakan: 20 },
        { name: "Usaha Jasa Konvensi, Perjalanan Insentif dan Pameran (MICE)", mahasiswa: 200, bebasPustaka: 185, tunggakan: 15,},
        { name: "Bahasa Inggris untuk Komunikasi Bisnis dan Profesional", mahasiswa: 160, bebasPustaka: 145, tunggakan: 15},
      ],
    },

    {
      name: "Teknik Grafika Penerbitan",
      children: [
        { name: "Penerbitan", mahasiswa: 170, bebasPustaka: 160, tunggakan: 10 },
        { name: "Teknik Grafika", mahasiswa: 150, bebasPustaka: 138, tunggakan: 12 },
        { name: "Desain Grafis", mahasiswa: 190, bebasPustaka: 175, tunggakan: 15 },
        { name: "Teknologi Industri Cetak Kemasan", mahasiswa: 130, bebasPustaka: 120, tunggakan: 10 },
        { name: "Teknologi Rekayasa Cetak Dan Grafis 3 Dimensi", mahasiswa: 120, bebasPustaka: 110, tunggakan: 10 },
      ],
    },

    {
      name: "Teknik Informatika dan Komputer",
      children: [
        { name: "Teknik Informatika", mahasiswa: 1200, bebasPustaka: 1150, tunggakan: 50 },
        { name: "Teknik Multimedia Digital", mahasiswa: 900, bebasPustaka: 870, tunggakan: 30 },
        { name: "Teknik Multimedia dan Jaringan", mahasiswa: 600, bebasPustaka: 570, tunggakan: 30 },
        { name: "Teknik Komputer dan Jaringan", mahasiswa: 500, bebasPustaka: 470, tunggakan: 30 },
      ],
    },
  ];

  // =============================
  // STATE
  // =============================
  const [openJurusan, setOpenJurusan] = useState(null);
  const [openProdi, setOpenProdi] = useState(null);

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
