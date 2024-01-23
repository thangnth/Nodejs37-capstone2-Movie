import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class HeThongRap extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    maHeThongRap: {
      type: DataTypes.CHAR(16),
      allowNull: false,
      primaryKey: true
    },
    tenHeThongRap: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    biDanh: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    logo: {
      type: DataTypes.STRING(225),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'HeThongRap',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "maHeThongRap" },
        ]
      },
    ]
  });
  }
}
