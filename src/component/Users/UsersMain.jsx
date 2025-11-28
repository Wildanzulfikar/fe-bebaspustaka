import { useState } from "react"
import UsersForm from "./UsersForm"
import UsersList from "./UsersList"

function UsersMain() {

    const [OpenIsModal, setIsOpenModal] = useState(false)
    const [users, setUsers] = useState([]);

      const getUsers = async () => {
        const res = await fetch("http://localhost:3000/users");
        const data = await res.json();
        setUsers(data);
      };

    return (
        <div className="flex bg-white min-h-full">
            <UsersList setIsOpenModal={setIsOpenModal} getUsers={getUsers} users={users}/>
            {OpenIsModal && (
                <UsersForm setIsOpenModal={setIsOpenModal} getUsers={getUsers} />
            )}
        </div>
    )
}

export default UsersMain;