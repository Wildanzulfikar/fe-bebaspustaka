import { useState } from "react";
import LoanList from "./LoanList";

function MainLoan() {

    const[loans, setLoan] = useState([])

    const getLoan = async() => {
        const res = await fetch("http://127.0.0.1:3000/api/loan")
        const data = await res.json()

        setLoan(data)
    }

    return (
        <div>
            <LoanList loans={loans} getLoan={getLoan}/>
        </div>
    )
}

export default MainLoan