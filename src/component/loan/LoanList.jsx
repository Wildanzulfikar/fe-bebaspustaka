function LoanList({ loans }) {
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
            <th className="w-1/12 px-4 py-2 font-bold text-center">Peminjaman</th>
            <th className="w-1/12 px-4 py-2 font-bold text-center">Tenggat Waktu</th>
            <th className="w-1/12 px-4 py-2 font-bold text-center">Pengembalian</th>
            <th className="w-1/12 px-4 py-2 font-bold text-center">Keterlambatan</th>
            <th className="w-1/12 px-4 py-2 font-bold text-center">Status</th>
            <th className="w-1/12 px-4 py-2 font-bold text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {loans.map((loan) => (
            <tr key={loan.id_mahasiswa ?? loan.nim} className="border-b-2 border-b-gray-200 hover:bg-gray-100 text-[10px]">
              <td className="px-4 py-2 text-center">{loan.id_mahasiswa ?? '-'}</td>
              <td className="px-4 py-2 text-center">{loan.nim ?? '-'}</td>
              <td className="px-4 py-2 text-center">{loan.nama ?? '-'}</td>
              <td className="px-4 py-2 text-center">{loan.prodi ?? '-'}</td>
              <td className="px-4 py-2 text-center">{loan.kelas ?? '-'}</td>
              <td className="px-4 py-2 text-center">{loan.semester ?? '-'}</td>
              <td className="px-4 py-2 text-center">{loan.peminjaman ?? '-'}</td>
              <td className="px-4 py-2 text-center">{loan.tenggat_waktu ?? '-'}</td>
              <td className="px-4 py-2 text-center">{loan.pengembalian ?? '-'}</td>
              <td className="px-4 py-2 text-center">{loan.keterlambatan ?? '-'}</td>
              <td className="px-4 py-2 text-center">{loan.status ?? '-'}</td>
              <td className="flex justify-center items-center gap-3 px-4 py-2 text-center">
                <img src="/tenggat/delete.png" alt="delete" /> |
                <img src="/tenggat/update.png" alt="update" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LoanList;
