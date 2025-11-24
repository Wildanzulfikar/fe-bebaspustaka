function AddTenggatWaktu() {
    return (
        <div className="pl-8">
            <div className="mb-4">
                <h1>Atur Jadwal :</h1>
            </div>
            <div>
                <form className="mb-4">
                    <div className="flex gap-4">
                        <div className="flex flex-col">
                            <label htmlFor="start-date">Start</label>
                            <input className="border border-y-zinc-400 rounded-xs" id="start-date" type="datetime" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="end-date">End</label>
                            <input className="border border-y-zinc-400 rounded-xs" id="start-date" type="datetime" />
                        </div>
                    </div>
                    <button className="flex items-center mt-4 py-1 px-4 text-white rounded-xs bg-blue-500">Tambah Jadwal</button>
                </form>
            </div>
        </div>
    )
}

export default AddTenggatWaktu