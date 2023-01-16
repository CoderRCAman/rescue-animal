import React, { useState } from "react";
import "react-responsive-modal/styles.css";
import toast, { Toaster } from "react-hot-toast";
import { Modal } from "react-responsive-modal";
import axios from "axios";
import dynamic from "next/dynamic";
import {EnvironmentOutlined} from '@ant-design/icons'

const MapComponent = dynamic(() => import("./MapComponent"), { ssr: false });

const initialState = {
  name: "",
  role: "ngo",
  email: "",
  password: "",
  pincode: "",
  address: "",
};

export default function PostModal({ open, onClose }) {
  // const fileRef = useRef(null);
  const [state, setState] = useState(initialState);
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);

  // const [images, setImages] = useState([]);
  // const [description, setDescription] = useState("");

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    if (name === "avatar") {
      setAvatar(e.target.files[0]);
    }
    setState({ ...state, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("avatar", avatar);
      formData.append("name", state.name);
      formData.append("email", state.email);
      formData.append("password", state.password);
      formData.append("pincode", state.pincode);
      formData.append("address", state.address);
      formData.append("role", state.role);

      const res = await axios({
        method: "POST",
        url: "http://localhost:5000/user/adddoctor",
        data: formData,
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status === 200) {
        toast.success("Successfully created!");
      } else {
        toast.error("Failed to create an doctor!");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        center
        classNames={{
          overlay: "customOverlayEnroll",
          modal: "customModalEnroll",
        }}
      >
      <Toaster/>

        <h2 className="text-2xl font-semibold">Create NGO</h2>
        <form
          className=" flex flex-col justify-center w-full"
          onSubmit={handleFormSubmit}
        >
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Upload Image
          </label>

          <input
            className="block 
                text-sm text-grey-500
            file:mr-5 file:py-2 file:px-6
            file:rounded-full file:border-0
            file:text-sm file:font-medium
            file:bg-blue-50 file:text-blue-700
            hover:file:cursor-pointer hover:file:bg-amber-50
            hover:file:text-amber-700 mb-2"
            id="file_input"
            multiple
            type="file"
            name="avatar"
            onChange={handleChangeInput}
          />

          <img
            src={
              avatar
                ? URL.createObjectURL(avatar)
                : "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aHVtYW58ZW58MHx8MHx8&w=1000&q=80"
            }
            alt="avatar"
            className="w-32 h-32 md:rounded-full rounded-full m-auto"
          />

          <label className=" lg:block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Org Name
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            name="name"
            onChange={handleChangeInput}
          />

          <label className=" lg:block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Email
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="abc@mail.com"
            name="email"
            onChange={handleChangeInput}
          />

          <label className=" lg:block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Password
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="text"
            placeholder="*******"
            name="password"
            onChange={handleChangeInput}
          />

          <label className=" lg:block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Address
          </label>
          <textarea
          name="address"
          onChange={handleChangeInput}
          className="resize-none shadow appearance-none border border-stone-400 rounded  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          <div className="flex flex-row justify-between">
            <div className="">
              <label className=" lg:block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Pincode
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="pincode"
                type="text"
                name="pincode"
                onChange={handleChangeInput}
                
              />
            </div>

            <div className=" py-7 flex flex-row justify-between">
              
              <button class=" flex-end bg-indigo-700 hover:bg-indigo-400 text-stone-200  py-2 px-2 rounded inline-flex items-center">
              <EnvironmentOutlined />
                <span className="hidden lg:block">Use My Location</span>
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create
          </button>
        </form>
      </Modal>
    </div>
  );
}
