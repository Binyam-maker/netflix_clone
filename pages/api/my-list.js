import dbConnect from "../../lib/MongooseConnect";
import Item from "../../model/ListItem";
import { StatusCodes } from "http-status-codes";

export default async function (req, res) {
  const { item } = req.body;

  // connect to DB
  await dbConnect();

  // when the req is get send back all save my list items
  if (req.method === "GET") {
    try {
      const myList = await Item.find({});
      // if my lis is empty
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

  // if req is post create an item
  if (req.method === "POST") {
    try {
      console.log({ item });
      const newItem = await Item.create(item);
      console.log({ newItem });
      res.status(StatusCodes.CREATED).json({ newItem });
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: error });
    }
  }
}
