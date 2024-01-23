import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import bcrypt from "bcrypt";
import { responseData } from "../config/response.js"
import { createRefToken, createToken, decodeToken} from "../config/jwt.js";

let model = initModels(sequelize);

export const signUpAdmin = async (req, res)=>{
try{
const {taiKhoan, hoTen, email, soDT, matKhau}= req.body;
const checkTaiKhoan = await model.NguoiDung.findOne({
    where : {
            taiKhoan,
    }
})
if(checkTaiKhoan){
responseData(res, "Tài Khoản đã tồn tại", checkTaiKhoan, 400); 
return;
}
const checkEmail = await model.NguoiDung.findOne({
    where : {
    email,
    }
})
if(checkEmail){
    responseData (res, "Email đã tồn tại", checkEmail, 400);
}

const newData = {
taiKhoan,
hoTen,
email,
soDT,
maLoaiNguoiDung : "Admin", 
matKhau : bcrypt.hashSync(matKhau, 10),
accessToken : "",
}

await model.NguoiDung.create(newData)
responseData (res, "Đăng ký Admin thành công", newData, 200);
}catch (error){
    responseData (res, "Lỗi 500", error, 500);
}
}
export const signUpKhachHang = async (req, res)=>{
    try{
    const {taiKhoan, hoTen, email, soDT, matKhau}= req.body;
    const checkTaiKhoan = await model.NguoiDung.findOne({
        where : {
                taiKhoan,
        }
    })
    if(checkTaiKhoan){
    responseData(res, "Tài Khoản đã tồn tại", checkTaiKhoan, 400); 
    return;
    }
    const checkEmail = await model.NguoiDung.findOne({
        where : {
        email,
        }
    })
    if(checkEmail){
        responseData (res, "Email đã tồn tại", checkEmail, 400);
    }
    
    const newData = {
    taiKhoan,
    hoTen,
    email,
    soDT,
    maLoaiNguoiDung : "KhachHang", 
    matKhau : bcrypt.hashSync(matKhau, 10),
    accessToken : "",
    }
    
    await model.NguoiDung.create(newData)
    responseData (res, "Đăng ký Khách Hàng thành công", newData, 200);
    }catch (error){
        responseData (res, "Lỗi 500", error, 500);
    }
    }

export const login = async (req, res)=>{		
    try{		
    const {taiKhoan , matKhau} = req.body; 		
            
    const checkUser = await model.NguoiDung.findOne({		
        where : {		
             taiKhoan,		
        }		
    })		
    if (checkUser){		
    if(bcrypt.compareSync(matKhau, checkUser.matKhau)){		          
        const key = new Date().getTime(); 		
        const token = createToken({	
            taiKhoan : checkUser.taiKhoan,	
            email : checkUser.email,	
            maLoaiNguoiDung : checkUser.maLoaiNguoiDung,	
            key: key 		
         })		
            
        const refToken = createRefToken({		
            taiKhoan : checkUser.taiKhoan,	
            email : checkUser.email,	
            maLoaiNguoiDung : checkUser.maLoaiNguoiDung,	
            key: key 		
         })		
            
    await model.NguoiDung.update({...checkUser.dataValues, accessToken : refToken},{		
            where : {taiKhoan: checkUser.taiKhoan}		
    });		
    responseData(res, 'login thành công!', token, 200)		
    }		
    }else{		
    res.status(400).send('Tài Khoản hoặc Mật Khẩu người dùng không đúng !')		
    }		
    }catch (error){		
    responseData(res, 'Lỗi server - Error 500!', error.message, 500)	
    }		
}	

export const loginAdmin = async (req, res)=>{		
    try{		
    const {taiKhoan , matKhau} = req.body; 		
            
    const checkUser = await model.NguoiDung.findOne({		
        where : {		
             taiKhoan,	
             maLoaiNguoiDung : "Admin"	
        }		
    })		
    if (checkUser){		
    if(bcrypt.compareSync(matKhau, checkUser.matKhau)){		          
        const key = new Date().getTime(); 		
        const token = createToken({		
            taiKhoan : checkUser.taiKhoan,	
            email : checkUser.email,	
            maLoaiNguoiDung : checkUser.maLoaiNguoiDung,	
            key: key		
         })		
            
        const refToken = createRefToken({		
            taiKhoan : checkUser.taiKhoan,	
            email : checkUser.email,	
            maLoaiNguoiDung : checkUser.maLoaiNguoiDung,	
            key: key		
         })		
            
    await model.NguoiDung.update({...checkUser.dataValues, accessToken : refToken},{		
            where : {taiKhoan: checkUser.taiKhoan}		
    });		
    responseData(res, 'login thành công!', token, 200)		
    }		
    }else{		
    res.status(400).send('Đăng nhập không thành công !, Người dùng không có quyền Admin hoặc tài khoản / mật khẩu không đúng !')		
    }		
    }catch (error){		
    responseData(res, 'Lỗi server - Error 500!', error.message, 500)	
    }		
}	

export const logout = async (req, res) => {
    try {
        const { token } = req.headers;
        const dToken = decodeToken(token);
        const {taiKhoan} = dToken.data
        const getUser = await model.NguoiDung.findOne({
            where: {
                taiKhoan      
            }
        })
    
        await model.NguoiDung.update(
            { ...getUser.dataValues, accessToken: "" }, {
            where: {taiKhoan}
        });
    
        responseData(res, "Logout thành công !","", 200);
    } catch (error ){
        responseData(res, "Không thành công ! - Error 500 ", error.message, 500);
    }
}
