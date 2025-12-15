import { useState, useEffect } from "react";

function Filtering({DataFiltering}) {
  

  return (
    <div className="flex flex-wrap items-center gap-4">
      {/* Jurusan */}
      <div className="flex flex-col">
        <label className="text-xs text-gray-500 mb-1">Jurusan</label>
        <select
          className="border border-gray-300 px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-[#008797] focus:border-[#008797]"
          value={jurusan}
          onChange={(e) => setJurusan(e.target.value)}
        >
          <option value="">Semua</option>
          <option value="Teknik Informatika">Teknik Informatika</option>
          <option value="Sistem Informasi">Sistem Informasi</option>
        </select>
      </div>

      {/* Status Pustaka */}
      <div className="flex flex-col">
        <label className="text-xs text-gray-500 mb-1">Status Pustaka</label>
        <select
          className="border border-gray-300 px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-[#008797] focus:border-[#008797]"
          value={statusPustaka}
          onChange={(e) => setStatusPustaka(e.target.value)}
        >
          <option value="">Semua</option>
          <option value="Bebas Kompen">Bebas Kompen</option>
          <option value="Tanggungan">Tanggungan</option>
        </select>
      </div>

      {/* Status Pinjaman */}
      <div className="flex flex-col">
        <label className="text-xs text-gray-500 mb-1">Status Pinjaman</label>
        <select
          className="border border-gray-300 px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-[#008797] focus:border-[#008797]"
          value={statusPinjaman}
          onChange={(e) => setStatusPinjaman(e.target.value)}
        >
          <option value="">Semua</option>
          <option value="Lulus">Lulus</option>
          <option value="Belum">Belum</option>
        </select>
      </div>

      {/* Search */}
      <div className="flex flex-col">
        <label className="text-xs text-gray-500 mb-1">Search</label>
        <div className="relative">
          <input
            type="text"
            className="border border-gray-300 px-3 py-2 rounded-lg text-sm w-64 pl-9 focus:ring-2 focus:ring-[#008797] focus:border-[#008797]"
            placeholder="Cari nama atau NIM..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="absolute left-3 top-2.5 text-gray-400 text-sm">
            🔍
          </span>
        </div>
      </div>

      {/* Tahun */}
      <div className="flex flex-col">
        <label className="text-xs text-gray-500 mb-1">Tahun</label>
        <select
          className="border border-gray-300 px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-[#008797] focus:border-[#008797]"
          value={tahun}
          onChange={(e) => setTahun(e.target.value)}
        >
          <option value="2018">2018</option>
          <option value="2019">2019</option>
          <option value="2020">2020</option>
        </select>
      </div>

      {/* Buttons */}
      <div className="flex items-end gap-2 ml-auto">
        <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 px-3 py-2 rounded-lg text-sm">
          🔄 Refresh
        </button>

        <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 px-3 py-2 rounded-lg text-sm">
          ⬇️ Export
        </button>

        <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 px-3 py-2 rounded-lg text-sm">
          🖨️ Print
        </button>
      </div>
    </div>
  );
}

export default Filtering;
