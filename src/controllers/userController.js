import initModels from "../models/init-models.js";			
import sequelize from "../models/connect.js";			
import { Sequelize, Op } from "sequelize";			
import {decodeToken, createToken,  createRefToken} from "../config/jwt.js"			
import {responseData} from "../config/response.js"	
import bcrypt from "bcrypt";

const model = initModels(sequelize);	

//Lấy danh sách loại người dùng
export const getUserType = async (req, res ) => {			
    try { 	
        const data = await model.LoaiNguoiDung.findAll();	
        responseData(res, "Thành công!", data , 200); 
    } catch (error) {
        responseData(res, "Không thành công ! Error 500!", error.message , 500); 
     }	
    }
//Lấy danh sách người dùng
export const getUsers = async (req, res ) => {			
    try { 	
        const data = await model.NguoiDung.findAll();	
        responseData(res, "Thành công!", data , 200); 
    } catch (error) {
        responseData(res, "Không thành công ! Error 500!", error.message , 500); 
     }	
    }
//Lấy danh sách người dùng phân trang
export const getUserByPage = async (req, res)=>{		
    try{	
        const {token} = req.headers;
        const dToken = decodeToken(token);
        if(dToken.data.maLoaiNguoiDung !== 'Admin'){
            return responseData(res, "Người dùng không phải Admin!", dToken.data, 200);
        } else {
            const {page} = req.params		
            const pageSize = 20	
            const index = (page - 1)*pageSize		
            const dataCount = await model.NguoiDung.count()		
            const totalPage = Math.ceil(dataCount / pageSize)		
            const data = await model.NguoiDung.findAll({		
            offset : index,		
            limit : pageSize		
            })		
            responseData(res, "Thành công!", {data , totalPage} , 200);
        }
        
        }catch (error){		
        responseData(res, "Không thành công ! Error 500!", error.message , 500);
        }		
    }
// Lấy thông tin người dùng theo taiKhoan
export const getUserprofile = async (req, res)=>{
    try {
        const {token} = req.headers
        const dToken = decodeToken(token)
        const {taiKhoan} = dToken.data
        const data = await model.NguoiDung.findOne({
            where : {
                taiKhoan 
            }
        })
        responseData(res, "Thành công!", data , 200);
    } catch (error) {
        responseData(res, "Không thành công! Error 500 ", "" , 500);
    }

}
// Cập nhật người dùng :
export const updateUser = async (req, res) => {
    try {
      const { token } = req.headers;
      const dToken = decodeToken(token);
      const {taiKhoan} = dToken.data;
     const {hoTen, email, soDT, maLoaiNguoiDung, matKhau} = req.body;
     const key = new Date().getTime(); 		
     const newToken = createToken({	
         taiKhoan,	
         email,
         maLoaiNguoiDung,	
         key: key 		
      })		
         
     const newRefToken = createRefToken({		
        taiKhoan,	
        email,
        maLoaiNguoiDung,	
        key: key 		
      })	
    const updatedData = {
        taiKhoan,
        hoTen,
        email,
        soDT,
        maLoaiNguoiDung,
        matKhau : bcrypt.hashSync(matKhau, 10),
        accessToken : newRefToken
    }
    await model.NguoiDung.update(updatedData, {
        where : {
            taiKhoan
        }
    })
  
    responseData(res, "Cập nhật Người Dùng thành công!", updatedData, 200);
      
    } catch (error) {
      responseData(res, "Không thành công! Error 500", error.message, 500);
    }
};
// Xoá người dùng (user tự xoá)
export const deleteUser = async (req, res) => {
    try {
        const {token} = req.headers;
        const dToken = decodeToken(token);
        const {taiKhoan} = dToken.data;
        const getUser= await model.NguoiDung.findOne({  
                where : {
                    taiKhoan
                }
            });
        if(getUser){
            await model.NguoiDung.destroy({
                    where : {
                        taiKhoan
                    }
                })
            }else {}
                responseData(res, "Đã xoá Người Dùng thành công!", getUser, 200);
            }catch (error) {
                responseData(res, "Không thành công ! Error 500", error.message, 500);
} 
}; 
//Xoá người dùng (admin xoá)
export const deleteUserByAdmin = async (req, res) => {
    try {
        const {token} = req.headers;
        const dToken = decodeToken(token);
        const {taiKhoan} = req.body;
        if(dToken.data.maLoaiNguoiDung !== 'Admin') {
            responseData(res, "Người dùng không phải Admin !", dToken.data, 200 )
        } else {
            const getUser= await model.NguoiDung.findOne({  
                where : {
                    taiKhoan
                }
            });
            if(getUser){
                await model.NguoiDung.destroy({
                    where : {
                        taiKhoan
                    }
                })
                responseData(res, "Đã xoá Người Dùng thành công!", getUser, 200);
            }
        }
    }  catch (error) {
                         responseData(res, "Không thành công ! Error 500", error.message, 500);
                    } 
 };
//Tìm kiếm người dùng 
export const searchUser = async (req, res)=>{
    try {
        const {token} = req.headers;
        const dToken = decodeToken(token);
        const {taiKhoan} = dToken.data;
        const {searchKeyword} = req.body
        const getUser= await model.NguoiDung.findOne({  
                where : {
                    taiKhoan
                }
            });
        if(getUser.dataValues.maLoaiNguoiDung !== 'Admin'){
            responseData(res, "Người dùng không phải Admin! Chức năng này chỉ dành cho Admin", getUser, 200);
            }else {
            const data = await model.NguoiDung.findAll({
                where : {
                    hoten : {
                        [Sequelize.Op.like] : `%${searchKeyword}%`
                    }
                }
            })
            console.log('data', data)
            responseData(res, 'Thành Công!', data, 200)
            }
            
        }catch(error){
            responseData(res, 'Không thành công ! Error - 500', error.message, 500)
        }
}

// Tìm kiếm người dùng phân trang
export const searchUserPagination = async (req, res)=>{
    try {
        const {token} = req.headers;
        const dToken = decodeToken(token);
        const {taiKhoan} = dToken.data;
        const {searchKeyword} = req.body
        const {page} = req.params		
        const pageSize = 10	
        const index = (page - 1)*pageSize		
        const dataCount = await model.NguoiDung.count()		
        const totalPage = Math.ceil(dataCount / pageSize)
        const getUser= await model.NguoiDung.findOne({  
                where : {
                    taiKhoan
                }
            });
        if(getUser.dataValues.maLoaiNguoiDung !== 'Admin'){
            responseData(res, "Người dùng không phải Admin! Chức năng này chỉ dành cho Admin", getUser, 200);
            }else {
                const data = await model.NguoiDung.findAll({
                where : {
                    hoten : {
                        [Sequelize.Op.like] : `%${searchKeyword}%`
                    }
                },
            },
            {
                offset : index,		
                limit : pageSize 
            })
            responseData(res, 'Thành Công!', {data, totalPage}, 200)
            }
            
        }catch(error){
            responseData(res, 'Không thành công ! Error - 500', error.message, 500)
        }
}