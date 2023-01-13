import React,{useState} from "react";
import {
  HomeOutlined,
  LogoutOutlined,
  SendOutlined,
  UserOutlined,
  WifiOutlined,
} from "@ant-design/icons";
import PostModal from "./PostModal";
export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const onOpenModal = (theDamFankson) => theDamFankson(true); // theDamFankson is variable
  const onCloseModal = (theDamFankson) => theDamFankson(false);
  return (
    <div className="md:hidden flex  justify-between p-2 fixed bottom-0 w-full bg-stone-200 text-pink-400 ">
      <PostModal open={open} onClose={() => onCloseModal(setOpen)} />
      <div className="pb-1">
        <HomeOutlined className="text-2xl  " />
      </div>
      <div className="pb-1">
        <UserOutlined className="text-2xl " />
      </div>
      <div className="pb-1">
        <LogoutOutlined className="text-2xl " />
      </div>
      <div className="pb-2" onClick={() => onOpenModal(setOpen)}>
        <SendOutlined className="text-2xl " />
      </div>
      <div className="pb-2 mr-8"  >
        <WifiOutlined className="text-2xl " />
      </div>
    </div>
  );
}
