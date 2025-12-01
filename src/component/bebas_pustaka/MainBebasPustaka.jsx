import { useEffect, useState } from "react"
import ListBebasPustaka from "./ListBebasPustaka"

export default function MainBebasPustaka() {

    const[bebaspustakas, setBebasPustaka] = useState([])

    const getBebasPustaka = async() => {
        const res = await fetch("http://localhost:3000/api/mahasiswa-bebas-pustaka")
        const data = await res.json()
        console.log(data)
        setBebasPustaka(data)
    }

    useEffect(() => {
        getBebasPustaka()
    }, [])

    return (
        <div>   
            <ListBebasPustaka bebaspustakas={bebaspustakas}/>
        </div>
    )
}