import { useState, useEffect } from "react";
import LoanList from "./LoanList";

function MainLoan() {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;
  const [search, setSearch] = useState("");

  const getLoan = async (page = 1, searchTerm = "") => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://127.0.0.1:3000/api/loan?page=${page}&per_page=${itemsPerPage}&search=${searchTerm}`
      );
      const json = await res.json();
      setLoans(json.data);
      setCurrentPage(page);
      setTotalPages(Math.ceil(json.meta.total / json.meta.per_page));
    } catch (err) {
      console.error(err);
      setLoans([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLoan(1, search);
  }, [search]);

  const handlePage = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    getLoan(newPage, search);
  };

  return (
    <div className="flex flex-col justify-between bg-white ml-2 mt-2 rounded-md w-full">

        <div>

            <div className="flex flex-col gap-4 p-8">
                <h1 className="font-semibold text-2xl text-gray-800">Data Peminjam</h1>
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

            {/* Loader */}
            {loading ? (
                <div className="text-center w-full py-10">Loading...</div>
            ) : (
                <LoanList loans={loans} />
            )}
        </div>


      {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mb-4">
            <button
            onClick={() => handlePage(currentPage - 1)}
            disabled={currentPage === 1 || loading}
            className="px-3 py-1 border rounded disabled:opacity-50"
            >
            Prev
            </button>

            <span>Halaman {currentPage} / {totalPages}</span>

            <button
            onClick={() => handlePage(currentPage + 1)}
            disabled={currentPage === totalPages || loading}
            className="px-3 py-1 border rounded disabled:opacity-50"
            >
            Next
            </button>
        </div>
    </div>
  );
}

export default MainLoan;
