import { Schema, model, models } from "mongoose";
import validator from "validator";
import { hash, genSalt, compare } from "bcrypt";

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    minLength: [3, "Name can not be less than 3 characters"],
    maxLength: [50, "Name can not be less than 3 characters"],
  },
  email: {
    type: String,
    required: [true, "Please provide name"],
    minLength: [3, "email can not be less than 3 characters"],
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valid email",
    },
  },

  password: {
    type: String,
    required: [true, "Please provide a valid password"],
    minLength: [6, "Password can not be less than 6 characters"],
  },
});

// hash password
UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await genSalt(10);
  this.password = await hash(this.password, salt);
});

// compare passwords
UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await compare(candidatePassword, this.password);

  return isMatch;
};

export default models.User || model("User", UserSchema);
