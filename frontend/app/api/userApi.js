import { gql } from "@apollo/client";

const GET_USERS = gql`
  query getUsers {
    users{
      user_id
      username
      password
      createdAt
    }
  }
`;

const GET_USERS_BY_ID = gql`
  query getUserById( $userId: ID! ) {
    user( id: $userId ){
      user_id
      username
      password
      createdAt
    }
  }
`;

const ADD_USER = gql`
  mutation addUser( $input: UserInput! ){
    addUser( input: $input ){
      user_id
      name
      username
      password
      createdAt
    }
  }
`;

const DELETE_USER = gql`
  mutation deleteUser( $deleteUserId: ID! ){
    deleteUser( id: $deleteUserId )
  }
`

export default{
  GET_USERS,
  GET_USERS_BY_ID,
  ADD_USER,
  DELETE_USER
}