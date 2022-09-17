import dbConnect from "./MongooseConnect";
import User from "../model/User";

export default async function loginUser(email, password) {
  try {
    // Connect
    await dbConnect();

    const user = await User.findOne({ email: email });

    // handle 'no user found'
    if (!user) {
      return { error: "Email or password does not match our records" };
    }

    // check if password is correct

    const isPasswordCorrect = await user.comparePassword(password);

    // handle 'password is incorrect'
    if (!isPasswordCorrect) {
      return { error: "Email or password does not match our records" };
    }

    return { user };
  } catch (error) {
    return { error: "Something went wrong, please try again" };
  }
}
