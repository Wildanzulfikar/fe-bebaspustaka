function ListBebasPustaka({bebaspustakas}) {

    return (
        <div className="flex bg-white h-full rounded-md mt-2 drop-shadow-xl">
            <table className="table-fixed h-full w-full">
                <thead>
                    <tr className="bg-[#008797] text-white font-bold">
                        <th className="w-1/12 px-4 py-2  text-center">ID</th>
                        <th className="w-1/12 px-4 py-2  text-center">NIM</th>
                        <th className="w-1/12 px-4 py-2  text-center">Nama Lengkap</th>
                        <th className="w-1/12 px-4 py-2  text-center">Semester</th>
                        <th className="w-1/12 px-4 py-2  text-center">Prodi</th>
                        <th className="w-1/12 px-4 py-2  text-center">Kelas</th>
                        <th className="w-1/12 px-4 py-2  text-center">Status</th>
                        <th className="w-1/12 px-4 py-2  text-center">Status Pinjaman</th>
                        <th className="w-1/12 px-4 py-2  text-center">Keterangan</th>
                        <th className="w-1/12 px-4 py-2  text-center">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {bebaspustakas.map((bebaspustaka, index) => (
                        <tr key={bebaspustaka.id_mahasiswa ?? index} className="border-b-2 border-b-gray-200 hover:bg-gray-100">
                            <td className="px-4 py-2  text-center">{bebaspustaka.id_mahasiswa}</td>
                            <td className="px-4 py-2  text-center">{bebaspustaka.nim}</td>
                            <td className="px-4 py-2  text-center">{bebaspustaka.nama}</td>
                            <td className="px-4 py-2  text-center">{bebaspustaka.semester}</td>
                            <td className="px-4 py-2  text-center">{bebaspustaka.prodi}</td>
                            <td className="px-4 py-2  text-center">{bebaspustaka.kelas}</td>
                            <td className="px-4 py-2  text-center">{bebaspustaka.status}</td>
                            <td className="px-4 py-2  text-center">{bebaspustaka.status_pinjaman}</td>
                            <td className="px-4 py-2  text-center">{bebaspustaka.keterangan}</td>
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

export default ListBebasPustaka;