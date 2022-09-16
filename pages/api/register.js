import dbConnect from "../../lib/MongooseConnect";
import User from "../../model/User";
import { StatusCodes } from "http-status-codes";
import createTokenUser from "../../lib/createTokenUser";

export default async function (req, res) {
  const { user } = req.body;

  if (req.method !== "POST") {
    res.status(405).json({ message: "Only POST requests are allowed." });
    return;
  }

  console.log("server", user);

  try {
    // connect to DB
    await dbConnect();

    // check if user already exists
    const alreadyRegistered = await User.findOne({ email: user.email });
    // if already registered
    if (alreadyRegistered) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "This user is already registered" });
    }

    const createdUser = await User.create(user);
    // Remove email and password
    const newUser = createTokenUser(createdUser);

    res.status(StatusCodes.CREATED).json({ success: true, data: newUser });
    return;
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: error });
  }
}
