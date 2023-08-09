export const typeDefs = `#graphql
  # Custom-Scalar Type
  scalar Date

  # Query Type (All GET Req)
  type Query {
    dietaries( query: DietaryQuery ): [Dietary!]!
    dietary( id: ID! ): Dietary
    pantries( query: PantryQuery ): [Pantry!]!
    pantry( id: ID! ): Pantry
    users( query: UserQuery ): [User!]!
    user( id: ID! ): User
  }

  # Mutation Type (All PUT, POST, DELETE Req)
  type Mutation {
    addDietary( input: DietaryInput! ): Dietary!
    addPantry( input: PantryInput! ): Pantry!
    addUser( input: UserInput! ): User!

    updateDietary( id: ID!, input: DietaryInput! ): Boolean!
    updatePantry( id: ID!, input: PantryInput! ): Boolean!
    updateUser( id: ID!, input: UserInput! ): Boolean!

    deleteDietary( id: ID!, input: DeleteRecipeInput! ): Boolean!
    deletePantry( id: ID! ): Boolean!
    deleteUser( id: ID! ): Boolean!
  }

  # Custom Types
  type Dietary {
    dietary_id: ID!
    meal: String!
    recipes: [Recipe!]!
    date: Date!
    isCompleted: Boolean!
    user: User!
  }

  type Pantry {
    pantry_id: ID!
    name: String!
    amount: Float!
    user: User!
  }

  type User {
    user_id: ID!
    name: String!
    username: String!
    password: String!
    createdAt: Date!
    dietaries: [Dietary!]!
    pantries: [Pantry!]!
  }

  type Recipe {
    recipe_id: String!
    title: String!
    description: String!
    image: String!
    tags: [String!]!
    time: Int!
    nutrition: [Nutrition!]!
    ingredients: [Ingredient!]!
    steps: [String!]!
  }

  type Nutrition {
    title: String!
    amount: Float!
    percentageDailyNeed: Float!
  }

  type Ingredient {
    title: String!
    amount: Float!
  }
  
  # Custom Inputs (Header & Body)
  input DietaryInput {
    user_id: ID!
    meal: String!
    date: Date!
    recipes: [RecipeInput!]!
    isCompleted: Boolean
  }

  input PantryInput {
    user_id: ID!
    name: String!
    amount: Float!
  }

  input UserInput {
    name: String!
    username: String!
    password: String!
    createdAt: Date
  }

  input RecipeInput {
    recipe_id: String!
    title: String!
    description: String!
    image: String!
    tags: [String!]!
    time: Int!
    nutrition: [NutritionInput!]!
    ingredients: [IngredientInput!]!
    steps: [String!]!
  }

  input NutritionInput {
    title: String!
    amount: Float!
    percentageDailyNeed: Float!
  }

  input IngredientInput {
    title: String!
    amount: Float!
  }

  input DeleteRecipeInput {
    recipes: Int!
  }

  # Custom Inputs (Query)
  input PantryQuery {
    user_id: ID
    skip: Int
    limit: Int
  }

  input UserQuery {
    skip: Int
    limit: Int
  }

  input DietaryQuery {
    user_id: ID,
    gt: Date,
    gte: Date,
    lt: Date,
    lte: Date,
    isCompleted: Boolean,
    nearest: Boolean,
    skip: Int,
    limit: Int
  }
`