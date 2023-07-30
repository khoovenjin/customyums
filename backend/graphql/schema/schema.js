export const typeDefs = `#graphql
  # Custom-Scalar Type
  scalar Date

  # Query Type (All GET Req)
  type Query {
    dietaries: [Dietary!]!
    dietary( id: ID! ): Dietary
    pantries: [Pantry!]!
    pantry( id: ID! ): Pantry
    users: [User!]!
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

    deleteDietary( id: ID!, input: RecipeInput! ): Boolean!
    deletePantry( id: ID! ): Boolean!
    deleteUser( id: ID! ): Boolean!
  }

  # Custom Types
  type Dietary {
    dietary_id: ID!
    meal: String!
    recipes: [Int!]!
    date: Date!
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
  
  # Custom Inputs (Header & Query)
  input DietaryInput {
    user_id: ID!
    meal: String!
    date: Date!
    recipes: [Int!]!
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
    recipes: Int!
  }
`