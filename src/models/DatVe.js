import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class DatVe extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    taiKhoan: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'NguoiDung',
        key: 'taiKhoan'
      }
    },
    maLichChieu: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'LichChieu',
        key: 'maLichChieu'
      }
    },
    maGhe: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Ghe',
        key: 'maGhe'
      }
    }
  }, {
    sequelize,
    tableName: 'DatVe',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "taiKhoan" },
          { name: "maLichChieu" },
          { name: "maGhe" },
        ]
      },
      {
        name: "FK_DV_LC",
        using: "BTREE",
        fields: [
          { name: "maLichChieu" },
        ]
      },
      {
        name: "FK_DV_G",
        using: "BTREE",
        fields: [
          { name: "maGhe" },
        ]
      },
    ]
  });
  }
}
