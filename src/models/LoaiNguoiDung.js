import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class LoaiNguoiDung extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    maLoaiNguoiDung: {
      type: DataTypes.STRING(25),
      allowNull: false,
      primaryKey: true
    },
    tenLoaiNguoiDung: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'LoaiNguoiDung',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "maLoaiNguoiDung" },
        ]
      },
    ]
  });
  }
}
