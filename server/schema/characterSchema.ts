import mongoose from "mongoose"

export const characterSchema = new mongoose.Schema({
  name: {
    type: String
  },
  image: {
    type: String
  },
  hints: {
    type: Array
  }
})