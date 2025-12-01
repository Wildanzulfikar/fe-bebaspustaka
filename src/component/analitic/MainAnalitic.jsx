import React from "react"
import StatsCard from "./StatsCard"
import BarChart from "./BarChart"
import PieChart from "./PieChart"
import ProdiAnalytics from "./ProdiAnalytics"

function MainAnalitic() {
    const stats = [
        { icon: "/analitic/mahasiswa.png", label: "Mahasiswa", value: "6400" },
        { icon: "/analitic/peminjam.png", label: "Peminjam", value: "6400" },
        { icon: "/analitic/tunggakan.png", label: "Tunggakan", value: "6400" },
        { icon: "/analitic/bebas-kompen.png", label: "Bebas Kompen", value: "6400" }
    ]

    return (
        <div className="bg-white ml-2 mt-2 rounded-lg h-screen flex flex-col overflow-hidden">
            {/* Container dengan scroll */}
            <div className="overflow-y-auto flex-1">
                <div className="p-8">
                    {/* Header */}
                    <div className="flex items-center gap-2 mb-6">
                        <h1 className="font-bold text-2xl">Welcome back, Wilz 👋</h1>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-4 gap-4 mb-8">
                        {stats.map((stat, index) => (
                            <StatsCard key={index} icon={stat.icon} label={stat.label} value={stat.value} />
                        ))}
                    </div>

                    {/* Main Content - Bar Chart and Prodi Analytics */}
                    <div className="grid grid-cols-3 gap-4 mb-8">
                        {/* Bar Chart */}
                        <div className="col-span-2">
                            <BarChart />
                        </div>
                        {/* Prodi Analytics */}
                        <div className="col-span-1">
                            <ProdiAnalytics />
                        </div>
                    </div>

                    {/* Bottom Row - Loan List and Pie Chart */}
                    <div className="grid grid-cols-2 gap-4">
                        {/* Loan Data */}
                        <div>
                            <div className="bg-gradient-to-b from-pink-300 to-pink-200 rounded-lg p-6">
                                <h2 className="font-bold text-white mb-4">Peminjam</h2>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between text-white">
                                        <span>Teknik Informatika dan Komputer</span>
                                        <span>125</span>
                                    </div>
                                    <div className="flex justify-between text-white">
                                        <span>Teknik Elektro</span>
                                        <span>20</span>
                                    </div>
                                    <div className="flex justify-between text-white">
                                        <span>Teknik Grafika Penerbitan</span>
                                        <span>45</span>
                                    </div>
                                    <div className="flex justify-between text-white">
                                        <span>Teknik Mesin</span>
                                        <span>50</span>
                                    </div>
                                    <div className="flex justify-between text-white">
                                        <span>Akuntansi</span>
                                        <span>480</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Pie Chart */}
                        <div>
                            <PieChart />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainAnalitic
