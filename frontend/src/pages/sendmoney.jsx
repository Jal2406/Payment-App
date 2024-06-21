import { useSearchParams } from "react-router-dom";
import AvatarLable from "../components/avatarLable";
import Button from "../components/button";
import { Heading } from "../components/heading";
import { InputBox } from "../components/inputBox";
import axios from "axios";
import { useState } from "react";

const Sendmoney = () => {
    const [searchParams] = useSearchParams()
    const id = searchParams.get("id")
    const fname = searchParams.get("fname")
    const lname = searchParams.get("lname")
    const [amount, setAmount] = useState(0);
    
    return(
        <div className="h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] px-12 py-4 rounded-md">
                    <Heading lable={"Send Money"}/>
                    <AvatarLable lable={`${fname} ${lname}`}/>
                    <InputBox onChange={e => {setAmount(e.target.value)}} lable={"Amount"} placeholder={"Enter Amount"}/>
                    <Button onClick={() => {
                        axios.post("http://localhost:3000/api/v1/account/transfer",{
                            to: id,
                            amount: amount
                        },{
                            headers: {
                                'Authorization': `Bearer ${localStorage.getItem("token")}`
                            }
                        })
                    }} text={"Transfer The Amount"}/>
                </div>
            </div>
        </div>
    )
}

export default Sendmoney;