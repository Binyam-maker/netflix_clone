import axios from "axios";
import { errorHandler } from "./errorHndler";

const getMyList = async (uid) => {
  try {
    const resp = await axios.get(`http://localhost:3000/api/my-list/${uid}`);
    return resp.data.myList;
  } catch (error) {
    const { status, message } = errorHandler(error);
    console.log({ status, message });
  }
};

export default getMyList;
