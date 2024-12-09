import React, { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import OtherUsers from "./OtherUsers";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { setAuthUser, setOtherUsers } from "../redux/useSlice";


const Sidebar = () => {
  const [search,setSearch] = useState("")
  const {otherUsers} = useSelector(store => store.user); 
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/v1/user/logout`);
      navigate("/login");
      toast.success(res.data.message);
      dispatch(setAuthUser(null)); 
    } catch (error) {
      console.log(error);
    }
  };
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    const conversationUser = otherUsers?.find((user)=> user.fullname.toLowerCase().includes(search.toLowerCase()))
    if(conversationUser){
      dispatch(setOtherUsers([conversationUser]))
    }
    else{
      toast.error("User not found")
    }
  }

  return (
    <>
    <div className="border-r border-slate-500 flex flex-col p-4">
      <form onSubmit={searchSubmitHandler} action="" className="flex items-center gap-1">
        <input
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          className="input input-bordered rounded-md bg-slate-100"
          type="text"
          placeholder="search..."
        />
        <button type="submit" className="btn bg-zinc-600 text-white">
          <IoSearchSharp className="w-6 h-6 outline-none" />
        </button>
      </form>
      <div className="divider px-3"></div>
      <OtherUsers />
      <div className="mt-2">
        <button
          onClick={logoutHandler}
          className="btn btn-sm bg-white text-zinc-800"
        >
          Logout
        </button>
      </div>
    </div>
    </>
  );
};

export default Sidebar;
