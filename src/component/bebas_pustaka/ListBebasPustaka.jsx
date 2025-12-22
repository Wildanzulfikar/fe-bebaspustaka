import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";

function ListBebasPustaka({ bebaspustakas }) {
    const navigate = useNavigate();

    const goToKeterangan = (id) => {
        navigate(`/edit-keterangan/${id}`);
    };

    const columns = [
        { name: "ID", selector: row => row.id_mahasiswa, sortable: true },
        { name: "NIM", selector: row => row.nim, sortable: true },
        { name: "Nama Lengkap", selector: row => row.nama, sortable: true },
        { name: "Semester", selector: row => row.semester, sortable: true },
        { name: "Prodi", selector: row => row.prodi, sortable: true },
        { name: "Kelas", selector: row => row.kelas, sortable: true },
        {
            name: "Status",
            selector: row => row.status,
            sortable: true,
            cell: row => row.status === "Bebas Pustaka"
                ? <button className="bg-[#7BE4AF] text-white px-2 py-1 rounded flex items-center"><img src="/bebaspustaka/success.png" alt="success" /> {row.status}</button>
                : <button className="bg-blue-500 text-white px-3 py-1 rounded">Tanggungan</button>
        },
        {
            name: "Status Pinjaman",
            selector: row => row.status_pinjaman,
            sortable: true,
            cell: row => row.status_pinjaman === "Lunas"
                ? <button className="bg-[#E5F4EC] text-[#318D5F] border border-gray-200 px-2 py-1 rounded">Lunas</button>
                : <button className="bg-[#FFA4A4] text-red-500 border border-gray-200 px-2 py-1 rounded">Belum</button>
        },
        { name: "Keterangan", selector: row => row.keterangan || "-", sortable: false },
        {
            name: "Aksi",
            cell: row => row.status === "Bebas Pustaka"
                ? <img src="/tenggat/delete.png" alt="delete" />
                : <button onClick={() => goToKeterangan(row.nim)}><img src="/bebaspustaka/edit.png" alt="update" /></button>
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
                maxWidth: '100px',
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
        <div className="overflow-x-auto pb-4 w-full">
            <DataTable
                columns={columns}
                data={bebaspustakas}
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

export default ListBebasPustaka;