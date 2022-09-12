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
                key={item.id}
                size={size}
                poster={item.backdrop_path}
                title={item.original_name || item.original_title}
                genre={item.genre_ids}
                overview={item.overview}
                release_date={item.release_date}
                vote_average={item.vote_average}
                vote_count={item.vote_count}
              />
            );
          })}
        </ScrollContainer>
      </div>
    </>
  );
}
export default Row;
