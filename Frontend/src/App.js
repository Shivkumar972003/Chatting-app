import Singup from "./components/signup"
import {createBrowserRouter , RouterProvider} from "react-router-dom";
import Login from "./components/Login";
import HomePage from "./components/HomePage";
import './App.css';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from 'socket.io-client'
import { setOnlineUsers } from "./redux/useSlice";
import { setSocket } from "./redux/socketSlice";

const router = createBrowserRouter([
  {
    path:"/",
    element:<HomePage/>
  },
  {
    path:"/singup",
    element:<Singup/>
  },
  {
    path:"/login",
    element:<Login/>
  },
])


function App() {
  const {authUser} = useSelector(store => store.user)
  const {socket} = useSelector(store => store.socket)
  const dispatch = useDispatch();

useEffect(() => {
   if(authUser)
   {
    const socket = io('http://localhost:3000',{
          query:{
            userId:authUser._id
          }
    });
    dispatch(setSocket(socket));
    socket.on('getOnlineUsers',(onlineUser) => {
      dispatch(setOnlineUsers(onlineUser))
    });
    return () => socket.close();

   }else{
      if(socket){
        socket.close();
        dispatch(setSocket(null))
      }
   }
},[authUser])

  return (
    <div className="p-4 h-screen flex justify-center items-center">
      <RouterProvider router={router}/>
    </div>

  );
}

export default App;
