import axios from "axios";

const getMyList = async () => {
  try {
    const resp = await axios.get("/api/my-list");
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};

export default getMyList;
