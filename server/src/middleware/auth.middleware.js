import jwt from 'jsonwebtoken';
import { Seller } from '../models/seller.model.js';
import { Admin } from '../models/admin.model.js';
import { User } from '../models/user.model.js';


export const verifySellerToken = async(req,res,next)=>{


  
    const token= req.cookies?.sellerToken || req.headers?.authorization.split(' ')[1]
    
    

    if(!token) return res.status(401).json({message:"unauthorized access"})
        const decoded= jwt.verify(token, process.env.JWT_SECRET)


        
    if(!decoded) return res.status(401).json({message:"unauthorized access"}) 
        const seller= await Seller.findById(decoded.id).select('-password')

    if(!seller) return res.status(404).json({message:"seller not found"})

        req.seller= seller;

    next()
}


export const verifyAdminToken = async(req,res,next)=>{
    const token= req.cookies?.sellerToken || req.headers?.authorization.split(' ')[1]

    if(!token) return res.status(401).json({message:"unauthorized access"})
        const decoded= jwt.verify(token, process.env.JWT_SECRET)

    if(!decoded) return res.status(401).json({message:"unauthorized access"}) 
        const seller= await Admin.findById(decoded.id).select('-password')
    if(!seller) return res.status(404).json({message:"seller not found"})

        req.seller= seller;

    next()
}


export const verifyUserToken = async(req,res,next)=>{
    const token= req.cookies?.userToken || req.headers?.authorization.split(' ')[1]

    if(!token) return res.status(401).json({message:"unauthorized access"})
        const decoded= jwt.verify(token, process.env.JWT_SECRET)

    if(!decoded) return res.status(401).json({message:"unauthorized access"}) 
        const user= await User.findById(decoded.id).select('-password')
    if(!user) return res.status(404).json({message:"seller not found"})

        req.user= user;

    next()
}
