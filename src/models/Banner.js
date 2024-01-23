import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class Banner extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    maBanner: {
      autoIncrement: true,
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
    hinhAnh: {
      type: DataTypes.STRING(225),
      allowNull: true
    },
    trailer: {
      type: DataTypes.STRING(225),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Banner',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "maBanner" },
        ]
      },
      {
        name: "FK_B_P",
        using: "BTREE",
        fields: [
          { name: "maPhim" },
        ]
      },
    ]
  });
  }
}
