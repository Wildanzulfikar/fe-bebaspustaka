import { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import ListBebasPustaka from "./ListBebasPustaka";

export default function MainBebasPustaka() {
  const [bebaspustakas, setBebasPustaka] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [openJurusan, setOpenJurusan] = useState(false);
  const [openStatusPustaka, setOpenStatusPustaka] = useState(false);
  const [openStatusPinjaman, setOpenStatusPinjaman] = useState(false);

  const [jurusan, setJurusan] = useState("");
  const [statusPustaka, setStatusPustaka] = useState("");
  const [statusPinjaman, setStatusPinjaman] = useState("");
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const wrapperRef = useRef(null);
  const tableRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => tableRef.current,
    documentTitle: "Data Mahasiswa Bebas Pustaka",
    contentRef: tableRef,
  });

  useEffect(() => {
    const getBebasPustaka = async () => {
      const res = await fetch("http://localhost:3000/api/mahasiswa-bebas-pustaka");
      const data = await res.json();
      setBebasPustaka(data);
    };
    getBebasPustaka();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpenJurusan(false);
        setOpenStatusPustaka(false);
        setOpenStatusPinjaman(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    let temp = bebaspustakas;
    if (jurusan !== "") temp = temp.filter((item) => item.prodi === jurusan);
    if (statusPustaka !== "") temp = temp.filter((item) => item.status === statusPustaka);
    if (statusPinjaman !== "")
      temp = temp.filter((item) => {
        if (statusPinjaman === "Belum") return item.status_pinjaman === "" || item.status_pinjaman === null;
        return item.status_pinjaman === statusPinjaman;
      });
    if (search !== "")
      temp = temp.filter(
        (item) => item.nama.toLowerCase().includes(search.toLowerCase()) || item.nim.toString().includes(search)
      );

    setFiltered(temp);
  }, [jurusan, statusPustaka, statusPinjaman, search, bebaspustakas]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem);

  const jurusanOptions = ["", "Teknik Informatika", "Sistem Informasi"];
  const statusPustakaOptions = ["", "Bebas Kompen", "Tanggungan"];
  const statusPinjamanOptions = ["", "Lulus", "Belum"];

  const displayText = (val, type) => {
    if (type === "jurusan") return val === "" ? "Jurusan" : val;
    if (type === "statusPustaka") return val === "" ? "Status Pustaka" : val;
    if (type === "statusPinjaman") return val === "" ? "Status Pinjaman" : val;
  };

  const renderDropdown = (options, setter, setOpen, type) => (
    <ul className="absolute w-full bg-white mt-2 rounded-md shadow-lg z-10">
      {options.map((opt) => (
        <li
          key={opt === "" ? "semua" : opt}
          className="px-3 py-2 hover:bg-[#0080F8] hover:text-white cursor-pointer transition-colors duration-200"
          onClick={() => {
            setter(opt);
            setOpen(false);
          }}
        >
          {displayText(opt, type)}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="flex flex-col w-full shadow-md justify-between rounded-md mt-2 ml-2">
      <div className="flex flex-col w-full gap-4">
        {/* Header & Search */}
        <div className="flex justify-between gap-2 px-4">
          <div className="flex items-center">
            <img className="h-8" src="/filter.png" alt="filter" />
            <h1 className="font-semibold text-3xl text-gray-600">Filter</h1>
          </div>
          <div className="flex gap-2 mt-4">
            <div>
              <div className="relative">
                <input
                  type="text"
                  className="border border-gray-300 px-3 py-2 rounded-lg text-sm w-64 pl-9 focus:ring-2 focus:ring-[#008797] focus:border-[#008797]"
                  placeholder="Cari nama atau NIM..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <span className="absolute left-3 top-2.5 text-gray-400 text-sm">🔍</span>
              </div>
            </div>
            <div className="flex items-end gap-2">
              <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 px-3 py-2 rounded-lg text-sm">🔄 Refresh</button>
              <button
                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 px-3 py-2 rounded-lg text-sm"
                onClick={handlePrint}
              >
                ⬇️ Export PDF
              </button>
              <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 px-3 py-2 rounded-lg text-sm">🖨️ Print</button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div ref={wrapperRef} className="flex flex-wrap items-center gap-4 px-4">
          {/* Jurusan */}
          <div className="relative w-64">
            <button
              onClick={() => setOpenJurusan(!openJurusan)}
              className="w-full flex items-center justify-between px-3 py-3 rounded-md bg-white text-gray-700 hover:bg-[#0080F8] hover:text-white transition-colors duration-200"
            >
              <div className="flex items-center gap-2">
                <img src="/filtering/jurusan.png" alt="jurusan" className={`w-6 h-6 transition-all duration-200 ${openJurusan ? "invert" : ""}`} />
                <span>{displayText(jurusan, "jurusan")}</span>
              </div>
              <svg className={`w-4 h-4 transition-transform duration-200 ${openJurusan ? "rotate-180 text-white" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openJurusan && renderDropdown(jurusanOptions, setJurusan, setOpenJurusan, "jurusan")}
          </div>

          {/* Status Pustaka */}
          <div className="relative w-64">
            <button
              onClick={() => setOpenStatusPustaka(!openStatusPustaka)}
              className="w-full flex items-center justify-between px-3 py-3 rounded-md bg-white text-gray-700 hover:bg-[#0080F8] hover:text-white transition-colors duration-200"
            >
              <div className="flex items-center gap-2">
                <img src="/filtering/status-pustaka.png" alt="status-pustaka" className={`w-6 h-6 transition-all duration-200 ${openStatusPustaka ? "invert" : ""}`} />
                <span>{displayText(statusPustaka, "statusPustaka")}</span>
              </div>
              <svg className={`w-4 h-4 transition-transform duration-200 ${openStatusPustaka ? "rotate-180 text-white" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openStatusPustaka && renderDropdown(statusPustakaOptions, setStatusPustaka, setOpenStatusPustaka, "statusPustaka")}
          </div>

          {/* Status Pinjaman */}
          <div className="relative w-64">
            <button
              onClick={() => setOpenStatusPinjaman(!openStatusPinjaman)}
              className="w-full flex items-center justify-between px-3 py-3 rounded-md bg-white text-gray-700 hover:bg-[#0080F8] hover:text-white transition-colors duration-200"
            >
              <div className="flex items-center gap-2">
                <img src="/filtering/status-pinjaman.png" alt="status-pinjaman" className={`w-6 h-6 transition-all duration-200 ${openStatusPinjaman ? "invert" : ""}`} />
                <span>{displayText(statusPinjaman, "statusPinjaman")}</span>
              </div>
              <svg className={`w-4 h-4 transition-transform duration-200 ${openStatusPinjaman ? "rotate-180 text-white" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openStatusPinjaman && renderDropdown(statusPinjamanOptions, setStatusPinjaman, setOpenStatusPinjaman, "statusPinjaman")}
          </div>
        </div>
        <div className="flex max-w-full" ref={tableRef}>
          <ListBebasPustaka bebaspustakas={currentItems} />
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mb-4">
        <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="px-3 py-1 border rounded disabled:opacity-50">Prev</button>
        <span>Halaman {currentPage} / {totalPages}</span>
        <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="px-3 py-1 border rounded disabled:opacity-50">Next</button>
      </div>
    </div>
  );
}