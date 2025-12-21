import { useEffect, useState } from "react"

function Loan() {

    const [loans, setLoans] = useState([])

    const getLoan = async() => {
        const res = await fetch('http://localhost:3000/api/loan')
        const data = await res.json()
        
        setLoans(data)
    } 

    useEffect(() => {
        getLoan()
    })

    return (
        <div className="flex bg-white h-full ml-2 rounded-md mt-2 drop-shadow-xl">
            <table className="table-fixed h-full w-full">
                <thead>
                    <tr className="bg-[#008797] text-white">
                        <th className="w-1/12 px-4 py-2  text-center">ID</th>
                        <th className="w-1/12 px-4 py-2  text-center">Kelas</th>
                        <th className="w-1/12 px-4 py-2  text-center">Keterlambatan</th>
                        <th className="w-1/12 px-4 py-2  text-center">Nama</th>
                        <th className="w-1/12 px-4 py-2  text-center">Nim</th>
                        <th className="w-1/12 px-4 py-2  text-center">Peminjaman</th>
                        <th className="w-1/12 px-4 py-2  text-center">Pengembalian</th>
                        <th className="w-1/12 px-4 py-2  text-center">prodi</th>
                        <th className="w-1/12 px-4 py-2  text-center">semester</th>
                        <th className="w-1/12 px-4 py-2  text-center">status</th>
                        <th className="w-1/12 px-4 py-2  text-center">tenggat_waktu</th>

                    </tr>
                </thead>
                <tbody>
                    {loans.map((loan) => (
                        <tr key={loan.id_mahasiswa} className="border-b-2 border-b-gray-200 hover:bg-gray-100">
                            <td className="px-4 py-2  text-center">{loan.id_mahasiswa}</td>
                            <td className="px-4 py-2  text-center">{loan.kelas}</td>
                            <td className="px-4 py-2  text-center">{loan.keterlambatan}</td>
                            <td className="px-4 py-2  text-center">{loan.nama}</td>
                            <td className="px-4 py-2  text-center">{loan.nim}</td>
                            <td className="px-4 py-2  text-center">{loan.peminjaman}</td>
                            <td className="px-4 py-2  text-center">{loan.pengembalian}</td>
                            <td className="px-4 py-2  text-center">{loan.prodi}</td>
                            <td className="px-4 py-2  text-center">{loan.semester}</td>
                            <td className="px-4 py-2  text-center">{loan.status}</td>
                            <td className="px-4 py-2  text-center">{loan.tenggat_waktu}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Loan