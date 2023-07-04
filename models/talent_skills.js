"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Talent_Skills extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Talent_Skills.belongsTo(models.Talent, { foreignKey: "talent_id" });
      Talent_Skills.belongsTo(models.Skills, { foreignKey: "skill_id" });
    }
  }
  Talent_Skills.init(
    {
      talent_id: DataTypes.INTEGER,
      skill_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Talent_Skills",
    }
  );
  return Talent_Skills;
};
