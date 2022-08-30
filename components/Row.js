import React from "react";
import Card from "./Card";

const Row = ({ title }) => {
  let size = title === "Originals" ? "large" : "small";

  return (
    <div className="w-screen md:ml-4 h-fit">
      <h1 className="font-black text-lg p-2 ">{title}</h1>
      <div className="mx-4 flex gap-4 ">
        <Card size={size} />
        <Card size={size} />
        <Card size={size} />
        <Card size={size} />
      </div>
    </div>
  );
};

export default Row;
