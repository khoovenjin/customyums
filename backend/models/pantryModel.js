import mongoose from "mongoose";

import { dbTables } from "../config/config.js";

const PantrySchema = new mongoose.Schema({
  pantry_id: mongoose.Schema.Types.ObjectId,
  name: String,
  amount: mongoose.Schema.Types.Decimal128
}, {
  versionKey: false
})

const Pantry = mongoose.model( dbTables.PANTRY, PantrySchema );

export default Pantry;