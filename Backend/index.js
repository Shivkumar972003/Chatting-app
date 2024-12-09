import express from "express";
import dotenv from "dotenv";
import connectedDB from "./config/database.js";
import userRoute from "./routes/userRoute.js";
import cookieParser from "cookie-parser";
import messageRoute from './routes/messageRoute.js'
import cors from 'cors';
import {app,server} from "./socket/socket.js"
import path from 'path';
dotenv.config({});




const PORT = process.env.PORT || 3000;


const _dirname = path.resolve();

//Middleware
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(cookieParser());
const corsOption={
  origin:'http://localhost:3001',
  credentials:true
};
app.use(cors(corsOption))


//Router
app.use("/api/v1/user",userRoute)
app.use("/api/v1/message",messageRoute)




app.use(express.static(path.join(_dirname,"/Frontend/build")));
app.get('*',(req,res) => {
  res.sendFile(path.resolve(_dirname,"Frontend","build","index.html"))
})

server.listen(PORT, () => {
  connectedDB();
  console.log(`Server listen at port ${PORT}`);
});
