const connectionURI = ( username, password, database ) => {
  return `mongodb+srv://${ username }:${ password }@customyums.pbxvv0y.mongodb.net/${ database }?retryWrites=true&w=majority`;
}

const dbTables = Object.freeze({
  USER: 'users',
  PANTRY: 'pantries',
  DIETARY: 'dietaries'
})

export {
  connectionURI,
  dbTables
};