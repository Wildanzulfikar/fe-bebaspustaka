import { useEffect} from "react";

function UsersList({setIsOpenModal, users, getUsers}) {

  useEffect(() => {
    getUsers();
  }, []);

  const handleDelete = async(id) => {
  
    if(!confirm("yakin anda mau hapus users ini?")) return;
  
    await fetch(`http://127.0.0.1:3000/users/${id}`, {
      method : "DELETE"
    })
  
    getUsers()
  }

  return (
    <div className="bg-white h-full ml-2 rounded-md mt-2 drop-shadow-xl">
        <div className="flex gap-2 px-8 py-8">
            <h2 className="font-bold text-xl mb-2 text-[#4B4B4B]">Data Users</h2>
            <img className="h-6 mt-1" src="/users/people-users.png" alt="" />
        </div>

        <button onClick={() => setIsOpenModal(true)} className="bg-blue-500 text-white rounded-xs px-6 py-2 p font-semibold mx-8 mb-8">+ Tambah Users</button>

        <table className="table-fixed w-full">
            <thead>
                <tr className="bg-[#008797] text-white">
                <th className="w-1/12 px-4 py-2  text-center">ID</th>
                <th className="w-2/12 px-4 py-2  text-center">Nama</th>
                <th className="w-3/12 px-4 py-2  text-center">Email</th>
                <th className="w-3/12 px-4 py-2  text-center">Password</th>
                <th className="w-2/12 px-4 py-2  text-center">Username</th>
                <th className="w-1/12 px-4 py-2  text-center">Role</th>
                <th className="w-1/12 px-4 py-2  text-center">Status</th>
                <th className="w-2/12 px-4 py-2  text-center">Aksi</th>
                </tr>
            </thead>
            <tbody>
                {users.map((u) => (
                <tr key={u.id_users} className="border-b-2 border-b-gray-200 hover:bg-gray-100">
                    <td className="px-4 py-2  text-center">{u.id_users}</td>
                    <td className="px-4 py-2  text-center">{u.name}</td>
                    <td className="px-4 py-2  text-center">{u.email}</td>
                    <td className="px-4 py-2  text-center">{u.password.length > 8 ? u.password.slice(0,8) + "..." : u.password}</td>
                    <td className="px-4 py-2  text-center">{u.username}</td>
                    <td className="px-4 py-2  text-center">{u.role}</td>
                    <td className="px-4 py-2  text-center">{u.status ? "Active" : "Non Active"}</td>
                    <td className="flex px-4 py-2  justify-center">
                        <img onClick={() => handleDelete(u.id_users)} src="/users/trash.png" alt="delete" className="w-5 cursor-pointer" />
                    </td>
                </tr>
                ))}
            </tbody>
        </table>
    </div>
  );
}

export default UsersList;
