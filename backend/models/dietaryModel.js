import mongoose from "mongoose";

import { dbTables } from "../config/config.js";

const DietarySchema = new mongoose.Schema({
  
}, {
  versionKey: false
})

const Dietary = mongoose.model( dbTables.Dietary, DietarySchema );

export default Dietary;