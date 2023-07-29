export default class utilsController {
  static setDate = ( variable ) => variable.createdAt = 'createdAt' in variable? new Date( variable?.createdAt ) : new Date();
}