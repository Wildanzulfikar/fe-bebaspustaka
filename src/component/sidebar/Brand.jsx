import React from "react"

function Brand() {
    return(
        <div className="flex gap-4 p-2 mb-2 drop-shadow-md drop-shadow-gray-200 h-20 items-center bg-white rounded-md">
            <div>
                <img src="/logo-pnj.png" alt="logo-pnj" />
            </div>
            <div className="text-2xl font-bold">
                <h1>e - Bebas<span className="text-[#008797]">Pus</span></h1>
            </div>
        </div>
    )
}

export default Brand;