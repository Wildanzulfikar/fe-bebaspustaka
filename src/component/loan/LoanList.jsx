import { useNavigate } from "react-router-dom";

function LoanList({ loans }) {

  const navigate = useNavigate();

  return (
    <div className="w-full h-[500px] overflow-auto bg-white drop-shadow-xl">
      <table className="min-w-full table-auto ">
        <thead>
          <tr className="bg-[#008797] text-white">
            <th className="w-1/12 px-4 py-2 font-bold text-center">ID</th>
            <th className="w-1/12 px-4 py-2 font-bold text-center">NIM</th>
            <th className="w-1/12 px-4 py-2 font-bold text-center">Nama</th>
            <th className="w-1/12 px-4 py-2 font-bold text-center">Prodi</th>
            <th className="w-1/12 px-4 py-2 font-bold text-center">Kelas</th>
            <th className="w-1/12 px-4 py-2 font-bold text-center">Semester</th>
            <th className="w-1/12 px-4 py-2 font-bold text-center">Status</th>
            <th className="w-1/12 px-4 py-2 font-bold text-center">Pinjaman Aktif</th>
            <th className="w-1/12 px-4 py-2 font-bold text-center">Total Pinjaman</th>
            <th className="w-1/12 px-4 py-2 font-bold text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {loans.map((loan, index) => (
            <tr key={index} className="border-b-2 border-b-gray-200 hover:bg-gray-100 text-[10px]">
              <td className="px-4 py-2 text-center">{loan.id_mahasiswa ?? '-'}</td>
              <td className="px-4 py-2 text-center">{loan.nim ?? '-'}</td>
              <td className="px-4 py-2 text-center">{loan.nama ?? '-'}</td>
              <td className="px-4 py-2 text-center">{loan.prodi ?? '-'}</td>
              <td className="px-4 py-2 text-center">{loan.kelas ?? '-'}</td>
              <td className="px-4 py-2 text-center">{loan.semester ?? '-'}</td>
              <td className="px-4 py-2 text-center">{loan.status === "Lunas" ? 
                (<button className="bg-[#E5F4EC] text-[#318D5F] border border-gray-200 px-2 gap-1 py-1 rounded"> 
                    {loan.status}
                </button>) :
                (<button className="bg-[#FFA4A4] text-red-500 border border-gray-200 px-2 gap-1 py-1 rounded">
                  Belum
                </button>)}</td>
              <td className="px-4 py-2 text-center">{loan.pinjaman_aktif ?? '-'}</td>
              <td className="px-4 py-2 text-center">{loan.total_pinjaman ?? '-'}</td>
              <td className="flex justify-center items-center gap-3 px-4 py-2 text-center"> {loan.pinjaman_aktif > 0 && (  
                <div className="flex gap-2">
                  <button onClick={() => navigate(`/loan/${loan.nim}/aktif`)}>
                    <img src="/detail.png" alt="detail" />
                  </button> |
                  <button onClick={() => navigate(`/loan/${loan.nim}/riwayat`)}>
                    <img src="/history.png" alt="history"/>
                  </button>
                </div>
              )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LoanList;
