import { useEffect } from "react"
import { toast } from "react-hot-toast"
import DataTable from "react-data-table-component"

function ListTenggatWaktu({tenggat, getTenggat}) {

    useEffect(() => {
        getTenggat();
    }, [])

    const handleDelete = async(id) => {
        if(!confirm("yakin mau hapus?")) return;
        try {
            const res = await fetch(`http://127.0.0.1:3000/tenggat/${id}`, {
                method: "DELETE"
            });
            if (res.ok) {
                toast.success("Tenggat waktu berhasil dihapus!");
                getTenggat();
            } else {
                toast.error("Gagal menghapus tenggat waktu!");
            }
        } catch (err) {
            toast.error("Terjadi kesalahan jaringan!");
        }
    }
    

    const columns = [
        { name: "ID", selector: row => row.id_tenggat_waktu ?? '-', sortable: true },
        { name: "Username", selector: row => row.users_bebas_pustaka?.username ?? '-', sortable: true },
        { name: "Nama Lengkap", selector: row => row.users_bebas_pustaka?.name ?? '-', sortable: true },
        { name: "Email", selector: row => row.users_bebas_pustaka?.email ?? '-', sortable: true },
        { name: "Waktu Mulai", selector: row => new Date(row.waktu_mulai).toLocaleString(), sortable: true },
        { name: "Waktu Akhir", selector: row => new Date(row.waktu_akhir).toLocaleString(), sortable: true },
        {
            name: "Aksi",
            cell: row => (
                <div className="flex justify-center items-center gap-3">
                    <img onClick={() => handleDelete(row.id_tenggat_waktu)} src="/tenggat/delete.png" alt="delete" style={{ cursor: 'pointer' }} />
                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
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
                maxWidth: '160px',
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
        <div className="bg-white h-full mt-2 w-full" style={{ overflowX: 'auto', minWidth: 1000 }}>
            <DataTable
                columns={columns}
                data={tenggat}
                pagination
                highlightOnHover
                striped
                responsive={false}
                persistTableHead
                customStyles={customStyles}
            />
        </div>
    )
}

export default ListTenggatWaktu