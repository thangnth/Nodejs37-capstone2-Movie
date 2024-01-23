import initModels from "../models/init-models.js";			
import sequelize from "../models/connect.js";		
import { Sequelize, Op, where } from "sequelize";			
import {decodeToken} from "../config/jwt.js"	
import {responseData} from "../config/response.js"		

const model = initModels(sequelize);	

//Lấy lịch chiếu theo maHeThongRap
export const  getShowtimeByCinemaSystem = async (req, res)=>{
    try {
        const {maHeThongRap} = req.params
        const data = await model.LichChieu.findAll({
            where :{
                maHeThongRap
            },
            include : ["maHeThongRap_HeThongRap", "maCumRap_CumRap","maRap_RapPhim", "maPhim_Phim"],

        })
        if (data != ""){
            data.forEach((lichChieu) => {
                const heThongRap = lichChieu.maHeThongRap_HeThongRap; 
                const {maHeThongRap, tenHeThongRap, logo} = heThongRap
                const phim = lichChieu.maPhim_Phim
                const {maPhim, tenPhim, hinhAnh, hot, dangChieu, sapChieu} = phim;
                const {maLichChieu, ngayChieuGioChieu, thoiLuong, giaVe} = lichChieu;
                const cumRap = lichChieu.maCumRap_CumRap; 
                const {maCumRap, tenCumRap, diaChi} = cumRap
                const rapPhim = lichChieu.maRap_RapPhim; 
                const {maRap, tenRap} = rapPhim
             

                responseData(res, "Thành công!", [ {
                    "lstCumRap":[{ 
                        "danhSachPhim" : [{
                            "lstLichChieuTheoPhim" : [{
                                maLichChieu, maRap, tenRap, ngayChieuGioChieu, thoiLuong, giaVe
                            }], maPhim, tenPhim, hinhAnh, hot, dangChieu, sapChieu
                         }], maCumRap, tenCumRap, diaChi}] , maHeThongRap,tenHeThongRap, logo }] , 200);
            } )
       
    } else {
             responseData(res, "Hệ thống rạp chưa cập nhật lịch chiếu !", 'maHeThongRap : '  + maHeThongRap , 200);
    }
    } catch (error){
        responseData(res, "Không thành công! - Error 500 ",error.message , 500);
    }
}

//Lâý lịch chiếu theo maPhim
export const  getShowtimeByMovie = async (req, res)=>{
    try {
        const {maPhim} = req.params
        const data = await model.LichChieu.findAll({
            where : {
                maPhim
            },
            include: ["maCumRap_CumRap"],
        })
        if (data != ""){
            responseData(res, "Thành công!", data , 200);
    } else {
             responseData(res, "Phim này chưa có lịch chiếu !", 'maPhim : '+ maPhim , 200);
    }   
    } catch (error){
        responseData(res, "Không thành công! - Error 500 ",error.message , 500);
    }
}


//Tạo lịch chiếu
export const postShowTime = async (req, res) => {
    try {
        const {token} = req.headers;
        const dToken = decodeToken(token);
        if(dToken.data.maLoaiNguoiDung !== 'Admin'){
            return responseData(res, "Người dùng không phải Admin!", dToken.data, 200);
        } else {
            const {
               maLichChieu, 
               maPhim, 
               maRap,
               ngayChieuGioChieu,
               giaVe,
               thoiLuong
            } = req.body;
            const getCinema = await model.RapPhim.findOne({
                where : {
                    maRap
                }
            })
            const {maCumRap} = getCinema.dataValues
            

            const getSystem = await model.CumRap.findOne({
                where : {
                     maCumRap
                 }
            })
            const {maHeThongRap} = getSystem.dataValues

            const checkShowtime = await model.LichChieu.findAll({
                where : {
                    maRap,
                    ngayChieuGioChieu
                }
        })

        if (checkShowtime != ""){
            return responseData(res, "Trùng lịch chiếu  !", checkShowtime, 200);
            }else {
                const newData = {
                    maLichChieu, 
                    maPhim, 
                    maRap,
                    ngayChieuGioChieu,
                    giaVe,
                    thoiLuong,
                    maCumRap,
                    maHeThongRap
                }
                await model.LichChieu.create(newData);
                responseData(res, "Cập Nhật Lịch Chiếu Thành Công", newData, 200);
            }
            }
            }
        catch (error){
            responseData(res, "Không thành công ! Error 500", error.message, 500);
    }
};

//Lấy danh sách phòng vé
export const getSeats = async (req, res)=>{
    try {
        const {maLichChieu} = req.params;
        const data = await model.Ghe.findAll({
            where :{
                maLichChieu
            },
            include : ["maRap_RapPhim"],
        })
        const getCinema = await model.LichChieu.findOne({
            where : {
                maLichChieu
            }
        })
        const {maCumRap} = getCinema.dataValues
        const cumRap = await model.CumRap.findAll({
            where : {
                maCumRap
            }
        }) 

        if(data==""){
            responseData(res, "Chưa cập nhật danh sách phòng vé cho lịch chiếu " + maLichChieu, data, 200)
        }else{
            responseData(res, "Thành Công !", {data, cumRap} , 200)
        }
    }
    catch (error) {
        responseData(res, "Không Thành Công ! - Error 500", error.message, 500)
    }
}

//Đặt vé 
export const bookSeat = async (req, res)=>{ 
    try{
        const {token} = req.headers;
        const dToken = decodeToken(token)
        const {taiKhoan} = dToken.data
        const {maLichChieu} = req.params;
        const {maGhe} = req.body;
        const getSeat = await model.Ghe.findOne({
            where : {
                maGhe,
                maLichChieu
            }
        })
        if (getSeat.dataValues.daDat == true) {
            responseData(res, "Ghế này đã được đặt, vui lòng chọn ghế khác !", getSeat, 200)
        }else {
            await model.Ghe.update({...getSeat.dataValues, 
                taiKhoanNguoiDat : taiKhoan, 
                daDat: true
            }, {
                where : {
                    maGhe
                }
            }
            )
            const newBooking = {
                taiKhoan,
                maLichChieu,
                maGhe
            }
            await model.DatVe.create(newBooking)
            responseData(res, "Đặt vé Thành Công !", newBooking, 200)
        }
    } catch(error){
        responseData(res, "Không thành công !", error.message, 500)
    }
}

