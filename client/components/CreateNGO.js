import React, { useState } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import axios from "axios";
import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import("./MapComponent"), { ssr: false });

export default function PostModal({ open, onClose }) {
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState("");
  const [checkbox, setCheckbox] = useState({
    minor: false,
    major: false,
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    images.forEach((image) => {
      formData.append("file", image);
    });
    formData.append("description", description);
    if (checkbox.minor) formData.append("type", "minor");
    else formData.append("type", "major");

    const response = await fetch("http://localhost:5000/api/post", {
      method: "POST",
      credentials: "include",
      body: formData,
    });
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
        <h2 className="text-2xl font-semibold">Post</h2>
        <form
          className=" flex flex-col justify-center w-full"
          onSubmit={handleSubmit}
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
            onChange={(e) => {
              const files = e.target.files;
              const entire = [];
              for (let i = 0; i < files.length; ++i) entire.push(files[i]);
              setImages(entire);
            }}
          />
          <div className="flex flex-wrap  justify-center ">
            {images &&
              images.map((image) => (
                <img
                  src={URL.createObjectURL(image)}
                  className="h-36 w-36 md:h-44 md:w-44 border rounded-full"
                />
              ))}
          </div>
          <label className=" lg:block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Org Name
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text"/>
          
          <label className=" lg:block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Email
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="abc@mail.com"/>
         
            
          <label className=" lg:block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Password
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="*******"/>
                
          <label className=" lg:block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Address
          </label>
          <textarea
            
            className="resize-none shadow appearance-none border border-stone-400 rounded  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
         
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
