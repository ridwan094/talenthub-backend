'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class seniority extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
       Seniority.hasOne(models.Talent, {
         foreignKey: "seniority_id",
         as: "talent",
       });
    }
  }
  seniority.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'seniority',
  });
  return seniority;
};