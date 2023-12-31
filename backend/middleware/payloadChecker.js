import mongoose from "mongoose";

export class payloadChecker {
  // Created for Context
  static httpStatusCode = {
    200: "OK",
    201: "Created",
    204: "No Content",
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    500: "Internal Server Error"
  }

  static schema = {
    user: {
      name: {
        isRequired: true,
        type: 'string'
      },
      username: {
        isRequired: true,
        type: 'string'
      },
      password: {
        isRequired: true,
        type: 'string'
      },
      createdAt: {
        isRequired: false,
        type: 'dateFormat'
      }
    },
    pantry: {
      user_id: {
        isRequired: true,
        type: 'id'
      },
      name: {
        isRequired: true,
        type: 'string'
      },
      amount: {
        isRequired: true,
        type: 'integer'
      }
    },
    dietary: {
      user_id: {
        isRequired: true,
        type: 'id'
      },
      meal: {
        isRequired: true,
        type: 'string'
      },
      date: {
        isRequired: true,
        type: 'dateFormat'
      },
      recipes: {
        isRequired: true,
        type: 'array'
      },
      isCompleted: {
        isRequired: false,
        type: 'boolean'
      }
    },
    recipe: {
      recipes: {
        isRequired: true,
        type: 'integer'
      }
    }
  };

  static query_schema = {
    user: {
      skip: {
        isRequired: false,
        type: 'integer'
      },
      limit: {
        isRequired: false,
        type: 'integer'
      }
    },
    pantry: {
      user_id: {
        isRequired: false,
        type: 'id'
      },
      skip: {
        isRequired: false,
        type: 'integer'
      },
      limit: {
        isRequired: false,
        type: 'integer'
      }
    },
    dietary: {
      user_id: {
        isRequired: false,
        type: 'id'
      },
      gt: {
        isRequired: false,
        type: 'dateFormat'
      },
      gte: {
        isRequired: false,
        type: 'dateFormat'
      },
      lt: {
        isRequired: false,
        type: 'dateFormat'
      },
      lte: {
        isRequired: false,
        type: 'dateFormat'
      },
      isCompleted: {
        isRequired: false,
        type: 'boolean'
      },
      nearest: {
        isRequired: false,
        type: 'boolean'
      },
      skip: {
        isRequired: false,
        type: 'integer'
      },
      limit: {
        isRequired: false,
        type: 'integer'
      }
    }
  }

  static external_schema = {
    // apiGetRecipeMatchByKey
    spoonacular_query_key: {
      key: {
        isRequired: true,
        type: 'string'
      }
    },
    // apiGetRecipeByIngredients
    spoonacular_query_ingredients: {
      ingredients: {
        isRequired: true,
        type: 'string'
      },
      number: {
        isRequired: false,
        type: 'integer'
      }
    },
    spoonacular_query_random: {
      number: {
        isRequired: false,
        type: 'integer'
      }
    }
  }

  static typeChecker = (
    isInverse = false,
    variable,
    type,
    isResponse = false
  ) => {
    const typeExpression = {
      null: () => typeof variable === 'undefined' || variable === null,
      string: () => typeof variable === 'string' || variable instanceof String,
      integer: () => Number.isFinite( variable ),
      boolean: () => typeof variable === 'boolean',
      date: () => variable instanceof Date,
      // ISO 8601 - YYYY - MM - DD
      dateFormat: () => {
        let regex = /^\d{4}-\d{2}-\d{2}$/;

        if( !variable.match( regex ) ) return false;
        
        let date = new Date( variable );
        let dateNum = date.getTime();

        if( !dateNum && dateNum !== 0 ) return false;

        return date.toISOString().slice( 0, 10 ) === variable;
      },
      array: () => Array.isArray( variable ),
      id: () => mongoose.Types.ObjectId.isValid( variable ),
      object: () => typeof variable === 'object' && !Array.isArray( variable ) && variable !== null,
      response: {
        modified: () => variable?.matchedCount && variable?.modifiedCount
      }
    };

    let expression = typeExpression;
    
    if( isResponse ) expression = expression.response

    expression = expression[ type ]();
    
    if( isInverse ) return !expression;

    return expression;
  }
}