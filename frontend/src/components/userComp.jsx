import { useEffect, useState } from "react";
import Button from "./button";
import axios from "axios";
import User from "./user";

const UserComp = () => {
    const[users, setUser] = useState([]);
    const [filter, setFilter] = useState("");
    useEffect(() => {
        axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`)
        .then(res => {
            setUser(res.data.user);
        })
    },[filter])

    console.log(users.map(user => user.fname))
    return (
        <div className="mx-4">
            <div className="font-semibold">
                Users
            </div>
            <div className="flex items-center gap-2 px-3 py-[6px] border border-[#D9D9D9] text-[#808080] rounded w-full w-full">
                    <div className="flex flex-col justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="size-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </div>
                    <input type="text" name="" id="" placeholder="Search Users..." onChange={e => setFilter(e.target.value)} className="bg-transparent outline-none w-full ml-1" />
            </div>
            <div>
                {users.map(user => <User user={user}/>)}
            </div>
        </div>
    )

}

export default UserComp;