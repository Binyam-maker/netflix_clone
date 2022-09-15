import axios from "axios";

const getMyList = async () => {
  try {
    const resp = await axios.get("http://localhost:3000/api/my-list");
    return resp.data.myList;
  } catch (error) {
    console.log(error);
  }
};

export default getMyList;
