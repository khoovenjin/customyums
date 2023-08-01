import { GraphQLScalarType } from "graphql";

import { payloadChecker } from "../../../middleware/payloadChecker.js";

const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  // Executes when sending the response back to the client
  serialize( value ) {
    if( payloadChecker.typeChecker( false, value, 'date' ) ) return value;
    
    return new Date( value );
  },
  // Executes when a custom scalar value is being received from the client
  parseValue( value ) {
    if( payloadChecker.typeChecker( false, value, 'dateFormat' ) ) return value;

    throw new Error('GraphQL Date Scalar parser expected a `Date` object');
  },
  // Executes when a custom scalar value is being used in a GraphQL query
  parseLiteral({ value }) {
    // String to be validated
    return value;
  }
});

export default dateScalar;