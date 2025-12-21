import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

function LoanAktif() {

    const { nim } = useParams()
    const [mahasiswa, setMahasiswa] = useState(null)
    const [pinjamanAktif, setPinjamanAktif] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchLoan = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/loan/member/${nim}`)
                const data = await res.json()
                setMahasiswa(data.mahasiswa)
                setPinjamanAktif(data.pinjaman_aktif)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        };

        fetchLoan();
    }, [nim])

    if (loading) return <div className="text-center py-10">Loading...</div>;
    if (!mahasiswa) return <div className="text-center py-10">Data tidak ditemukan</div>;

    return (
        <div className="flex flex-col gap-10 m-8 w-full">
            <div className="flex flex-col gap-4">
                <h1 className="text-center text-white font-semibold py-2 rounded-xs bg-blue-500">Data Mahasiswa</h1>
                <div className="flex gap-8">
                    <div className="flex flex-col gap-3">
                        <p>Nama</p>
                        <p>NIM</p>
                        <p>Prodi</p>
                        <p>Kelas</p>
                        <p>Semester</p>
                    </div>
                    <div className="flex flex-col gap-3">
                        <p>{mahasiswa.nama}</p>
                        <p>{mahasiswa.nim}</p>
                        <p>{mahasiswa.prodi}</p>
                        <p>{mahasiswa.kelas}</p>
                        <p>{mahasiswa.semester}</p>
                    </div>
                </div>
            </div>
            <div>
                <div className="flex flex-col gap-2">
                    <h1 className="text-center text-white font-semibold py-2 rounded-xs bg-blue-500">Pinjaman Aktif</h1>
                    {pinjamanAktif.length === 0 ? (
                        <p className="text-center py-4">Tidak ada pinjaman aktif</p>
                    ) : (
                        pinjamanAktif.map((item) => (
                            <div key={item.loan_id} className="flex gap-4 shadow p-4 w-1/2">
                                <img src="" alt="image-buku"/>
                                <div className="flex gap-10">
                                    <div className="flex flex-col gap-4">
                                        <p>Judul Buku</p>
                                        <p>Jatuh Tempo</p>
                                        <p>Peminjaman</p>
                                        <p>Pengembalian</p>
                                        <p>Status</p>
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <p>{item.judul_buku}</p>
                                        <p>{item.due_date}</p>
                                        <p>{item.loan_date}</p>
                                        <p>{item.return_date ?? "-"}</p>
                                        <p>{item.status}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default LoanAktif