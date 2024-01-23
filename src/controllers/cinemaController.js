import initModels from "../models/init-models.js";			
import sequelize from "../models/connect.js";			
//import { Sequelize } from "sequelize";			
//import {decodeToken} from "../config/jwt.js"			
import {responseData} from "../config/response.js"			
 			
const model = initModels(sequelize);	
//Lấy thông tin hệ thống rạp
export const getCinemaSystemInfo = async (req, res)=>{
    try {
        const {systemId} = req.params;
        const data = await model.HeThongRap.findAll({
            where : {
                maHeThongRap : systemId
            }
        })
        responseData(res, "Thành Công!", data, 200);
    } catch(error) {
        responseData(res, "Không thành công !", error.message, 500)
    }
}	

//Lấy danh sách hệ thống rạp
export const getCinemaSystemList = async (req, res ) => {			
try { 	
    const data = await model.HeThongRap.findAll();		
    responseData(res, "Thành công!",data , 200); 
} catch (error) {
    responseData(res, "Lỗi 500!", error , 500); 
 }	
}		

//Lấy thông tin cụm rạp theo hệ thống rạp
export const getCinemasBySystem = async (req, res ) => {			
    try { 	
        const {systemId} = req.params
        const data = await model.CumRap.findAll({
            where : {
                maHeThongRap : systemId,
            }, 
            include : ["RapPhims"]
        });		
        responseData(res, "Thành công!",data , 200); 
    } catch (error) {
        responseData(res, "Lỗi 500!", error.message , 500); 
     }	
    }	



