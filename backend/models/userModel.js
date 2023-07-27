import mongoose from "mongoose";

import { dbTables } from "../config/config.js";

const UserSchema = new mongoose.Schema({
  user_id: mongoose.Schema.Types.ObjectId,
  name: String,
  username: String,
  password: String,
  createdAt: Date
}, {
  versionKey: false
})

const User = mongoose.model( dbTables.USER, UserSchema );

export default User;