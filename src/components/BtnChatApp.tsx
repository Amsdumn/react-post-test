import React, { useState } from "react";
import { IoChatbubbleSharp, IoClose } from "react-icons/io5";
import ChatApp from "./ChatApp";

const BtnChatApp: React.FC = () => {
  const [toggle, setToggle] = useState<boolean>(false);
  return (
    <div className="fixed bottom-4 right-4 z-20">
      {toggle && (
        <div className="absolute -top-[25rem] -left-[19rem]">
          <ChatApp />
        </div>
      )}
      <button onClick={() => setToggle(!toggle)} className="rounded-full bg-blue-500 p-4 text-white">
        {!toggle ? (
          <IoChatbubbleSharp className="text-xl" />
        ) : (
          <IoClose className="text-xl" />
        )}
      </button>
    </div>
  )
}

export default BtnChatApp;