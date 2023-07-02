'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Skills extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Skills.belongsToMany(models.Talents, { through: 'Talent_Skills', foreignKey: 'skill_id' })
    }
  }
  Skills.init({
    skill_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Skills',
  });
  return Skills;
};