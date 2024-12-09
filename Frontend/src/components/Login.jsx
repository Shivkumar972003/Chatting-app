import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/useSlice";

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:3000/api/v1/user/login`,
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, 
        }
      );
      navigate("/");
      dispatch(setAuthUser(res.data));
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    setUser({
      username: "",
      password: "",
    });
  };

  return (
    <div className="min-w-96 mx-auto">
      <div className="w-full p-6 shadow-md bg-gray-400 rounded-lg bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Login
        </h1>
        <div className="text-black">
          <form onSubmit={onSubmitHandler} action="">
            <div>
              <label className="lable p-2">
                <span className="text-base label-text text-gray-700 mb-3">
                  User Name
                </span>
              </label>
              <input
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                className="w-full input input-bordered h-10 bg-white mt-1 mb-2"
                type="text"
                placeholder="Username"
              />
            </div>
            <div>
              <label className="lable p-2">
                <span className="text-base label-text text-gray-700 mb-3">
                  Password
                </span>
              </label>
              <input
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                className="w-full input input-bordered h-10 bg-white mt-1 mb-2"
                type="password"
                placeholder="Password"
              />
            </div>

            <p className="text-center text-red-700 m-2">
              Don't have an account? <Link to="/singup">singup</Link>
            </p>

            <div>
              <button
                type="submit"
                className="btn btn-block btn-sm mt-2 border border-slate-700 bg-white text-slate-500"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
