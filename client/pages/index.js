import { useEffect,useState } from "react";
import Head from "next/head";
import LeftBar from "../components/LeftBar";
import Navbar from "../components/Navbar";
import RightBar from "../components/RightBar";
import MobileNav from "../components/MobileNav";
import axios from "../axios/index";

export default function Home() {

  const [postInfo, setPostInfo] = useState(null);//stores user information 


  const getPostInfo = async () => {
    try {
      console.log("help");
      const postResponse = await axios.get("http://localhost:5000/api/get", {
        withCredentials: true,
      });
      console.log(postResponse)
      setPostInfo(postResponse.data);
    } catch (error) {
      console.log(error); //hata dio
    }
  };
  useEffect(() => {
    getPostInfo();
    
  }, []); 
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
          {postInfo && postInfo.map((post) => (
            <div>
           
            <div> 
            {post.images && post.images.map((image) =>
              <img src={image?.download_url}  className="h-36 w-36 md:h-44 md:w-44 border"/>             
            )}
          </div>
           
              {post?.description}
            </div>
          ))
            
          }
        </div>
        <div className="w-80 md:flex hidden">
          <RightBar />
        </div>
      </div>
      <MobileNav />
    </div>
  );
}
