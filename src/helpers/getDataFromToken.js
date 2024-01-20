import jwt from "jsonwebtoken";

export default function getDataFromToken(token){
    try{
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        return {_id: decodedToken._id, userType: decodedToken.userType};
    }catch(err){
        console.log(err);
        return err;
    }
}