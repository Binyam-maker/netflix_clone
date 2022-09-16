import dbConnect from "../../../lib/MongooseConnect";
import Item from "../../../model/ListItem";
import { StatusCodes } from "http-status-codes";

export default async function (req, res) {
  const { uid } = req.query;

  // connect to DB
  await dbConnect();

  // when the req is get send back all save my list items
  if (req.method === "GET") {
    try {
      const myList = await Item.find({ uid: uid });
      // if my list is empty
      if (!myList) {
        res
          .status(StatusCodes.NO_CONTENT)
          .json({ message: "There are no items saved to my list" });
        return;
      }
      res.status(StatusCodes.OK).json({ myList });
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: error });
    }
  }
}
