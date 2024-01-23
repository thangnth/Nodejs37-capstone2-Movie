import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class CumRap extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    maCumRap: {
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: true
    },
    tenCumRap: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    diaChi: {
      type: DataTypes.STRING(225),
      allowNull: true
    },
    maHeThongRap: {
      type: DataTypes.CHAR(16),
      allowNull: true,
      references: {
        model: 'HeThongRap',
        key: 'maHeThongRap'
      }
    }
  }, {
    sequelize,
    tableName: 'CumRap',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "maCumRap" },
        ]
      },
      {
        name: "FK_CR_HTR",
        using: "BTREE",
        fields: [
          { name: "maHeThongRap" },
        ]
      },
    ]
  });
  }
}
