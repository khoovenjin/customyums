export class payloadChecker {
  static typeChecker = (
    isInverse = false,
    variable,
    type
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
      object: () => typeof variable === 'object' && !Array.isArray( variable ) && variable !== null
    };
  
    const expression = typeExpression[ type ]();
    
    if( isInverse ) return !expression;
  
    return expression;
  }
}