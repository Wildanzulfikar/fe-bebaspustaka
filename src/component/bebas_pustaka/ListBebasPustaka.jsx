import { useNavigate } from "react-router-dom";

function ListBebasPustaka({bebaspustakas}) {

    const navigate = useNavigate();

    const goToKeterangan = (id) => {
        navigate(`/edit-keterangan/${id}`);
    }

    return (
        <div className="overflow-x-auto pb-4 w-full">
            <table className="table-fixed min-w-max">
                <thead>
                    <tr className="bg-[#008797] text-white font-bold">
                        <th className="px-13 py-2  text-center">ID</th>
                        <th className="px-13 py-2  text-center">NIM</th>
                        <th className="px-13 py-2  text-center">Nama Lengkap</th>
                        <th className="px-13 py-2  text-center">Semester</th>
                        <th className="px-13 py-2  text-center">Prodi</th>
                        <th className="px-13 py-2  text-center">Kelas</th>
                        <th className="px-13 py-2  text-center">Status</th>
                        <th className="px-13 py-2  text-center">Status Pinjaman</th>
                        <th className="px-2 py-2  text-center">Keterangan</th>
                        <th className="px-13 py-2  text-center">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {bebaspustakas.map((bebaspustaka, index) => (
                        <tr key={bebaspustaka.id_mahasiswa ?? index} className="border-b-2 text-[10px] border-b-gray-200 hover:bg-gray-100">
                            <td className="px-4 py-2  text-center">{bebaspustaka.id_mahasiswa}</td>
                            <td className="px-4 py-2  text-center">{bebaspustaka.nim}</td>
                            <td className="px-4 py-2  text-center">{bebaspustaka.nama}</td>
                            <td className="px-4 py-2  text-center">{bebaspustaka.semester}</td>
                            <td className="px-4 py-2  text-center">{bebaspustaka.prodi}</td>
                            <td className="px-4 py-2  text-center">{bebaspustaka.kelas}</td>
                            <td className="px-4 py-2  text-center text-[12px]">{bebaspustaka.status === "Bebas Pustaka" ? 
                                (<button className="bg-[#7BE4AF] text-white px-2 gap-1 py-1 rounded flex items-center">
                                    <img src="/bebaspustaka/success.png" alt="success"/> {bebaspustaka.status}
                                </button>) : 
                                (<button className="bg-blue-500 text-white px-3 py-1 rounded">
                                    Tanggungan
                                </button>)}</td>
                            <td className="px-4 py-2 text-center">{bebaspustaka.status_pinjaman === "Lunas" ? 
                                (<button className="bg-[#E5F4EC] text-[#318D5F] border border-gray-200 px-2 gap-1 py-1 rounded">
                                    Lunas
                                </button>) :
                                <button className="bg-[#FFA4A4] text-red-500 border border-gray-200 px-2 gap-1 py-1 rounded">
                                    Belum
                                </button>
                                }</td>
                            <td className="px-4 py-2  text-center">{bebaspustaka.keterangan || "-"}</td>
                            <td className="flex justify-center items-center gap-3 px-4 py-2  text-center"> {bebaspustaka.status === "Bebas Pustaka" ?
                                (<img src="/tenggat/delete.png" alt="delete"/> ) : (<button onClick={() => goToKeterangan(bebaspustaka.nim)}><img src="/bebaspustaka/edit.png" alt="update"/></button> )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ListBebasPustaka;