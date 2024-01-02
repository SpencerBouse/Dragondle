import mongoose, { ConnectOptions } from "mongoose";
import { characterSchema } from "../schema/characterSchema";
import { DATABASE_URL } from "../../config"

mongoose.connect(DATABASE_URL, {} as ConnectOptions)

let db = mongoose.connection;
db.on('error', () =>{
  console.log("Error Occured.")
})

export const Characters = mongoose.model("Characters", characterSchema)