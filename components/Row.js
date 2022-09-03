import React from "react";
import Card from "./Card";
import ScrollContainer from "react-indiana-drag-scroll";

function Row({ title, list }) {
  let size = title === "Originals" ? "large" : "small";

  return (
    <>
      <div className="w-screen p-2 h-fit ">
        <h1 className="font-black text-lg p-2 ">{title}</h1>
        <ScrollContainer vertical={false} className="flex gap-4 h-fit md:pl-8">
          {list.map((item) => {
            return (
              <Card
                id={item.id}
                size={size}
                poster={item.backdrop_path}
                title={item.original_name || item.original_title}
                genre={item.genre_ids}
              />
            );
          })}
          <Card id={1} size={size} />
          <Card id={2} size={size} />
          <Card id={3} size={size} />
          <Card id={4} size={size} />
        </ScrollContainer>
      </div>
    </>
  );
}
export default Row;
