import React from "react"
import Brand from "./Brand"
import Sidebar from "./Sidebar"
import Logout from "./Logout"

function SidebarApp() {
    return (
        <div className="flex flex-col h-full justify-between">
            <Sidebar />
            <Logout />
        </div>
    )
}


export default SidebarApp