import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import LeftBar from "../../components/LeftBar";
import axios from "../../axios/";

import RightBar from "../../components/RightBar";
import MobileNav from "../../components/MobileNav";
import { MailOutlined, EditOutlined } from "@ant-design/icons";

const initialState = {
  name: "",
  address: "",
  avatar: null,
};

export default function index() {
  const [user, setUser] = useState(initialState);
  const fileRef = useRef(null);
  const { name, address, avatar } = user;

  const getUser = async () => {
    try {
      const userResponse = await axios.get("http://localhost:5000/user/infor");
      console.log(userResponse);
      setUser(userResponse.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "avatar") {
      setUser({ ...user, [name]: e.target.files[0] });
      return;
    }
    setUser({ ...user, [name]: value });
  };

  return (
    <div>
      <div className="h-[8vh] bg-stone-100 w-full flex items-center  text-xl font-semibold">
        <h2 className="ml-6">Animal Rescue</h2>
      </div>
      <div className="flex h-[92vh]">
        <div className="md:flex  flex-auto w-1/4 hidden   justify-center items-center border">
          <LeftBar />
        </div>
        <div className="w-full md:w-3/4  border p-2 h-[92vh]  ">
          <div className="flex justify-center">
            <h2 className="font-semibold text-2xl text-stone-500 lg:hidden block">
              Profile
            </h2>
          </div>

          <div className="max-w-4xl flex items-center h-auto lg:h-[90vh] flex-wrap mx-auto my-32 lg:my-0">
            {/* <!--Main Col--> */}
            <div
              id="profile"
              className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0"
            >
              {" "}
              <h2 className="font-semibold text-2xl text-stone-600 lg:block hidden">
                Profile
              </h2>
              <div className="p-4 md:p-12 text-center lg:text-left">
                {/* <!-- Image for mobile view--> */}
                <div className="block lg:hidden  shadow-xl mx-auto -mt-20 h-52 w-4/5 bg-cover mb-2 pointer">
                  <img
                    className="block lg:hidden rounded-full  mx-auto -mt-20 h-44 w-44 bg-cover bg-center"
                    src={
                      user.avatar?.download_url
                        ? user.avatar?.download_url
                        : user.avatar
                        ? URL.createObjectURL(user.avatar)
                        : user.avatar?.download_url
                    }
                  />

                  <EditOutlined
                    className="text-2xl text-pink-400"
                    onClick={() => fileRef.current.click()}
                  />
                  <input
                    name="avatar"
                    onChange={handleChange}
                    ref={fileRef}
                    type="file"
                    style={{ display: "none" }}
                  />
                </div>

                <label
                  class=" mt-4block text-gray-700 text-sm font-bold mb-2 mt-4"
                  for="username"
                >
                  Your Name
                </label>
                <br></br>
                <input
                  value={user?.name}
                  className="shadow appearance-none border rounded w-4/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />

                <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25"></div>
                <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start mb-2 ">
                  <MailOutlined
                    style={{
                      fontSize: "1.1rem",
                      color: "#ff4d4d",
                      marginRight: "0.5rem",
                    }}
                  />
                  asadas@gmail.com
                </p>
                <label
                  class=" mt-4block text-gray-700 text-sm font-bold mb-2"
                  for="username"
                >
                  Your Address
                </label>
                <br></br>
                <textarea className="resize-none shadow appearance-none border rounded  w-4/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />

                <div className="pt-2 pb-12">
                  <button className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full">
                    Update
                  </button>
                </div>

                {/* <!-- Use https://simpleicons.org/ to find the svg for your preferred product -->  */}
              </div>
            </div>

            {/* <!--Img Col--> */}
            <div className="lg:block hidden w-full lg:w-2/5">
              {/* <!-- Big profile image for side bar (desktop) --> */}

              <label
                className="hidden lg:block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                for="file_input"
              >
                Upload file
              </label>
              <input
                className="hidden lg:block 
                text-sm text-grey-500
            file:mr-5 file:py-2 file:px-6
            file:rounded-full file:border-0
            file:text-sm file:font-medium
            file:bg-blue-50 file:text-blue-700
            hover:file:cursor-pointer hover:file:bg-amber-50
            hover:file:text-amber-700 mb-2"
                id="file_input"
                type="file"
                name="avatar"
                onChange={handleChange}
              />

              <img
                src={
                  user.avatar?.download_url
                    ? user.avatar?.download_url
                    : user.avatar
                    ? URL.createObjectURL(user.avatar)
                    : user.avatar?.download_url
                }
                className="rounded-none h-[400px] w-full lg:rounded-lg shadow-2xl lg:block hidden"
              />
              {/* <!-- Image from: http://unsplash.com/photos/MP0IUfwrn0A -->
               */}
            </div>
          </div>
        </div>
        <MobileNav />
        {/* <div className="w-80 md:flex hidden">
            <RightBar />
          </div> */}
      </div>
    </div>
  );
}
