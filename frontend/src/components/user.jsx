import { useNavigate } from "react-router-dom";
import Button from "./button";


const User = ({user}) => {
    const navigate = useNavigate();
    return(
        <div className="mt-3 flex justify-between"> 
            <div className="flex text-center items-center gap-2">
                <div className="flex flex-col justify-center rounded-full bg-slate-300 h-10 w-10 text-center">{user.fname[0]}</div>
                <div>{user.fname} {user.lname}</div>
            </div>
            <div className="flex items-center">
                <Button text={"Send Money"} onClick={(e) =>{
                    navigate(`/sendmoney?id=${user._id}&fname=${user.fname}&lname=${user.lname}`)
                }}/>
            </div>
        </div>
    )
}

export default User;