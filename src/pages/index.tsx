import { Outlet, useModel, useNavigate } from "@@/exports";
import { FloatingBubble } from "antd-mobile";
import shujia_white from "@/assets/shujia-white.svg";
import React from "react";

export default function HomePage() {
  const initialState = useModel("@@initialState");
  console.log(initialState);
  const navigate = useNavigate();
  return (
    <>
      <Outlet />
      <FloatingBubble
        onClick={() => {
          navigate("/shelf");
        }}
        style={{
          overflow: "visible",
          "--initial-position-bottom": "18vh",
          "--initial-position-right": "36px",
          "--edge-distance": "24px",
        }}
      >
        <img src={shujia_white} height={28} />
      </FloatingBubble>
    </>
  );
}
