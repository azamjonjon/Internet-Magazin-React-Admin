import React, { useState } from "react";
import { Eye, EyeOff, ShoppingCart } from "lucide-react";
import img1 from "../images/Mascicon.png";
import img2 from "../images/Group 1116606595 (1).png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userName, setuserName] = useState("");
  const [password, setpassword] = useState("");
  let navigate = useNavigate();

  async function Login() {
    let newUser = {
      userName: userName,
      password: password,
    };
    try {
      let { data } = await axios.post(
        "https://store-api.softclub.tj/Account/login",
        newUser
      );
      navigate("/dashboard")
      localStorage.setItem("token", data.data);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div>
      <div className="min-h-screen flex font-sans">
        <div className="flex-1 bg-gradient-to-br from-slate-800 via-slate-700 to-blue-900 flex flex-col justify-center items-start px-16 text-white">
          <h1 className="text-2xl font-medium mb-8">Welcome to admin panel</h1>
          <img src={img2} alt="" />
        </div>

        <div className="flex-1 bg-gray-50 flex flex-col justify-center items-center px-16">
          <div className="w-full max-w-sm">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">
              Log in
            </h2>

            <div className="space-y-2">
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                value={userName}
                onChange={(e) => setuserName(e.target.value)}
                id="email"
                placeholder="Email"
                className="w-full h-12 px-4 bg-white border border-gray-200 text-gray-900 placeholder:text-gray-500 rounded-md"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative flex items-center w-full h-12 px-4 bg-white border border-gray-200 text-gray-900 justify-between">
                <input
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className=" h-10 px-4 bg-white text-gray-900 placeholder:text-gray-500 pr-12 rounded-md"
                />
                <img
                  onClick={() => setShowPassword(!showPassword)}
                  src={img1}
                  alt=""
                />
              </div>
            </div>
            <div className="text-right">
              <p className="text-blue-600 hover:text-blue-700 text-sm">
                Forgot password?
              </p>
            </div>

            <button
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md"
              onClick={Login}
            >
              Log in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
