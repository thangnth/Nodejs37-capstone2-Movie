import initModels from "../models/init-models.js";			
import sequelize from "../models/connect.js";		
import { Sequelize, Op } from "sequelize";			
import {decodeToken} from "../config/jwt.js"			
import {responseData} from "../config/response.js"			
 			
const model = initModels(sequelize);		
//Lấy danh sách banner 
export const getBanners = async (req, res) =>{
 try {
    const data = await model.Banner.findAll()
    responseData(res, "Thành Công", data, 200)
 } catch(error){
    responseData(res, "Không Thành Công - Error 500", error.message, 500)
 }
}

//Post Banner
export const postBanner = async (req, res) =>{
    try {
        const {token} = req.headers;
        const dToken = decodeToken(token);
        if(dToken.data.maLoaiNguoiDung !== 'Admin'){
            responseData(res, "Người dùng không phải Admin", dToken.data, 200)
        } else {
            const {maPhim} = req.body;
            const getMovie = await model.Phim.findOne({
                where : {
                    maPhim
                },
            })
            if(!getMovie){
            responseData(res, "Phim này chưa được cập nhật trong bảng phim", "", 200)
            }else{
                const data = {
                    maPhim,
                    hinhAnh : getMovie.dataValues.hinhAnh,
                    trailer : getMovie.dataValues.trailer
                }
                await model.Banner.create(data)
                responseData(res, 'Thành công!', data, 200)
            }

        }
    } catch (error){
        responseData(res, 'Không Thành công!', error.message, 200)
    }
    }
//Lấy danh sách phim
export const getMovies = async (req, res ) => {			
try { 	
    const data = await model.Phim.findAll();		
    responseData(res, "Thành công!",data , 200); 
} catch (error) {
    responseData(res, "Lỗi 500!", error , 500); 
 }	
}	
// Lấy danh sách phim phân trang
export const getMoviesByPage = async (req, res)=>{		
    try{		
    const {page} = req.params		
    const pageSize = 3		
    const index = (page - 1)*pageSize		
    const dataCount = await model.Phim.count()		
    const totalPage = Math.ceil(dataCount / pageSize)		
    const data = await model.Phim.findAll({		
    offset : index,		
    limit : pageSize		
    })		
    responseData(res, "Thành công!", {data , totalPage} , 200);
    }catch (error){		
    responseData(res, "Lỗi 500!", error , 500);
    }		
    }		

// Lấy danh sách phim theo ngày
export const getMoviesByDate = async (req, res)=>{		
    try{		
        const {tenPhim, tuNgay, denNgay} = req.body
        const {page} = req.params	
        const pageSize = 3		
        const index = (page - 1)*pageSize		
        const dataCount = await model.Phim.count({
            where : {
                tenPhim,
                ngayKhoiChieu: {
                    [Op.gte]: tuNgay,
                    [Op.lte]: denNgay,
                  },
            }
        })		
        const totalPage = Math.ceil(dataCount / pageSize)		
        const data = await model.Phim.findAll({
        where : {
            tenPhim,
            ngayKhoiChieu: {
                [Op.gte]: tuNgay,
                [Op.lte]: denNgay,
              },
        },
        offset : index,		
        limit : pageSize		
        })		
        responseData(res, "Thành công!", {data , totalPage} , 200);
        }catch (error){		
        responseData(res, "Lỗi 500!", error , 500);
        }		
        }
// Lấy chi tiết phim theo maPhim 
export const getMovieById = async (req, res)=>{
    try {
        const {maPhim} = req.params 
        const data = await model.Phim.findOne({
            where : {
                maPhim,
            }
        })
        responseData(res, "Thành công !", data , 200);
    }
    catch (error) {
        responseData(res, "Không thành công ! Lỗi 500!", error.message , 500);
    }
}
// Post movie 
export const postMovie = async (req, res) => {
    try {
        const {token} = req.headers;
        const dToken = decodeToken(token);
        if(dToken.data.maLoaiNguoiDung !== 'Admin'){
            return responseData(res, "Người dùng không phải Admin!", dToken.data, 200);
        } else {
            const {
                maPhim, 
                tenPhim, 
                biDanh, 
                trailer, 
                hinhAnh, 
                moTa, 
                maNhom, 
                ngayKhoiChieu,
                danhGia,
                hot,
                dangChieu,
                sapChieu
            } = req.body;
        const checkMovie = await model.Phim.findOne({
                where : {
                    maPhim
                }
           })
        if (checkMovie){
            return responseData(res, "Mã Phim đã có trên hệ thống !", ['Ma Phim : ' + checkMovie.maPhim, 'Ten Phim : ' + checkMovie.tenPhim], 200);
            }else {
                const newData = {
                    maPhim, 
                    tenPhim, 
                    biDanh, 
                    trailer, 
                    hinhAnh, 
                    moTa, 
                    maNhom, 
                    ngayKhoiChieu,
                    danhGia,
                    hot,
                    dangChieu,
                    sapChieu
                }
                await model.Phim.create(newData);
                responseData(res, "Cập Nhật Phim Mới Thành Công", newData, 200);
            }
            }
            }
        catch (error){
            responseData(res, "Không thành công ! Error 500", error.message, 500);
    }
};
// Chỉnh sửa phim
export const updateMovie = async (req, res) => {
    try {
      const { token } = req.headers;
      const dToken = decodeToken(token);
      if (dToken.data.maLoaiNguoiDung !== 'Admin') {
        return responseData(res, "Người dùng không phải Admin!", dToken.data, 200);
      } else {
        const {
          maPhim,
          tenPhim,
          biDanh,
          trailer,
          hinhAnh,
          moTa,
          maNhom,
          ngayKhoiChieu,
          danhGia,
          hot,
          dangChieu,
          sapChieu
        } = req.body;
  
        const updatedData = {
          tenPhim,
          biDanh,
          trailer,
          hinhAnh,
          moTa,
          maNhom,
          ngayKhoiChieu,
          danhGia,
          hot,
          dangChieu,
          sapChieu
        };
  
        const affectedRows = await model.Phim.update(updatedData, {
          where: {
            maPhim: maPhim
          }
        });
  
        if (affectedRows[0] === 0) {
          return responseData(res, "Không tìm thấy bộ phim để cập nhật!", null, 404);
        }
  
        responseData(res, "Cập nhật phim thành công!", updatedData, 200);
      }
    } catch (error) {
      responseData(res, "Không thành công! Error 500", error.message, 500);
    }
};
// Xoá movie
export const deleteMovie = async (req, res) => {
    try {
        const {token} = req.headers;
        const dToken = decodeToken(token);
        if(dToken.data.maLoaiNguoiDung !== 'Admin'){
            return responseData(res, "Người dùng không phải Admin!", dToken.data, 200);
        } else {
            const {maPhim} = req.params
    
            const movie = await model.Phim.findOne({  
                where : {
                    maPhim,
                }
            });
            if (movie){
                await model.Phim.destroy({
                    where : {
                        maPhim,
                    }
                })
            
                responseData(res, "Đã xoá Phim thành công!", movie, 200);
            }
        }       

} catch (error) {
    responseData(res, "Không thành công ! Error 500", error, 500);
} 
}; 





