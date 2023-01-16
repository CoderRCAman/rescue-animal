import { useEffect, useState } from "react";
import Head from "next/head";
import LeftBar from "../components/LeftBar";
import Navbar from "../components/Navbar";
import RightBar from "../components/RightBar";
import MobileNav from "../components/MobileNav";
import axios from "../axios/index";
import { CommentOutlined, LikeOutlined } from "@ant-design/icons";

export default function Home() {
  const [postInfo, setPostInfo] = useState(null); //stores user information
  const [tab, setTab] = useState();
  const [active, setActive] = useState(false);

  const isActive = (index) => {
    if (tab === index) return " active";
    return "";
  };

  const getPostInfo = async () => {
    try {
      console.log("help");
      const postResponse = await axios.get("http://localhost:5000/api/get", {
        withCredentials: true,
      });
      console.log(postResponse);
      setPostInfo(postResponse.data);
    } catch (error) {
      console.log(error); //hata dio
    }
  };
  useEffect(() => {
    getPostInfo();
  }, []);

  function handleClick() {
    setActive(!active);
  }
  return (
    <div>
      <div className="h-[8vh] bg-stone-100 w-full flex items-center  text-xl font-semibold">
        <h2 className="ml-6">Animal Rescue</h2>
      </div>
      <div className="flex h-[92vh]">
        <div className="md:flex  flex-auto w-1/4 hidden   justify-center items-center border">
          <LeftBar />
        </div>
        <div className="w-full md:w-3/4  border p-2 h-[92vh] overflow-scroll ">
          <div className="">
            {postInfo &&
              postInfo.map((post) => (
                <div>
                  <div className=" rounded overflow-hidden shadow-md px-4 py-4">
                    <div className=" py-4">
                      <div className="flex items-center">
                        <img
                          src="https://pixlr.com/images/index/remove-bg.webp"
                          className="w-11 h-11 rounded-full"
                        />
                        <div className="font-semibold text-md mb-2">
                          The Coldest Sunset
                        </div>
                      </div>

                      <p className="text-gray-700 text-base">
                        {post?.description}
                      </p>
                    </div>
                    <div>
                      <img
                        className="rounded-md"
                        src={post.images[tab]?.download_url}
                      />
                    </div>

                    <div className="flex border-[1px] border-gray-200 mt-2 overflow-x-auto ">
                      {post.images &&
                        post.images.map((image, index) => (
                          <img
                            src={image?.download_url}
                            className={`image-thamb h-24 w-24 px-2 py-2 rounded-sm  ${isActive(
                              index
                            )} `}
                            style={{ padding: "5px", cursor: "pointer" }}
                            onClick={() => setTab(index)}
                          />
                        ))}
                    </div>
                    <div className="flex justify-around">
                      <div className="flex px-4 place-items-end">
                        <LikeOutlined
                          className={`text-2xl cursor-pointer ${
                            active ? "text-blue-800" : "text-gray-400"
                          }`}
                          onClick={handleClick}
                        />
                        <p>12</p>
                      </div>
                      <div className="flex px-4 place-items-end">
                        <CommentOutlined className="text-2xl cursor-pointer" />
                        <p>9</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="w-80 md:flex hidden">
          <RightBar />
        </div>
      </div>
      <MobileNav />
    </div>
  );
}
