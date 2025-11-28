import {useState } from "react"

function AddTenggatWaktu({getTenggat}) {

    const[newTenggat, setTenggat] = useState({
        waktu_mulai : "",
        waktu_akhir : ""
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        const res = await fetch("http://127.0.0.1:3000/tenggat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(newTenggat)
        });

        const data = await res.json();
        console.log("Response:", data);
        
        getTenggat()

        setTenggat({ waktu_mulai: "", waktu_akhir: "" });
    }


    return (
        <div className="pl-8">
            <div className="mb-4">
                <h1>Atur Jadwal :</h1>
            </div>
            <div>
                <form onSubmit={handleSubmit} className="mb-4">
                    <div className="flex gap-4">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="start-date">Start</label>
                            <input value={newTenggat.waktu_mulai} onChange={(e) => setTenggat({...newTenggat, waktu_mulai: e.target.value})} className="border border-fuchsia-600 rounded-xs py-1 px-2" id="start-date" type="date" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="end-date">End</label>
                            <input value={newTenggat.waktu_akhir} onChange={(e) => setTenggat({...newTenggat, waktu_akhir: e.target.value})} className="border border-fuchsia-600 rounded-xs py-1 px-2" id="end-date" type="date" />
                        </div>
                    </div>
                    <button className="flex items-center mt-4 py-1 px-4 text-white rounded-xs bg-blue-500">Tambah Jadwal</button>
                </form>
            </div>
        </div>
    )
}

export default AddTenggatWaktu