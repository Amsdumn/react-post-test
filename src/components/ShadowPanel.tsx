import React from "react";
import useGlobalStore from "../store/useGlobalStore";

const ShadowPanel: React.FC = () => {
  const { status, setStatus } = useGlobalStore();
  if (status) {
    return (
      <div onClick={() => setStatus(!status)} className="bg-black fixed top-0 left-0 z-30 w-full h-full opacity-85"></div>
    )
  }
}

export default ShadowPanel