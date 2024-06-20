import axios from "axios";
import { useEffect, useState } from "react";

const Balance = () => {
    const[amount, setAmount] = useState(0);
    useEffect(()=>{
        axios.get('http://localhost:3000/api/v1/account/balance',{
            headers:{
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        .then(res => {setAmount(res.data.balance)})
    },[])

    return(
        <div className="mt-3 flex justify-between py-2 px-2 item-center">
            <div className="flex justify-center items-center">
                <div className="font-semibold">
                    Your Balance: &nbsp;₹{amount}
                </div>
            </div>
        </div>
    )
}
export default Balance;