import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Toast, { toast } from "react-hot-toast";

const Signup = () => {
  const [user, setUser] = useState({
    fullname: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "", // track gender selection
  });

  const navigate = useNavigate();

  const handleGenderChange = (e) => {
    setUser({ ...user, gender: e.target.value }); // Update gender on change
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:3000/api/v1/user/register`,
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message)
      console.log(error);
    }

    setUser({
      fullname: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "",
    });
  };

  return (
    <div className="min-w-96 mx-auto">
      <div className="w-full p-6 shadow-md bg-gray-400 rounded-lg bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Signup
        </h1>
        <div className="text-black">
          <form onSubmit={onSubmitHandler} action="">
            <div>
              <label className="lable p-2">
                <span className="text-base label-text text-gray-700 mb-3">
                  Full Name
                </span>
              </label>
              <input
                value={user.fullname}
                onChange={(e) => setUser({ ...user, fullname: e.target.value })}
                className="w-full input input-bordered h-10 bg-white mt-1 mb-2"
                type="text"
                placeholder="Full name"
              />
            </div>
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
            <div>
              <label className="lable p-2">
                <span className="text-base label-text text-gray-700 mb-3">
                  Confirm Password
                </span>
              </label>
              <input
                value={user.confirmPassword}
                onChange={(e) =>
                  setUser({ ...user, confirmPassword: e.target.value })
                }
                className="w-full input input-bordered h-10 bg-white mt-1 mb-2"
                type="password"
                placeholder=" Confirm Password"
              />
            </div>

            {/* Gender selection */}
            <div className="flex items-center my-4">
              <div className="flex items-center text-slate-800">
                <p>Male</p>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={user.gender === "male"}
                  onChange={handleGenderChange}
                  className="checkbox mx-2 bg-gray-600"
                />
              </div>
              <div className="flex items-center text-slate-800">
                <p>Female</p>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={user.gender === "female"}
                  onChange={handleGenderChange}
                  className="checkbox mx-2 bg-gray-600"
                />
              </div>
            </div>

            <p className="text-center text-red-700 mb-1">
              Already have an account? <Link to="/login">login</Link>
            </p>

            <div>
              <button
                type="submit"
                className="btn btn-block btn-sm mt-2 border border-slate-700 bg-white text-slate-500"
              >
                Signup
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
