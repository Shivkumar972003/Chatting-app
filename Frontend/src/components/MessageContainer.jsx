import React, { useEffect } from "react";
import SendInput from "./SendInput";
import Messages from "./Messages";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/useSlice";

const MessageContainer = () => {
  const { selectedUser, authUser, onlineUsers } = useSelector(store => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => dispatch(setSelectedUser(null));
  }, [dispatch]);

  // Ensure selectedUser is not null or undefined before accessing its properties
  const isOnline = selectedUser ? onlineUsers.includes(selectedUser._id) : false;

  return (
    <>
      {selectedUser ? (
        <div className="md:min-w-[650px] flex flex-col">
          <div className="flex gap-2 items-center bg-zinc-800 text-white px-4 py-2 mb-2">
            <div className={`avatar ${isOnline ? 'online' : '' }`}>
              <div className="w-12 rounded-full outline-none">
                <img src={selectedUser?.profilePhoto} alt="user-Profile" />
              </div>
            </div> 
            <div className="flex flex-col flex-1">
              <div className="flex justify-between gap-1">
                <p>{selectedUser?.fullname}</p>
              </div>
            </div>
          </div>
          <Messages />
          <SendInput />
        </div>
      ) : (
        <div className="md:min-w-[650px] flex flex-col justify-center items-center">
          <p className="text-3xl text-white font-bold">Hi, {authUser?.fullname}</p>
          <h1 className="text-2xl text-white">Let's Start Conversation</h1>
        </div>
      )}
    </>
  );
};

export default MessageContainer;
