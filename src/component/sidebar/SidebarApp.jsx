import React from "react"
import Sidebar from "./Sidebar"
import Logout from "./Logout"

function SidebarApp() {
    return (
        <div className="flex flex-col rounded-md shadow-md bg-white  h-full justify-between">
            <Sidebar />
            <Logout />
        </div>
    )
}


export default SidebarApp