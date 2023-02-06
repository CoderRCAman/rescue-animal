import React from "react";
import LeftBar from "../../components/LeftBar";
function index() {
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
            <h2 className="font-semibold text-2xl text-stone-500 ">
              All NGO Details
            </h2>
          </div>
          <div>
            <div className="flex justify-center w-full">
              <div className="m-w-full p-2 ">
                <div className=" flex justify-between border-solid border-2 rounded-md border-stone-300 p-2 px-4 ">
                  <div className="flex max-w-[60%] flex-col flex-1">
                    <div className=" ">
                      <div className="mr-4 font-bold text-stone-400 md:text-lg text-xs">
                        Name:{" "}
                        <span className="font-semibold text-stone-300">
                          Bikrant Nath mskksnakdn Org
                        </span>
                      </div>
                      <div className="  md:text-base text-xs font-bold text-stone-400">
                        Email:{" "}
                        <span className="font-semibold text-stone-300">
                          abcd@gmail.com
                        </span>
                      </div>
                    </div>
                    <div className="">
                      <div className="md:text-base text-xs font-bold text-stone-400 ">
                        Address:{" "}
                        <span className="italic font-semibold text-stone-300">
                          Guwahati jdsadkj ahsdks asdd asdnasdn
                        </span>
                      </div>
                    </div>
                    <div className="mt-auto cursor-pointer">
                      <button className="bg-red-500 rounded-sm p-2 text-white font-semibold hover:bg-red-600">Delete</button>
                    </div>
                  </div>

                  <div className="cursor-pointer image_custom  ">
                    <img
                      className="w-[200px] h-[200px]  relative z-[1] rounded-sm hover:scale-105 ease-in-out duration-300  "
                      src="https://i1.wp.com/www.eventstodayz.com/wp-content/uploads/2018/04/cute-profile-pic-2018.jpg?fit=768%2C768&ssl=1"
                    />
                
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;
