const orm = require('../config/orm');

module.exports = {
  all: function(callback) {
    orm.selectAll("burgers", function(res) {
      callback(res);
    })
  },

  create: function(cols, vals, callback) {
    orm.insertOne("burgers", cols, vals, function(res) {
      callback(res);
    })
  },

  update: function(objColVals, condition, callback) {
    orm.updateOne("burgers", objColVals, condition, function(res) {
      callback(res);
    })
  },
  delete: function(condition, callback) {
    orm.delete(condition, function(res) {
      callback(res);
    })
  },
}