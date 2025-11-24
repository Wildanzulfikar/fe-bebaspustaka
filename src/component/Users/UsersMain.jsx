import { useState } from "react"
import UsersForm from "./UsersForm"
import UsersList from "./UsersList"

function UsersMain() {

    const [OpenIsModal, setIsOpenModal] = useState(false)

    return (
        <div className="flex bg-white min-h-full">
            <UsersList setIsOpenModal={setIsOpenModal}/>
            {OpenIsModal && (
                <UsersForm setIsOpenModal={setIsOpenModal} />
            )}
        </div>
    )
}

export default UsersMain;