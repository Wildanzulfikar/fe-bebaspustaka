import { useState } from "react";

function UsersForm({setIsOpenModal}) {

    const [newUser, setNewUser] = useState({
        username : "",
        email : "",
        name : "",
        password : "",
        role : "",
        status : false,
    });

    const handleSubmit = async() => {
        await fetch("http://127.0.0.1:3000/users", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newUser)
        })

        console.log(body)

        setIsOpenModal(false)
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
            <div className="flex flex-col border border-indigo-500 w-96 bg-white p-4 rounded-md">
                <div className="flex justify-center py-1">
                     <img src="/users.png" alt="users" />
                </div>
                <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-1 font-semibold text-gray-700">
                        <label htmlFor="username">Username</label>
                        <input onChange={(e) => setNewUser({...newUser, username: e.target.value})} className="border border-gray-400 py-1 px-3 rounded-md focus:border-indigo-400 focus:outline-none transition-colors duration-200" type="text" id="username"/>
                    </div>
                    <div className="flex flex-col gap-1 font-semibold text-gray-700">
                        <label htmlFor="email">Email</label>
                        <input onChange={(e) => setNewUser({...newUser, email: e.target.value})} className="border border-gray-400 py-1 px-3 rounded-md focus:border-indigo-400 focus:outline-none transition-colors duration-200" type="email" id="email"/>
                    </div>
                    <div className="flex flex-col gap-1 font-semibold text-gray-700">
                        <label htmlFor="name">Name</label>
                        <input onChange={(e) => setNewUser({...newUser, name: e.target.value})} className="border border-gray-400 py-1 px-3 rounded-md focus:border-indigo-400 focus:outline-none transition-colors duration-200" type="text" id="name"/>
                    </div>
                    <div className="flex flex-col gap-1 font-semibold text-gray-700">
                        <label htmlFor="password">Password</label>
                        <input onChange={(e) => setNewUser({...newUser, password: e.target.value})} className="border border-gray-400 py-1 px-3 rounded-md focus:border-indigo-400 focus:outline-none transition-colors duration-200" type="password" id="password"/>
                    </div>
                    <div className="relative pt-2">
                        <select onChange={(e) => setNewUser({...newUser, role: e.target.value})} className="block w-full border border-gray-400 py-1 px-3 rounded-md focus:border-indigo-400 focus:outline-none appearance-none pr-8 transition-colors duration-200">
                            <option value="">Pilih Role</option>
                            <option value="admin">Admin</option>
                            <option value="staff">Staff</option>
                        </select>
                        <div className="pointer-events-none pt-2 absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <img src="/arrow.png"/>
                        </div>
                    </div>


                     <div className="relative pt-2">
                        <select onChange={(e) => setNewUser({...newUser, status: e.target.value})} className="block w-full border border-gray-400 py-1 px-3 rounded-md focus:border-indigo-400 focus:outline-none appearance-none pr-8 transition-colors duration-200">
                            <option value="">Status</option>
                            <option value="true">Active</option>
                            <option value="false">Non Active</option>
                        </select>
                        <div className="pointer-events-none absolute pt-2 inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <img src="/arrow.png"/>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 py-3">
                        <button className="text-white bg-blue-400 px-10 py-2 w-full rounded-md hover:bg-blue-500">Kirim</button>
                        <button className="text-white bg-red-400 hover:bg-red-500 px-10 py-2 w-full rounded-md" onClick={() => setIsOpenModal(false)}>Batal</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UsersForm;