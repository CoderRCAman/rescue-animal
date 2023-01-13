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
                  className="h-36 w-36 md:h-44 md:w-44 border"
                />
              ))}
          </div>
          <label className=" lg:block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Description
          </label>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            className="resize-none shadow appearance-none border border-stone-400 rounded  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />

          <div className="flex items-center mb-4 mt-4">
            <input
              type="checkbox"
              value=""
              checked={checkbox.minor}
              onChange={(e) =>
                setCheckbox({
                  ...checkbox,
                  minor: !checkbox.minor,
                  major: false,
                })
              }
              className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Minor Injured
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={checkbox.major}
              onChange={(e) =>
                setCheckbox({
                  ...checkbox,
                  major: !checkbox.major,
                  minor: false,
                })
              }
              className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Major Injured
            </label>
          </div>
          <button
            type="submit"
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Post
          </button>
        </form>
      </Modal>
    </div>
  );
}
