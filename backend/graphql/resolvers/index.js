import { QueryResolver as Query } from "./Query.js";
import { MutationResolver as Mutation } from "./Mutation.js";
import { UserResolver as User } from "./User.js";
import { PantryResolver as Pantry } from "./Pantry.js";
import { DietaryResolver as Dietary } from "./Dietary.js";
import dateScalar from "./customs/dateScalar.js";

export const resolvers = {
  Query,
  Mutation,
  User,
  Pantry,
  Dietary,
  Date: dateScalar
}