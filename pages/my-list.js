import React from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import { wrapper } from "../store";
import { addToMyList } from "../features/my-list/myListSlice";
import getMyList from "../lib/getMyList";
const MyList = () => {
  return (
    <div>
      <Navbar home={true} />
      <div className="absolute top-20 p-8">
        {/* Title */}
        <h1 className=" text-xl font-bold">My List</h1>
        {/* List Container */}

        <section className="grid grid-cols-2 ">
          <Card />
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
