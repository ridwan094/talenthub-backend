'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class skills extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      skills.belongsToMany(models.talents, {
        through: models.talentSkills,
        foreignKey: `skill_id`,
        otherKey: `talent_id`,
      });
    }
  }
  skills.init({
    skill_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'skills',
  });
  return skills;
};