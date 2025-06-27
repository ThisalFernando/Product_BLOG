const jwt = require("jsonwebtoken");

const auth = (role) => (req, res, next) =>{
    const token = req.header("Authorization");
    if(!token){
        return res.status(401).json({message: "Access Denied"});
    }

    try{
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        req.user = decoded;
        if(role && req.user.role !== role){
            return res.status(403).json({message: "Forbidden"});
        }
        next();
    }catch(err){
        res.status(400).json({message: "Invalid Token"});
    }
};

module.exports = auth;