import { GraphQLError } from 'graphql';

import { payloadChecker } from './payloadChecker.js';

class restAPI {
  static validateReqParamsId = ( req, res, next ) => {
    const id = req.params.id;

    if( payloadChecker.typeChecker( true, id, "id" ) )
      return res.status( 400 ).send({ error: `The request parameter of 'id' type is invalid.` })

    next();
  }

  static validateReqPayload = ( entity ) => ( req, res, next ) => {
    const entitySchema = entity in payloadChecker.external_schema?
      payloadChecker.external_schema[ entity ] : payloadChecker.schema[ entity ];
    const schemaEntries = Object.entries( entitySchema );
    const schemaKeys = Object.keys( entitySchema );
    const payloadKeys = Object.keys( req.body );

    // Check for NULL payload
    if( !payloadKeys.length )
      return res.status( 400 ).send({ error: `The request payload is invalid or empty.` })

    // Check for Invalid properties
    for( const key of payloadKeys )
      if( !schemaKeys.includes( key ))
        return res.status( 400 ).send({ error: `The property of '${ key }' is invalid.` })
    
    for( const [ key, value ] of schemaEntries ) {
      // Check for Required properties
      if( value.isRequired && !payloadKeys.includes( key ) )
        return res.status( 400 ).send({ error: `The request payload requires a '${ key }' property.` })
      
      // Check for data-type
      if( key in req.body && payloadChecker.typeChecker( true, req.body[ key ], value.type ))
        return res.status( 400 ).send({ error: `The data type of '${ key }' property is incorrect.` })
    }

    next();
  }

  static validateReqQuery = ( entity ) => ( req, res, next ) => {
    const entitySchema = entity in payloadChecker.external_schema?
      payloadChecker.external_schema[ entity ] : payloadChecker.schema[ entity ];
    const schemaEntries = Object.entries( entitySchema );
    const schemaKeys = Object.keys( entitySchema );
    const queryKeys = Object.keys( req.query );

    // Check for Invalid properties
    for( const key of queryKeys )
      if( !schemaKeys.includes( key ))
        return res.status( 400 ).send({ error: `The query of '${ key }' is invalid.` })
    
    for( const [ key, value ] of schemaEntries ) {
      // Check for Required properties
      if( value.isRequired && !queryKeys.includes( key ) )
        return res.status( 400 ).send({ error: `The request query requires a '${ key }' property.` })
      
      // Check for data-type
      if( key in req.body && payloadChecker.typeChecker( true, req.body[ key ], value.type ))
        return res.status( 400 ).send({ error: `The data type of '${ key }' query is incorrect.` })
    }

    next();
  }
}

class graphQL {
  // For reference on GraphQL built-in error codes
  static error_code = {
    GRAPHQL_PARSE_FAILED: 'Syntax Error.',
    GRAPHQL_VALIDATION_FAILED: 'Mismatch Schema.',
    BAD_USER_INPUT: 'Invalid Field Argument.',
    PERSISTED_QUERY_NOT_FOUND: 'Query not found in APQ Cache.',
    PERSISTED_QUERY_NOT_SUPPORTED: 'Server disabled APQ.',
    OPERATION_RESOLUTION_FAILURE: 'Resolve Operation Error.',
    BAD_REQUEST: 'Invalid Query.',
    INTERNAL_SERVER_ERROR: 'Internal Error.'
  };

  // Create custom chain-function to addResolver as Middleware
  static createResolver = ( resolver ) => {
    const parentResolver = resolver;
    
    parentResolver.createResolver = ( childResolver ) => {
      const newResolver = async ( parent, args, context, info ) => {
        await resolver( parent, args, context, info );
        return childResolver( parent, args, context, info );
      }

      return this.createResolver( newResolver );
    }

    return parentResolver;
  }

  static customGraphQLError = (
    message = 'Default GraphQL Error',
    code = 'CUSTOM_ERROR',
    status = 400,
    headers
  ) => {
    throw new GraphQLError( message, {
      extensions: {
        code: code,
        http: {
          status: status,
          headers: headers
        }
      }
    })
  }

  static validateReqParamsId = this.createResolver(( parent, { id }, context ) => {
    if( payloadChecker.typeChecker( true, id, "id" ) )
      this.customGraphQLError(
        `The request parameter of 'id' type is invalid.`,
        'BAD_USER_INPUT',
        400,
        payloadChecker.httpStatusCode[400]
      )
  })

  static validateReqPayload = ( entity ) => this.createResolver(( parent, { input }, context ) => {
    const schemaEntries = Object.entries( payloadChecker.schema[ entity ] );
    const schemaKeys = Object.keys( payloadChecker.schema[ entity ] );
    const payloadKeys = Object.keys( input );

    // Check for NULL payload
    if( !payloadKeys.length )
      this.customGraphQLError(
        `The request payload is invalid or empty.`,
        'BAD_USER_INPUT',
        400,
        payloadChecker.httpStatusCode[400]
      )

    // Check for Invalid properties
    for( const key of payloadKeys )
      if( !schemaKeys.includes( key ))
        this.customGraphQLError(
          `The property of '${ key }' is invalid.`,
          'BAD_USER_INPUT',
          400,
          payloadChecker.httpStatusCode[400]
        )
            
    for( const [ key, value ] of schemaEntries ) {
      // Check for Required properties
      if( value.isRequired && !payloadKeys.includes( key ) )
        this.customGraphQLError(
          `The request payload requires a '${ key }' property.`,
          'BAD_USER_INPUT',
          400,
          payloadChecker.httpStatusCode[400]
        )

      // Check for data-type
      if( key in input && payloadChecker.typeChecker( true, input[ key ], value.type )) {
        this.customGraphQLError(
          `The data type of '${ key }' property is incorrect.`,
          'BAD_USER_INPUT',
          400,
          payloadChecker.httpStatusCode[400]
        )
      }
    }
  })

  static validateReqQuery = ( entity ) => this.createResolver(( parent, args, context ) => {
    if( 'query' in args && Object.keys( args.query ).length ) {
      const querySchemaEntries = Object.entries( payloadChecker.query_schema[ entity ] );
      const querySchemaKeys = Object.keys( payloadChecker.query_schema[ entity ] );
      const queryKeys = Object.keys( args.query );
  
      // Check for Invalid properties
      for( const key of queryKeys )
        if( !querySchemaKeys.includes( key ))
          this.customGraphQLError(
            `The query of '${ key }' is invalid.`,
            'BAD_USER_INPUT',
            400,
            payloadChecker.httpStatusCode[400]
          )
              
      for( const [ key, value ] of querySchemaEntries ) {
        // Check for Required properties
        if( value.isRequired && !queryKeys.includes( key ) )
          this.customGraphQLError(
            `The request query requires a '${ key }' property.`,
            'BAD_USER_INPUT',
            400,
            payloadChecker.httpStatusCode[400]
          )
  
        // Check for data-type
        if( key in args.query && payloadChecker.typeChecker( true, args.query[ key ], value.type )) {
          this.customGraphQLError(
            `The data type of '${ key }' query is incorrect.`,
            'BAD_USER_INPUT',
            400,
            payloadChecker.httpStatusCode[400]
          )
        }
      }
    }
  })

  static resolveQueryError = ( error ) => {
    if( error.extensions?.code === 'GRAPHQL_VALIDATION_FAILED' ) {
      return {
        message: 'Invalid GraphQL request.',
        code: payloadChecker.httpStatusCode[400],
        statusCode: 400
      };
    }

    return error;
  }
}

export{
  restAPI,
  graphQL
}