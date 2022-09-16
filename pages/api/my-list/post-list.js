import dbConnect from "../../../lib/MongooseConnect";
import Item from "../../../model/ListItem";
import { StatusCodes } from "http-status-codes";

export default async function (req, res) {
  const { item } = req.body;

  // connect to DB
  await dbConnect();

  // if req is post create an item
  if (req.method === "POST") {
    try {
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
