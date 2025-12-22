import { useEffect, useState } from "react";
import Filtering from "./Filtering";
import ListBebasPustaka from "./ListBebasPustaka";

export default function MainBebasPustaka() {
  const [bebaspustakas, setBebasPustaka] = useState([]);
  const [filters, setFilters] = useState({
    jurusan: "",
    statusPustaka: "",
    statusPinjaman: "",
    search: ""
  });

  useEffect(() => {
    const getBebasPustaka = async () => {
      const res = await fetch("http://localhost:3000/api/mahasiswa-bebas-pustaka");
      const data = await res.json();
      setBebasPustaka(data);
    };
    getBebasPustaka();
  }, []);

  // Filtering logic
  const filteredItems = bebaspustakas.filter(item => {
    let match = true;
    if (filters.jurusan && item.prodi !== filters.jurusan) match = false;
    if (filters.statusPustaka && item.status !== filters.statusPustaka) match = false;
    if (filters.statusPinjaman && item.status_pinjaman !== filters.statusPinjaman) match = false;
    if (filters.search && !((item.nama && item.nama.toLowerCase().includes(filters.search.toLowerCase())) || (item.nim && item.nim.toString().includes(filters.search)))) match = false;
    return match;
  });

  // Handler untuk refresh data
  const handleRefresh = () => {
    setFilters({ jurusan: "", statusPustaka: "", statusPinjaman: "", search: "" });
    const getBebasPustaka = async () => {
      const res = await fetch("http://localhost:3000/api/mahasiswa-bebas-pustaka");
      const data = await res.json();
      setBebasPustaka(data);
    };
    getBebasPustaka();
  };

  const handleExport = () => {
    window.print(); 
  };

  return (
    <div className="w-full p-4">
      <div className="flex flex-col gap-4 mb-4">
        <div className="flex justify-between items-center gap-4">
          {/* Toolbar */}
          <div className="flex gap-2">
            <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 px-3 py-2 rounded-lg text-sm" onClick={handleRefresh}>🔄 Refresh</button>
            <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 px-3 py-2 rounded-lg text-sm" onClick={handleExport}>⬇️ Export PDF</button>
            <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 px-3 py-2 rounded-lg text-sm" onClick={handleExport}>🖨️ Print</button>
          </div>
        </div>
        {/* Filters */}
        <Filtering onFilterChange={setFilters} />
      </div>
      <div style={{ maxWidth: ' 980px', overflowX: 'auto' }}>
        <ListBebasPustaka bebaspustakas={filteredItems} />
      </div>
    </div>
  );
}