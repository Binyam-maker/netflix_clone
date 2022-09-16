import React from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import { wrapper } from "../store";
import { getMyList } from "../features/my-list/myListSlice";
import getList from "../lib/getMyList";
import { useSelector } from "react-redux";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import DetailModal from "../components/DetailModal";

const MyList = () => {
  const { myList } = useSelector((state) => state.myList);
  const { isModalOpen } = useSelector((state) => state.details);

  return (
    <div className="overflow-hidden">
      <Navbar home={true} />
      <div className="absolute top-24 p-8 left-1/2 -translate-x-[50%] w-screen ">
        {/* Title */}
        <h1 className=" text-xl font-bold mb-4 text-center sm:text-left">
          My List
        </h1>
        {/* List Container */}
        {isModalOpen && <DetailModal myListPage={true} />}

        <section className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 place-items-center">
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
                  myListPage={true}
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
    // next-auth
    const session = await unstable_getServerSession(
      context.req,
      context.res,
      authOptions
    );

    // redirect if user is not authenticated
    if (!session) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
    try {
      const uid = session.user.email;
      const myList = await getList(uid);

      myList ? store.dispatch(getMyList(myList)) : undefined;
    } catch (error) {
      console.log(error);
    }
  }
);

export default MyList;
