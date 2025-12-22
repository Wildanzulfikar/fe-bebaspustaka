import { useEffect } from "react";
import { toast } from "react-hot-toast";
import DataTable from "react-data-table-component";

function UsersList({setIsOpenModal, users, getUsers}) {

  useEffect(() => {
    getUsers();
  }, []);

    const handleDelete = async(id) => {
      if(!confirm("yakin anda mau hapus users ini?")) return;
      try {
        const res = await fetch(`http://127.0.0.1:3000/users/${id}`, {
          method : "DELETE"
        });
        if (res.ok) {
          toast.success("User berhasil dihapus!");
          getUsers();
        } else {
          toast.error("Gagal menghapus user!");
        }
      } catch (err) {
        toast.error("Terjadi kesalahan jaringan!");
      }
    }

  const columns = [
    { name: "ID", selector: row => row.id_users ?? '-', sortable: true },
    { name: "Nama", selector: row => row.name ?? '-', sortable: true },
    { name: "Email", selector: row => row.email ?? '-', sortable: true },
    { name: "Password", selector: row => (row.password?.length > 8 ? row.password.slice(0,8) + "..." : row.password), sortable: false },
    { name: "Username", selector: row => row.username ?? '-', sortable: true },
    { name: "Role", selector: row => row.role ?? '-', sortable: true },
    { name: "Status", selector: row => row.status ? "Active" : "Non Active", sortable: true },
    {
      name: "Aksi",
      cell: row => (
        <div className="flex justify-center">
          <img onClick={() => handleDelete(row.id_users)} src="/users/trash.png" alt="delete" className="w-5 cursor-pointer" />
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
    <div className="bg-white h-full ml-2 rounded-md mt-2 drop-shadow-xl w-full" style={{ overflowX: 'auto' }}>
      <div className="flex gap-2 px-8 py-8">
        <h2 className="font-bold text-xl mb-2 text-[#4B4B4B]">Data Users</h2>
        <img className="h-6 mt-1" src="/users/people-users.png" alt="" />
      </div>
      <button onClick={() => setIsOpenModal(true)} className="bg-blue-500 text-white rounded-xs px-6 py-2 p font-semibold mx-8 mb-8">+ Tambah Users</button>
      <div style={{ minWidth: 1000 }}>
        <DataTable
          columns={columns}
          data={users}
          pagination
          highlightOnHover
          striped
          responsive={false}
          persistTableHead
          customStyles={customStyles}
        />
      </div>
    </div>
  );
}

export default UsersList;
