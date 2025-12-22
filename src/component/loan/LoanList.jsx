import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";

function LoanList({ loans }) {
  const navigate = useNavigate();

  const columns = [
    { name: "ID", selector: row => row.id_mahasiswa ?? '-', sortable: true },
    { name: "NIM", selector: row => row.nim ?? '-', sortable: true },
    { name: "Nama", selector: row => row.nama ?? '-', sortable: true },
    { name: "Prodi", selector: row => row.prodi ?? '-', sortable: true },
    { name: "Kelas", selector: row => row.kelas ?? '-', sortable: true },
    { name: "Semester", selector: row => row.semester ?? '-', sortable: true },
    {
      name: "Status",
      selector: row => row.status,
      sortable: true,
      cell: row => row.status === "Lunas"
        ? <button className="bg-[#E5F4EC] text-[#318D5F] border border-gray-200 px-2 gap-1 py-1 rounded">{row.status}</button>
        : <button className="bg-[#FFA4A4] text-red-500 border border-gray-200 px-2 gap-1 py-1 rounded">Belum</button>
    },
    { name: "Pinjaman Aktif", selector: row => row.pinjaman_aktif ?? '-', sortable: true },
    { name: "Total Pinjaman", selector: row => row.total_pinjaman ?? '-', sortable: true },
    {
      name: "Aksi",
      cell: row => row.pinjaman_aktif > 0 ? (
        <div className="flex gap-2">
          <button onClick={() => navigate(`/loan/${row.nim}/aktif`)}>
            <img src="/detail.png" alt="detail" />
          </button>
          |
          <button onClick={() => navigate(`/loan/${row.nim}/riwayat`)}>
            <img src="/history.png" alt="history" />
          </button>
        </div>
      ) : null
    }
  ];

  const customStyles = {
    headCells: {
      style: {
        backgroundColor: '#008797',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '14px',
        paddingLeft: '8px',
        paddingRight: '8px',
        textAlign: 'center',
        minWidth: '80px',
        maxWidth: '120px',
        whiteSpace: 'nowrap',
      },
    },
    cells: {
      style: {
        fontSize: '13px',
        paddingLeft: '8px',
        paddingRight: '8px',
        textAlign: 'center',
        minWidth: '80px',
        maxWidth: '180px',
        whiteSpace: 'nowrap',
      },
    },
  };

  return (
    <div className="w-full h-[500px] bg-white drop-shadow-xl" style={{ maxWidth: 1000, overflowX: 'auto' }}>
      <DataTable
        columns={columns}
        data={loans}
        pagination
        highlightOnHover
        striped
        responsive={false}
        persistTableHead
        customStyles={customStyles}
      />
    </div>
  );
}

export default LoanList;
