import React, { useState } from "react";
import loginBg from "../../assets/pexels-tehmasip-khan-6601811.jpg";
import axios from "../../axios/";
import { GoogleLogin } from "react-google-login";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

function Index() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      const userDetails = await axios.post(
        "http://localhost:5000/user/login",
        {
          ...user,
        },
        {
          withCredentials: true,
        }
      );
      if (userDetails.status === 200) {
        localStorage.setItem("firstLogin", true);
        localStorage.setItem("role", userDetails.data.role);
        localStorage.setItem("user_id", userDetails.data.user_id);
        toast.success("Login Successfully");
        console.log(userDetails);
      }
      window.location.href = "/";
    } catch (err) {
      toast.error(err.response.data.msg, {
        duration: 1000,
      });
    }
  };

  // const responseGoogle = async (response) => {
  //   console.log(response);
  //   console.log(response.profileObj);

  //   try {
  //     const res = await axios.post("/user/google_Login", {
  //       tokenId: response.tokenId,
  //     });

  //     setUser({ ...user, error: "", success: res.data.msg });
  //     if (res.status === 200) {
  //       alert("Login Successfully");
  //       window.location.href = "/";
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <>
      <Toaster />
      <div className="flex flex-col md:flex-row bg-red-200 h-[100vh] justify-center items-center ">
        <div
          className="hidden md:block md:h-screen w-screen object-fill "
          style={
            {
              //    backgroundImage: `url(https://images.pexels.com/photos/6601811/pexels-photo-6601811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)` ,
              //    backgroundPosition:'center',
              //    height:'100%' ,
              //    backgroundSize: "cover"
            }
          }
        >
          <img
            className="h-full w-full"
            src={
              "https://images.pexels.com/photos/6601811/pexels-photo-6601811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            }
          />
          
        </div>
        <div className="flex flex-col w-3/4  items-center">
          <h1 className="text-[15px] mb-4 text-stone-600 font-semibold font-serif text-center text-lg md:text-4xl">
            Save the pooor animals! You are a Hero!
          </h1>
          <div >
            <input
              type="text"
              className=" mb-4 form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="email"
              placeholder="Email address"
              name="email"
              value={user.email}
              onChange={onChangeInput}
            />

            <input
              type="password"
              className="mb-4 form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="password"
              placeholder="Password"
              name="password"
              value={user.password}
              onChange={onChangeInput}
            />

            <button
              type="submit"
              onClick={loginSubmit}
              className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              Login
            </button>
          </div>
          <p class="text-sm font-semibold mt-2 pt-1 mb-0 ">
            Don't have an account?Seriesly????
            <a
              href="/register"
              className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
            >
              Register
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default Index;
