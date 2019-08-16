const connection = require("./connection");
const { objToSql } = require("../util/helpers.js");

module.exports = {
  selectAll: (table, callback) => {
    const queryString = "SELECT * FROM ??";
    connection.query(queryString, [table], (err, data) => {
      if (err) throw err;
      callback(data);
    });
  },

  selectOne: (table, condition, callback) => {
    const queryString = "SELECT * FROM ?? WHERE ?";
    connection.query(queryString, [table, condition], (err, data) => {
      if (err) throw err;
      callback(data);
    });
  },

  insertOne: (table, columns, values, callback) => {
    const queryString = `INSERT INTO ${table}(${columns.join()}) VALUES ?`;
    connection.query(queryString, [values], (err, data) => {
      if (err) throw err;
      callback(data)
    });
  },

  updateOne: (table, updateVals, conditions, callback) => {
    const queryString = `UPDATE ${table} SET ${objToSql(updateVals)} WHERE ${conditions}`;
    connection.query(queryString, (err, data) => {
      if (err) throw err;
      callback(data)
    })
  },

  delete: (table, conditions, callback) => {
    const queryString = `DELETE FROM ${table} WHERE ${conditions}`;
    connection.query(queryString, (err, data) => {
      if (err) throw err;
      callback(data)
    })
  }
};
