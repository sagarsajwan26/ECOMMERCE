import { Seller } from "../models/seller.model.js";

import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { transporter } from "../middleware/nodemail.middleware.js";
import jwt from "jsonwebtoken";
import { EmailVerification } from "../models/emailVerification.model.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import { Product } from "../models/products.model.js";



const generateLoginId=async() =>{
let checkExistingLoginId= false;
let LoginId;
    while(!checkExistingLoginId) {
        const randomId= Math.floor(Math.random() * 1000000);

        const existingUser=await Seller.findOne({LoginId:randomId})

        if(!existingUser) {

            checkExistingLoginId= true;
            LoginId= randomId;
        }

    }
return LoginId;
}




const generateAccessToken = async(id)=>{
    if(!id) return res.status(401).json({message:'error while generating token please try after few minutes'})

        try {
            const user= await Seller.findById(id)
            if(!user) return new Error ('user not found')
                const token = await user.generateAuthToken()

            return token
            } catch (error) {
            console.log(error);
            
        }
}


export const signup = AsyncHandler(async(req,res)=>{    
    const {firstName, lastName, email , password,storeName, contactNumber, address, productCategories, } = req.body 
   


    
const checkExistingAccount = await Seller.findOne({email
})

if(checkExistingAccount) return res.status(401).json({message:"user already exist"})

    if(!firstName.trim() || !email.trim() || !password.trim() || !storeName.trim() || !contactNumber || !address.trim()) {
        return res.status(400).json({ message: "All fields are required" });
    }

const LoginId= await generateLoginId() 


const newSeller= await Seller.create({
    username:{
        firstName:firstName,
        lastName:lastName
    },
    email,
    password,
    storeName,
    contactNumber,
    address,
    productCategories,
    LoginId

})
const verifyToken= await jwt.sign({
   id: newSeller._id
},process.env.JWT_SECRET, {
    expiresIn: '10min'
})


const verifyLink = await EmailVerification.create({
    email: newSeller._id,
    verifyToken: verifyToken ,
    userType:'Seller'
    
})



const mailOptions = {
    from :process.env.EMAIL_USER,
    to:newSeller.email,
    subject:"welcome to our E-commerce platform",
    text:`Hello ${newSeller.firstName},\n\nWelcome to our E-commerce platform! Your account has been successfully created.\n\nYour Login ID is: ${newSeller.LoginId}\n\nThank you for joining us!\n\nBest regards,\nE-commerce Team .click on the link below to verify your email\n\nhttp://localhost:5000/api/v1/seller/verify-email/${verifyToken}`
}




transporter.sendMail(mailOptions,(error, info)=>{
    if(error){
        return console.log(error);
        
    }
    console.log('email sent' + info.response);
    
})


if(!newSeller) return res.status(401).json({
    message:"internal server error while creating your seller account"
})



return res.status(200).json(new ApiResponse(200,{newSeller},'successfully created account please verify your gmail ID') )


})

export const verifyEmail= AsyncHandler(async(req,res)=>{
const {verifyToken}= req.params
    if(!verifyToken) return res.status(400).json({message:"token is required"}) 
        const checkToken = await EmailVerification.findOne({
            verifyToken
        }).populate('email','email username') 
            
            

        if(!checkToken) return res.status(400).json({message:'invalid token or token expired'})
        
            const seller=await Seller.findOne({email:checkToken.email.email})
            if(!seller) return res.status(404).json({
                message:"seller not found"
            })
            seller.isEmailVerified= true
            await seller.save()
            await EmailVerification.findByIdAndDelete(checkToken._id)
            res.redirect('/')
            // return res.status(200).json({message:"email verified Successfully"})
})


export const loginSeller= AsyncHandler(async(req,res)=>{

    const {email, password} = req.body
    if(!email.trim() || !password.trim()) {
        return res.status(400).json({ message: "All fields are required" });
    }
        const existingSeller= await Seller.findOne({email}).select("+password")
        if(!existingSeller) return res.status(401).json({message:"user not found"})

                const checkBlocked= existingSeller.isBlocked  
                if(checkBlocked) return res.status(401).json({message:"your account has been blocked please contact to our branch for more details"})

            const checkVerified=  existingSeller.isEmailVerified 
            if(!checkVerified){
                return res.status(401).json({message:"you must verify your email to login"})
            } 

        

               

            const isPasswordMatch = await existingSeller.comparePassword(password)
            if(!isPasswordMatch) {
                return res.status(401).json({message:"you are not authorize"})
                
            }
       
          
            const token = await generateAccessToken(existingSeller._id)
            if(!token) return res.status(401).json({message:"error while generating token please try after few minutes"})
          

              return res.status(200).cookie('sellerToken',token,{
                maxAge: 24 * 60 * 60 * 1000,
                secure: process.env.NODE_ENV === "production",
                httpOnly: true,
         
              }).json(new ApiResponse
                (200,{existingSeller,token},'successfully logged in'))
              

})


export const logoutSeller= AsyncHandler(async(req,res)=>{

    return res.status(200).cookie('sellerToken','').json({message:"successfully logged out"})

})



export const getSellerProfile= AsyncHandler(async(req,res)=>{
   
    return res.status(200).json(new ApiResponse(200, {seller:req.seller},'successfully fetched seller profile'))
})



export const addProduct= AsyncHandler(async(req,res)=>{
    const {title, description,  category, price, discount, stock, publish}=req.body
   
  
    const images= req.files
    

    if(!title.trim()|| !description.trim() || !category.trim() || !price || !stock ) return res.status(404).json({message:'fields cannot be empty'})
       
        
       if(images.length<2) return res.status(401).json({message:"minimum 3 images are required"}) 

      const productImage=await Promise.all(  images.map(async(item)=> {
            const uploadImg=await uploadToCloudinary(item.path)
        return uploadImg.secure_url
            
        }))

        const newProduct=await Product.create({
            sellerId : req.seller._id,
            title,
            description,
            category:category.split(','),
            price:parseFloat(price),
            stock:parseInt(stock),
          images: productImage,

            isPublished: publish? publish:false

        })

        req.seller.currentSellingProducts.push(newProduct._id)
        await req.seller.save()
        
        if(!newProduct) return res.status(500).json({message:'product creation failed due to internal server'})
         return res.status(201).json(new ApiResponse(201,newProduct,`product uploaded ,${newProduct.isPublished?"your product is now listed ":" you can now list your product "} `))

})

export const getAllProductsList= AsyncHandler(async(req,res)=>{
    const seller= await Seller.findById(req.seller._id)

    const products = await Promise.all(seller.currentSellingProducts.map(async(item)=>{
      const productDetail= await Product.findById(item)
        return productDetail
    }))


    if(!products) return res.status(401).json({message:"unable to fetch data internal server error"})
        return res.status(200).json(new ApiResponse(200,{products},'products listed'))
    })



    export const updateProduct= AsyncHandler(async(req,res)=>{
const {id:productId}= req.params

console.log('update');


if(!productId) return res.status(400).json({message:"product id is required"})
        const {title, description,  category, price, discount, stock, publish}=req.body
const seller= await Seller.findById(req.seller._id)
if(!seller.currentSellingProducts.map(id => id.toString()).includes(productId)) {
    return res.status(401).json({message:'you are not authorize'});
}

if(!title.trim()|| !description.trim() || !category.trim() || !price || !stock ) return res.status(404).json({message:'fields cannot be empty'})

        const updatedProduct= await Product.findByIdAndUpdate(productId,{
            title,
            description,
            category:category.split(','),
            price:parseFloat(price),
            stock:parseInt(stock),
            discount,
            isPublished: publish? publish:false
        },{new:true, runValidators:true})
        
        if(!updatedProduct) return res.status(500).json({message:'product update failed due to internal server'})
         return res.status(200).json(new ApiResponse(200,updatedProduct,`product updated`))
    })



    export const deleteProduct= AsyncHandler(async(req,res)=>{

        const {id:productId} = req.params 
        if(!productId) return res.status(404).json({message:"product id not valid"})
            const checkIfProductExist= await Product.findById(productId)
            if(!checkIfProductExist) return res.status(404).json({
                message:"product not found"
            })
            const loggedUser= await Seller.findById(req.seller._id)
        if(!loggedUser.currentSellingProducts.includes(productId))return res.status(401).json({
            message:"you are not authorzie"
        }) 
        await Product.findByIdAndDelete(productId)

        loggedUser.currentSellingProducts= loggedUser.currentSellingProducts.filter(id=> id.toString()!==productId)

       await loggedUser.save()
        return res.status(200).json(new ApiResponse(200,{
           loggedUser
        },'product deleted successfully'))
    })


    export const getOrderList= AsyncHandler(async(req,res)=>{
        const logginSellerId= req.seller.id 
       
        const seller= await Seller.findByIdAndDelete(logginSellerId)
         console.log(seller);
         
    })