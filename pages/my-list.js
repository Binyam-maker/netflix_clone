import React from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import { wrapper } from "../store";
import { addToMyList } from "../features/my-list/myListSlice";
import getMyList from "../lib/getMyList";
import { useSelector } from "react-redux";
const MyList = () => {
  const { myList } = useSelector((state) => state.myList);

  return (
    <div>
      <Navbar home={true} />
      <div className="absolute top-20 p-8">
        {/* Title */}
        <h1 className=" text-xl font-bold">My List</h1>
        {/* List Container */}

        <section className="grid grid-cols-2 ">
          {myList &&
            myList.map((item) => {
              const {
                poster,
                title,
                genre,
                overview,
                release_date,
                vote_average,
                vote_count,
                _id,
              } = item;

              return (
                <Card
                  key={_id}
                  size={"small"}
                  poster={poster}
                  title={title}
                  genre={genre}
                  overview={overview}
                  release_date={release_date}
                  vote_average={vote_average}
                  vote_count={vote_count}
                />
              );
            })}
        </section>
      </div>
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    try {
      const myList = await getMyList();
      myList ? store.dispatch(addToMyList(myList)) : undefined;
    } catch (error) {
      console.log(error);
    }
  }
);

export default MyList;
