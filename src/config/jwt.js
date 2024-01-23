import jwt from "jsonwebtoken";					
 					
export const createToken = (data)=>{					
let token = jwt.sign({data},"BIMAT",{algorithm : "HS256", expiresIn : "10m"})					
return token;					
}					
					
export const createRefToken = (data)=>{					
let token = jwt.sign({data}, "KO_BIMAT", {algorithm : "HS256" , expiresIn : "10d"})					
return token;					
}	

export const decodeToken = (token)=>{
    return jwt.decode(token)
}
export const checkToken = (token)=>{
     jwt.verify(token, "BIMAT", (error, decoded)=> {
    return error
    })
}

export const verifyToken = (req, res, next )=>{
    let {token} = req.headers;
    let check = checkToken(token);
    if(check == null){  
    //Check token hợp lệ 
      next()
  } else   {
    res.status(401).send(check.message)
  }
}