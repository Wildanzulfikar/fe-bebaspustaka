import {useEffect} from "react"

function LoanList({loans, getLoan}) {

    useEffect(() => {
        getLoan()
    }, [])
   
    return (
        <div className="flex ml-2 bg-white h-full rounded-md mt-2 drop-shadow-xl">
            <table className="table-fixed h-full w-full">
                <thead>
                    <tr className="bg-[#008797] text-white">
                        <th className="w-1/12 px-4 py-2 font-light text-center">ID</th>
                        <th className="w-1/12 px-4 py-2 font-light text-center">NIM</th>
                        <th className="w-1/12 px-4 py-2 font-light text-center">Nama</th>
                        <th className="w-1/12 px-4 py-2 font-light text-center">Prodi</th>
                        <th className="w-1/12 px-4 py-2 font-light text-center">Kelas</th>
                        <th className="w-1/12 px-4 py-2 font-light text-center">Semester</th>
                        <th className="w-1/12 px-4 py-2 font-light text-center">Peminjaman</th>
                        <th className="w-1/12 px-4 py-2 font-light text-center">Tenggat Waktu</th>
                        <th className="w-1/12 px-4 py-2 font-light text-center">Pengembalian</th>
                        <th className="w-1/12 px-4 py-2 font-light text-center">Keterlambatan</th>
                        <th className="w-1/12 px-4 py-2 font-light text-center">Status</th>
                        <th className="w-1/12 px-4 py-2 font-light text-center">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {loans.map((loan) => (
                        <tr key={loan.id_mahasiswa} className="border-b-2 border-b-gray-200 hover:bg-gray-100">
                            <td className="px-4 py-2  text-center">{loan.id_mahasiswa ?? '-'}</td>
                            <td className="px-4 py-2  text-center">{loan.nim ?? '-'}</td>
                            <td className="px-4 py-2  text-center">{loan.nama ?? '-'}</td>
                            <td className="px-4 py-2  text-center">{loan.prodi ?? '-'}</td>
                            <td className="px-4 py-2  text-center">{loan.kelas ?? '-'}</td>
                            <td className="px-4 py-2  text-center">{loan.semester ?? '-'}</td>
                            <td className="px-4 py-2  text-center">{loan.loan_date ?? '-'}</td>
                            <td className="px-4 py-2  text-center">{loan.due_date ?? '-'}</td>
                            <td className="px-4 py-2  text-center">{loan.return_date ?? '-'}</td>
                            <td className="px-4 py-2  text-center">{loan.keterlambatan ?? '-'}</td>
                            <td className="px-4 py-2  text-center">{loan.status ?? '-'}</td>
                            <td className="flex justify-center items-center gap-3 px-4 py-2  text-center">
                                <img src="/tenggat/delete.png" alt="delete"/> |
                                <img src="/tenggat/update.png" alt="update"/>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default LoanList