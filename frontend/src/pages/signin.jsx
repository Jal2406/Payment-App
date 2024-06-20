import { useEffect, useState } from "react";
import { BottomWarning } from "../components/bottomWarning";
import Button from "../components/button";
import { Heading } from "../components/heading";
import { InputBox } from "../components/inputBox";
import { SubHeading } from "../components/subHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signin = () =>{
    const navigate = useNavigate();
    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    useEffect(() => {
        if (localStorage.getItem("token") != null) {
            navigate("/dashboard")
        }
    },[])
    return(
        <div className="bg-slate-500 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="bg-white px-5 py-6 rounded-xl">
                    <Heading lable={"Sign in"}/>
                    <SubHeading text={"Enter your crendentials to access the account"}/>
                    <InputBox onChange={e => {setEmail(e.target.value)}} lable={"Username"} placeholder={"jal@gmail.com"}/>
                    <InputBox lable={"Password"} placeholder={"123456"} onChange={e => {setPassword(e.target.value)}}/>
                    <Button onClick={async()=>{
                        const res = await axios.post("http://localhost:3000/api/v1/user/signin",{
                            email,
                            password
                        })
                        localStorage.setItem("token", res.data.token)
                        navigate('/dashboard')

                    }} text={"Sign In"}/>
                    <BottomWarning text={"Don't have an account?"} lable={"Sign Up"} to={"/signup"}/>
                </div>
            </div>
        </div>
    )
}

export default Signin;