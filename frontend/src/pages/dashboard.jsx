import { useNavigate } from "react-router-dom";
import Balance from "../components/balance";
import Navbar from "../components/navbar";
import UserComp from "../components/userComp";
import { useEffect } from "react";

const Dashboard = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("token") === null) {
            navigate("/signin")
        }
    },[])
    
    return(
        <>
            <Navbar/>
            <Balance/>
            <UserComp/>
        </>
    )
}

export default Dashboard;