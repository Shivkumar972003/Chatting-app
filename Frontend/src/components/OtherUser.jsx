import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/useSlice";

const OtherUser = (props) => {
  const dispatch = useDispatch();
  const { selectedUser , onlineUsers } = useSelector((store) => store.user);
  const user = props.user;
  const isOnline = onlineUsers.includes(user._id);
  const selectedUserHandler = (user) => {
    dispatch(setSelectedUser(user));
  };

  return (
    <div>
      <div
        onClick={() => selectedUserHandler(user)}
        className={` ${
          selectedUser?._id === user?._id ? "bg-zinc-200 text-zinc-800" : "" } flex gap-2 items-center text-white rounded p-2 cursor-pointer`}>   
        <div className={`avatar ${isOnline ? 'online' : '' }`}>
          <div className="w-12 rounded-full outline-none">
            <img src={user?.profilePhoto} alt="user-Profile" />
          </div>
        </div> 
        <div className="flex flex-col flex-1">
          <div className="flex justify-between gap-1">
            <p>{user?.fullname}</p>
          </div>
        </div>
      </div>
      <div className="divider my-0 py-0 h-1"></div>
    </div>
  );
};

export default OtherUser;
