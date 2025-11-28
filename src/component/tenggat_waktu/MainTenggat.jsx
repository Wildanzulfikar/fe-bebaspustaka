import AddTenggatWaktu from "./AddTenggatWaktu"
import ListTenggatWaktu from "./ListTenggatWaktu"
import { useState } from "react"

function MainTenggat() {

        const [tenggat, setTenggat] = useState([])
        
        const getTenggat = async() => {
            const res = await fetch("http://127.0.0.1:3000/tenggat")
            const data = await res.json()
            
            setTenggat(data)
        }

    return (
        <div className="bg-white ml-2 mt-2 drop-shadow-xl">
            <div className="flex items-center gap-2 p-8">
                <h1 className="font-bold text-2xl">Tenggat Waktu</h1>
                <img src="/tenggat/calendar.png" alt="calendar"/>
            </div>
            <div>
                <AddTenggatWaktu getTenggat={getTenggat} />
                <ListTenggatWaktu tenggat={tenggat} getTenggat={getTenggat}/>
            </div>
        </div>
    )
}

export default MainTenggat