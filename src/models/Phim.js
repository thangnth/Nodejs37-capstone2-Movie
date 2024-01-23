import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class Phim extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    maPhim: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    tenPhim: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    biDanh: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    trailer: {
      type: DataTypes.STRING(225),
      allowNull: true
    },
    hinhAnh: {
      type: DataTypes.STRING(225),
      allowNull: true
    },
    moTa: {
      type: DataTypes.STRING(600),
      allowNull: true
    },
    maNhom: {
      type: DataTypes.CHAR(4),
      allowNull: true
    },
    ngayKhoiChieu: {
      type: DataTypes.DATE,
      allowNull: true
    },
    danhGia: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    hot: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    dangChieu: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    sapChieu: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Phim',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "maPhim" },
        ]
      },
    ]
  });
  }
}
