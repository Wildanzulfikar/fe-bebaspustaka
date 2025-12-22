import { useState } from "react";

function Filtering({ onFilterChange }) {
  const [jurusan, setJurusan] = useState("");
  const [statusPustaka, setStatusPustaka] = useState("");
  const [statusPinjaman, setStatusPinjaman] = useState("");
  const [search, setSearch] = useState("");
  const [tahun, setTahun] = useState("");

  const handleChange = (field, value) => {
    if (field === "jurusan") setJurusan(value);
    if (field === "statusPustaka") setStatusPustaka(value);
    if (field === "statusPinjaman") setStatusPinjaman(value);
    if (field === "search") setSearch(value);

    if (onFilterChange) {
      onFilterChange({
        jurusan: field === "jurusan" ? value : jurusan,
        statusPustaka: field === "statusPustaka" ? value : statusPustaka,
        statusPinjaman: field === "statusPinjaman" ? value : statusPinjaman,
        search: field === "search" ? value : search,
      });
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-4">
      {/* Jurusan */}
      <div className="flex flex-col">
        <label className="text-xs text-gray-500 mb-1">Jurusan</label>
        <select
          className="border border-gray-300 px-3 py-2 rounded-lg text-sm"
          value={jurusan}
          onChange={(e) => handleChange("jurusan", e.target.value)}
        >
          <option value="">Semua</option>
          <option value="01">01 - Teknik Sipil</option>
          <option value="02">02 - Teknik Mesin</option>
          <option value="03">03 - Teknik Elektro</option>
          <option value="04">04 - Akuntansi</option>
          <option value="05">05 - Administrasi Niaga</option>
          <option value="06">06 - Teknik Grafika Penerbitan</option>
          <option value="07">07 - Teknik Informatika dan Komputer</option>
          <option value="08">08 - Jurusan Khusus</option>
        </select>
      </div>

      {/* Status Pustaka */}
      <div className="flex flex-col">
        <label className="text-xs text-gray-500 mb-1">Status Pustaka</label>
        <select
          className="border border-gray-300 px-3 py-2 rounded-lg text-sm"
          value={statusPustaka}
          onChange={(e) => handleChange("statusPustaka", e.target.value)}
        >
          <option value="">Semua</option>
          <option value="Bebas Pustaka">Bebas Pustaka</option>
          <option value="Tanggungan">Tanggungan</option>
        </select>
      </div>

      {/* Status Pinjaman */}
      <div className="flex flex-col">
        <label className="text-xs text-gray-500 mb-1">Status Pinjaman</label>
        <select
          className="border border-gray-300 px-3 py-2 rounded-lg text-sm"
          value={statusPinjaman}
          onChange={(e) => handleChange("statusPinjaman", e.target.value)}
        >
          <option value="">Semua</option>
          <option value="Lunas">Lunas</option>
          <option value="Belum">Belum</option>
        </select>
      </div>

      {/* Search */}
      <div className="flex flex-col">
        <label className="text-xs text-gray-500 mb-1">Search</label>
        <input
          type="text"
          className="border border-gray-300 px-3 py-2 rounded-lg text-sm w-64"
          placeholder="Cari nama atau NIM..."
          value={search}
          onChange={(e) => handleChange("search", e.target.value)}
        />
      </div>
    </div>
  );
}

export default Filtering;
