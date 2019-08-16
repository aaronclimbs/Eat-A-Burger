// @ts-nocheck
const mysql = require("mysql");

// const connection = mysql.createConnection({
//   host: "localhost",
//   port: 3306,
//   user: 'root',
//   password: 'password',
//   database: 'burgers_db',
//   authSwitchHandler: function ({pluginName, pluginData}, cb) {
//     if (pluginName === 'ssh-key-auth') {
//       getPrivateKey(key => {
//         const response = encrypt(key, pluginData);
//         // continue handshake by sending response data
//         // respond with error to propagate error to connect/changeUser handlers
//         cb(null, response);
//       });
//     } else {
//       const err = new Error(`Unknown AuthSwitchRequest plugin name ${pluginName}`);
//       err.fatal = true;
//       cb(err);
//     }
//   }
// })

const connection = mysql.createConnection(process.env.JAWSDB_URL);

connection.connect(err => {
  if (err) throw err;
  console.log(`Connected to database as thread: ${connection.threadId}`);
});

module.exports = connection;
