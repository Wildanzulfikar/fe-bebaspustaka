import AddTenggatWaktu from "./AddTenggatWaktu"
import ListTenggatWaktu from "./ListTenggatWaktu"

function MainTenggat() {
    return (
        <div className="bg-white ml-2 mt-2">
            <div className="flex items-center gap-2 p-8">
                <h1 className="font-bold text-2xl">Tenggat Waktu</h1>
                <img src="/tenggat/calendar.png" alt="calendar"/>
            </div>
            <div>
                <AddTenggatWaktu />
                <ListTenggatWaktu />
            </div>
        </div>
    )
}

export default MainTenggat