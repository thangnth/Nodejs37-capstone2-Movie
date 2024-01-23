import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class NguoiDung extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    taiKhoan: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    hoTen: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: true,
      unique: "email"
    },
    soDT: {
      type: DataTypes.STRING(12),
      allowNull: true
    },
    maLoaiNguoiDung: {
      type: DataTypes.CHAR(12),
      allowNull: true,
      references: {
        model: 'LoaiNguoiDung',
        key: 'maLoaiNguoiDung'
      }
    },
    matKhau: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    accessToken: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'NguoiDung',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "taiKhoan" },
        ]
      },
      {
        name: "email",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "FK_ND_LND",
        using: "BTREE",
        fields: [
          { name: "maLoaiNguoiDung" },
        ]
      },
    ]
  });
  }
}
