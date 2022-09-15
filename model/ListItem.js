import { Schema, model, models } from "mongoose";

const ItemSchema = new Schema({
  uid: String,
  poster: String,
  title: String,
  overview: String,
  genre: Array,
  release_date: String,
  vote_average: String,
  vote_count: String,
});

export default models.Item || model("Item", ItemSchema);
