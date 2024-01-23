import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class RapPhim extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    maRap: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    tenRap: {
      type: DataTypes.STRING(225),
      allowNull: true
    },
    maCumRap: {
      type: DataTypes.STRING(100),
      allowNull: true,
      references: {
        model: 'CumRap',
        key: 'maCumRap'
      }
    }
  }, {
    sequelize,
    tableName: 'RapPhim',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "maRap" },
        ]
      },
      {
        name: "FK_RP_CR",
        using: "BTREE",
        fields: [
          { name: "maCumRap" },
        ]
      },
    ]
  });
  }
}
