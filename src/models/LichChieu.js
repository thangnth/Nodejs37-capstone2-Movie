import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class LichChieu extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    maLichChieu: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    maPhim: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Phim',
        key: 'maPhim'
      }
    },
    maRap: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'RapPhim',
        key: 'maRap'
      }
    },
    ngayChieuGioChieu: {
      type: DataTypes.DATE,
      allowNull: true
    },
    giaVe: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    thoiLuong: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    maCumRap: {
      type: DataTypes.STRING(100),
      allowNull: true,
      references: {
        model: 'CumRap',
        key: 'maCumRap'
      }
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
    tableName: 'LichChieu',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "maLichChieu" },
        ]
      },
      {
        name: "PR_LC_RP",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "maRap" },
          { name: "ngayChieuGioChieu" },
        ]
      },
      {
        name: "FK_LC_P",
        using: "BTREE",
        fields: [
          { name: "maPhim" },
        ]
      },
      {
        name: "FK_LC_FK",
        using: "BTREE",
        fields: [
          { name: "maCumRap" },
        ]
      },
      {
        name: "FK_LC_HTR",
        using: "BTREE",
        fields: [
          { name: "maHeThongRap" },
        ]
      },
    ]
  });
  }
}
