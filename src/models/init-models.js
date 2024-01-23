import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _Banner from  "./Banner.js";
import _CumRap from  "./CumRap.js";
import _DatVe from  "./DatVe.js";
import _Ghe from  "./Ghe.js";
import _HeThongRap from  "./HeThongRap.js";
import _LichChieu from  "./LichChieu.js";
import _LoaiNguoiDung from  "./LoaiNguoiDung.js";
import _NguoiDung from  "./NguoiDung.js";
import _Phim from  "./Phim.js";
import _RapPhim from  "./RapPhim.js";

export default function initModels(sequelize) {
  const Banner = _Banner.init(sequelize, DataTypes);
  const CumRap = _CumRap.init(sequelize, DataTypes);
  const DatVe = _DatVe.init(sequelize, DataTypes);
  const Ghe = _Ghe.init(sequelize, DataTypes);
  const HeThongRap = _HeThongRap.init(sequelize, DataTypes);
  const LichChieu = _LichChieu.init(sequelize, DataTypes);
  const LoaiNguoiDung = _LoaiNguoiDung.init(sequelize, DataTypes);
  const NguoiDung = _NguoiDung.init(sequelize, DataTypes);
  const Phim = _Phim.init(sequelize, DataTypes);
  const RapPhim = _RapPhim.init(sequelize, DataTypes);

  LichChieu.belongsTo(CumRap, { as: "maCumRap_CumRap", foreignKey: "maCumRap"});
  CumRap.hasMany(LichChieu, { as: "LichChieus", foreignKey: "maCumRap"});
  RapPhim.belongsTo(CumRap, { as: "maCumRap_CumRap", foreignKey: "maCumRap"});
  CumRap.hasMany(RapPhim, { as: "RapPhims", foreignKey: "maCumRap"});
  DatVe.belongsTo(Ghe, { as: "maGhe_Ghe", foreignKey: "maGhe"});
  Ghe.hasMany(DatVe, { as: "DatVes", foreignKey: "maGhe"});
  CumRap.belongsTo(HeThongRap, { as: "maHeThongRap_HeThongRap", foreignKey: "maHeThongRap"});
  HeThongRap.hasMany(CumRap, { as: "CumRaps", foreignKey: "maHeThongRap"});
  LichChieu.belongsTo(HeThongRap, { as: "maHeThongRap_HeThongRap", foreignKey: "maHeThongRap"});
  HeThongRap.hasMany(LichChieu, { as: "LichChieus", foreignKey: "maHeThongRap"});
  DatVe.belongsTo(LichChieu, { as: "maLichChieu_LichChieu", foreignKey: "maLichChieu"});
  LichChieu.hasMany(DatVe, { as: "DatVes", foreignKey: "maLichChieu"});
  NguoiDung.belongsTo(LoaiNguoiDung, { as: "maLoaiNguoiDung_LoaiNguoiDung", foreignKey: "maLoaiNguoiDung"});
  LoaiNguoiDung.hasMany(NguoiDung, { as: "NguoiDungs", foreignKey: "maLoaiNguoiDung"});
  DatVe.belongsTo(NguoiDung, { as: "taiKhoan_NguoiDung", foreignKey: "taiKhoan"});
  NguoiDung.hasMany(DatVe, { as: "DatVes", foreignKey: "taiKhoan"});
  Ghe.belongsTo(NguoiDung, { as: "taiKhoanNguoiDat_NguoiDung", foreignKey: "taiKhoanNguoiDat"});
  NguoiDung.hasMany(Ghe, { as: "Ghes", foreignKey: "taiKhoanNguoiDat"});
  Banner.belongsTo(Phim, { as: "maPhim_Phim", foreignKey: "maPhim"});
  Phim.hasMany(Banner, { as: "Banners", foreignKey: "maPhim"});
  LichChieu.belongsTo(Phim, { as: "maPhim_Phim", foreignKey: "maPhim"});
  Phim.hasMany(LichChieu, { as: "LichChieus", foreignKey: "maPhim"});
  Ghe.belongsTo(RapPhim, { as: "maRap_RapPhim", foreignKey: "maRap"});
  RapPhim.hasMany(Ghe, { as: "Ghes", foreignKey: "maRap"});
  LichChieu.belongsTo(RapPhim, { as: "maRap_RapPhim", foreignKey: "maRap"});
  RapPhim.hasMany(LichChieu, { as: "LichChieus", foreignKey: "maRap"});

  return {
    Banner,
    CumRap,
    DatVe,
    Ghe,
    HeThongRap,
    LichChieu,
    LoaiNguoiDung,
    NguoiDung,
    Phim,
    RapPhim,
  };
}
