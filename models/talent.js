"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Talent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Talent.belongsToMany(models.Skills, {
        through: models.Talent_Skills,
        foreignKey: "talent_id",
        as: "skill",
      });
    }
  }
  Talent.init(
    {
      talent_name: DataTypes.STRING,
      talent_image_path: DataTypes.STRING,
      talent_summary: DataTypes.TEXT,
      work_since: DataTypes.DATE,
      education: DataTypes.TEXT,
      cv_file_path: DataTypes.STRING,
      working_status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Talent",
    }
  );
  return Talent;
};
