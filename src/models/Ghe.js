import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class Ghe extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    maGhe: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    tenGhe: {
      type: DataTypes.CHAR(3),
      allowNull: true
    },
    maRap: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'RapPhim',
        key: 'maRap'
      }
    },
    loaiGhe: {
      type: DataTypes.CHAR(10),
      allowNull: true
    },
    stt: {
      type: DataTypes.CHAR(3),
      allowNull: true
    },
    giaVe: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    daDat: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    taiKhoanNguoiDat: {
      type: DataTypes.STRING(20),
      allowNull: true,
      references: {
        model: 'NguoiDung',
        key: 'taiKhoan'
      }
    },
    maLichChieu: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Ghe',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "maGhe" },
        ]
      },
      {
        name: "FK_G_RP",
        using: "BTREE",
        fields: [
          { name: "maRap" },
        ]
      },
      {
        name: "FK_G_ND",
        using: "BTREE",
        fields: [
          { name: "taiKhoanNguoiDat" },
        ]
      },
    ]
  });
  }
}
