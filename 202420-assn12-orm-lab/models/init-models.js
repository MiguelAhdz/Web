var DataTypes = require("sequelize").DataTypes;
var _Person = require("./Person");
var _PhoneNumber = require("./PhoneNumber");

function initModels(sequelize) {
  var Person = _Person(sequelize, DataTypes);
  var PhoneNumber = _PhoneNumber(sequelize, DataTypes);

  PhoneNumber.belongsTo(Person, { as: "person", foreignKey: "person_id"});
  Person.hasMany(PhoneNumber, { as: "PhoneNumbers", foreignKey: "person_id"});

  return {
    Person,
    PhoneNumber,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
