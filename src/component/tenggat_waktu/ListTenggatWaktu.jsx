import { useEffect} from "react"

function ListTenggatWaktu({tenggat, getTenggat}) {

    useEffect(() => {
        getTenggat();
    },)

    const handleDelete = async(id) => {

        if(!confirm("yakin mau hapus?")) return;

        await fetch(`http://127.0.0.1:3000/tenggat/${id}`, {
            method: "DELETE"
        })
    
        getTenggat()
    }
    

    return (
        <div className="flex bg-white h-full rounded-md mt-2 drop-shadow-xl">
            <table className="table-fixed h-full w-full">
                <thead>
                    <tr className="bg-[#008797] text-white font-bold">
                        <th className="w-1/12 px-4 py-2  text-center">ID</th>
                        <th className="w-1/12 px-4 py-2  text-center">Username</th>
                        <th className="w-1/12 px-4 py-2  text-center">Nama Lengkap</th>
                        <th className="w-1/12 px-4 py-2  text-center">Email</th>
                        <th className="w-1/12 px-4 py-2  text-center">Waktu Mulai</th>
                        <th className="w-1/12 px-4 py-2  text-center">Waktu Akhir</th>
                        <th className="w-1/12 px-4 py-2  text-center">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {tenggat.map((t) => (
                        <tr key={t.id_tenggat_waktu} className="border-b-2 border-b-gray-200 hover:bg-gray-100">
                            <td className="px-4 py-2  text-center">{t.id_tenggat_waktu}</td>
                            <td className="px-4 py-2  text-center">{t.users_bebas_pustaka?.username}</td>
                            <td className="px-4 py-2  text-center">{t.users_bebas_pustaka?.name}</td>
                            <td className="px-4 py-2  text-center">{t.users_bebas_pustaka?.email}</td>
                            <td className="px-4 py-2  text-center">{new Date(t.waktu_mulai).toLocaleString()}</td>
                            <td className="px-4 py-2  text-center">{new Date(t.waktu_akhir).toLocaleString()}</td>
                            <td className="flex justify-center items-center gap-3 px-4 py-2  text-center">
                                <img onClick={() => handleDelete(t.id_tenggat_waktu)} src="/tenggat/delete.png" alt="delete"/> |
                                <img src="/tenggat/update.png" alt="update"/>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )   
}

export default ListTenggatWaktu