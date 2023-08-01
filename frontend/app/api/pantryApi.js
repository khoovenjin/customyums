import { gql } from "@apollo/client";

const GET_PANTRIES = gql`
  query getPantries {
    pantries {
      pantry_id
      name
      amount
    }
  }
`;

const GET_PANTRIES_BY_ID = gql`
  query getPantryById( $pantryId: ID! ) {
    pantry( id: $pantryId ) {
      pantry_id
      name
      amount
    }
  }
`;

const ADD_PANTRY = gql`
  mutation addPantry( $input: PantryInput! ){
    addPantry( input: $input ) {
      pantry_id
      name
      amount
    }
  }
`;

const DELETE_PANTRY = gql`
  mutation deletePantry( $deletePantryId: ID! ){
    deletePantry( id: $deletePantryId )
  }
`

export default{
  GET_PANTRIES,
  GET_PANTRIES_BY_ID,
  ADD_PANTRY,
  DELETE_PANTRY
}