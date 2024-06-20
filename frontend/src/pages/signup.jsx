import { useEffect, useState } from "react";
import { BottomWarning } from "../components/bottomWarning";
import Button from "../components/button";
import { Heading } from "../components/heading";
import { InputBox } from "../components/inputBox";
import { SubHeading } from "../components/subHeading";
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate();
    const[fname, setFirstName] = useState("");
    const[lname, setLastName] = useState("");
    const[password, setPassword] = useState("");
    const[email, setUsername] = useState("");
    useEffect(() => {
        if (localStorage.getItem("token") != null) {
            navigate("/dashboard")
        }
    },[])
    return (
        <div className="bg-slate-400 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="bg-white px-5 py-6 rounded-xl">
                    <Heading lable={"Sign Up"}/>
                    <SubHeading text={"Enter your Information to create an Account"}/>
                    <InputBox onChange={e => {setUsername(e.target.value)}} lable={"Username"} placeholder={"jal@gmail.com"}/>
                    <InputBox onChange={e => {setFirstName(e.target.value)}} lable={"First Name"} placeholder={"Jal"}/>
                    <InputBox onChange={e => {setLastName(e.target.value)}} lable={"Last Name"} placeholder={"Mayani"}/>
                    <InputBox onChange={e => {setPassword(e.target.value)}} lable={"Password"} placeholder={"123456"}/>
                    <Button onClick={async() => {
                        const res = await axios.post('http://localhost:3000/api/v1/user/signup',{
                            email,
                            fname,
                            lname,
                            password
                        })
                        if (res.status === 200) {
                            toast.success("User Registered!!", {
                                position: "bottom-right",
                                pauseOnFocusLoss: false,
                                autoClose: 1000
                              });
                        }
                        localStorage.setItem("token", res.data.token)
                        navigate('/dashboard')
                    }} text={"Sign In"}/>
                    <BottomWarning text={"Already have an account?"} lable={"Sign In"} to={"/signin"}/>
                </div>
            </div>
        </div>
    )
}

export default Signup;