const util = require( 'util' );
const mysql = require( 'mysql' );


// const config = {
//   host: 'localhost',
//   port: '3306',
//   user: 'markd88',
//   password: 'markd88',
//   database: 'product_carbon_footprint',
// }

const config = {
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'admin123',
  database: 'my_db',
}

function makeDb( config ) {
  const connection = mysql.createPool( config );
  return {
    query( sql, args ) {
      return util.promisify( connection.query )
        .call( connection, sql, args );
    },
    // close() {
    //   return util.promisify( connection.end ).call( connection );
    // }
  };
}
const db = makeDb(config)
module.exports = db
