import Security from "../security/index.js";

export default class utilsController {
  static setDate = ( variable ) => variable.createdAt = 'createdAt' in variable? new Date( variable?.createdAt ) : new Date();

  static setCompleted = ( variable ) => variable.isCompleted = 'isCompleted' in variable? variable?.isCompleted : false;

  static hashPassword = ( variable ) => {
    if( 'password' in variable )
      variable.password = Security.hash( variable.password );
  }
}