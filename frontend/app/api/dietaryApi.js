import { gql } from "@apollo/client";

const GET_DIETARIES = gql`
  query getDietaries( $query: DietaryQuery ) {
    dietaries( query: $query ) {
      dietary_id
      meal
      recipes {
        recipe_id
        title
        description
        image
        tags
        time
        nutrition {
          title
          amount
        }
        ingredients {
          title
          amount
        }
        steps
      }
      date
      isCompleted
    }
  }
`;

const GET_DIETARIES_BY_ID = gql`
  query getDietaryById( $dietaryId: ID! ) {
    dietary( id: $dietaryId ) {
      dietary_id
      meal
      recipes {
        recipe_id
        title
        description
        image
        tags
        time
        nutrition {
          title
          amount
        }
        ingredients {
          title
          amount
        }
        steps
      }
      date
      isCompleted
    }
  }
`;

const ADD_DIETARY = gql`
  mutation addDietary( $input: DietaryInput! ) {
    addDietary( input: $input ) {
      dietary_id
      meal
      recipes
      date
    }
  }
`;

const DELETE_DIETARY = gql`
  mutation deleteDietary( $deleteDietaryId: ID!, $input: DeleteRecipeInput! ) {
    deleteDietary( id: $deleteDietaryId, input: $input )
  }
`;

export default{
  GET_DIETARIES,
  GET_DIETARIES_BY_ID,
  ADD_DIETARY,
  DELETE_DIETARY
}