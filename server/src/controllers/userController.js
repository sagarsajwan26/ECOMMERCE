import { User } from '../models/user.model.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { AsyncHandler } from '../utils/AsyncHandler.js'
import jwt from 'jsonwebtoken'
import { EmailVerification } from '../models/emailVerification.model.js'
import { transporter } from '../middleware/nodemail.middleware.js'
import { Cart } from '../models/cart.model.js'
import { Product } from '../models/products.model.js'
import { uploadToCloudinary } from '../utils/cloudinary.js'
import Stripe from 'stripe'
import {orderModel} from '../models/order.model.js'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const generateAccessToken = async id => {
    if (!id)
        throw new Error(
            'Error while generating token, please try after few minutes'
        )
    const user = await User.findById(id)
    if (!user) throw new Error('User not found')
    return user.generateAuthToken()
}

export const signupUser = AsyncHandler(async (req, res) => {
    const { username, email, password, contactNumber, address } = req.body
    const checkExistingAccount = await User.findOne({ email })
    if (checkExistingAccount)
        return res.status(409).json({ message: 'User already exists' })
    console.log(req.body)

    if (
        !username?.firstName?.trim() ||
        !email?.trim() ||
        !password?.trim() ||
        !contactNumber ||
        !address?.trim()
    ) {
        return res.status(400).json({ message: 'All fields are required' })
    }



    const newUser = await User.create({
        username: {
            firstName: username.firstName,
            lastName: username.lastName
        },
        email,
        password,
        contactNumber,
        address
    })

    if (!newUser)
        return res
            .status(500)
            .json({
                message: 'Internal server error while creating your user account'
            })
    const userCart = await Cart.create({
        userId: newUser._id
    })

    newUser.cart = userCart._id
    await newUser.save()

    const verifyToken = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: '10min'
    })

    await EmailVerification.create({
        email: newUser._id,
        verifyToken: verifyToken,
        userType: 'User'
    })

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: newUser.email,
        subject: 'Verify your email',
        text: `Hello ${newUser.username.firstName},\n\nPlease verify your email by clicking the link below:\n\nhttp://localhost:5000/api/v1/user/verify-email/${verifyToken}\n\nThis link will expire in 10 minutes.`
    }

    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error)
        } else {
            console.log('Verification email sent: ' + info.response)
        }
    })

    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                { newUser },
                'Successfully created user account please verify your email '
            )
        )
})

export const loginUser = AsyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!email?.trim() || !password?.trim()) {
        return res.status(400).json({ message: 'All fields are required' })
    }
    const findUser = await User.findOne({ email }).select('+password')
    if (!findUser) return res.status(401).json({ message: 'User not found' })
    if (findUser.isBlocked)
        return res
            .status(401)
            .json({
                message:
                    'your account has been blocked please contact our branch for more information'
            })
    if (!findUser.isEmailVerified)
        return res.status(401).json({ message: 'please verify your email first' })

    const isPasswordMatch = await findUser.comparePassword(password)
    if (!isPasswordMatch) {
        return res.status(401).json({ message: 'You are not authorized' })
    }
    const token = await generateAccessToken(findUser._id)
const existingUser = await User.findById(findUser._id)
  .populate({
    path: "cart",
    populate: {
      path: "products.productId", 
      model: "Product"
    }
  })
  .populate("wishList"); 


    return res
        .status(200)
        .cookie('userToken', token, {
            maxAge: 24 * 60 * 60 * 1000,
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true,
            sameSite: 'strict'
        })
        .json({ existingUser, token })
})

export const logoutUser = AsyncHandler(async (req, res) => {
    return res
        .status(200)
        .cookie('userToken', '', {
            maxAge: 0,
            httpOnly: true,
            sameSite: 'strict'
        })
        .json({ message: 'Successfully logged out' })
})

export const verifyUserEmail = AsyncHandler(async (req, res) => {
    const { id: verifyToken } = req.params

    const checkToken = await EmailVerification.findOne({
        verifyToken: verifyToken
    }).populate('email', 'username email')

    if (!checkToken)
        return res
            .status(404)
            .json({ message: 'accessToken is expired or invalid' })
    console.log(checkToken)

    const user = await User.findOne({ email: checkToken.email.email })
    user.isEmailVerified = true
    await user.save()

    await EmailVerification.findByIdAndDelete(checkToken._id, { new: true })

    return res.status(200).json({ message: 'email verification successfull' })
})

export const resetPasswordLink = AsyncHandler(async (req, res) => {
    const { email } = req.body
    const user = await User.findOne({ email })

    if (!user)
        return res
            .status(404)
            .json({ message: 'sorry no account found with this email id' })
    const token = jwt.sign(
        {
            id: user._id
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '10min'
        }
    )

    if (!token)
        return res
            .status(500)
            .json({ message: 'unable to generate Link due to internal server error' })

    const verifyEmail = await EmailVerification.create({
        email: user._id,
        verifyToken: token,
        userType: 'User'
    })

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Reset Password Link',
        text: ` Hello ${user.username.firstName},\n\nPlease reset your password by clicking the link below:\n\nhttp://localhost:5000/api/v1/user/reset-password/${token}\n\nThis link will expire in 10 minutes.`
    }

    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error)
        } else {
            console.log('Verification email sent: ' + info.response)
        }
    })

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                'reset password link has been sent to you email id'
            )
        )
})

export const updateUserInfo=AsyncHandler(async(req,res)=>{
   
    
    const loggedUser= req.user._id ;
    console.log(req.params.userId);
    
    const {userId} = req.params 
 
  
    
    if(loggedUser.toString() !== userId) return res.status(401).json({message:'you are not authorize'})
        const {username,  contactNumber, address,dateOfBirth , gender, favoriteCategories } = req.body

    if(!username.firstName || !contactNumber || !address.trim() ){
        return res.status(400).json({message:"fields are compulsory"})
    }
    
    const userUpdate= await User.findByIdAndUpdate(loggedUser,{
        fullName:{
            firstName:username.firstName,
            lastName:username.lastName 
        },
        contactNumber:contactNumber,
        address:address,
        dateOfBirth:new Date(dateOfBirth),
        gender,
        favoriteCategories:favoriteCategories.map(item=> item)

    })
  console.log(userUpdate);
  
    
return res.status(200).json(new ApiResponse(200,userUpdate,'user data updated successfully'))


})

export const addProductToCart = AsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
   
    if (!user) return res.status(404).json({ message: 'Please login to access your cart' })

    const { id: recProductId } = req.params
    if (!recProductId)
        return res.status(404).json({ message: 'product not found' })
    const product = await Product.findById(recProductId)
    const cart = await Cart.findOne({ userId: user._id }).populate(
        'products',
        'productId quantity price'
    )


    const existingProduct = cart.products.find(
        product => product.productId.toString() === recProductId
    )
    
    if (!existingProduct) {
        cart.products.push({
            productId: recProductId,
            quantity: 1,
            price: product.price
        })
    } else {
        existingProduct.quantity += 1
    }

    await cart.save()
    cart.totalPrice = cart.products.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    )
    const updatedCart= await Cart.findOne({ userId: user._id }).populate('products.productId')
  
    

    await cart.save()
    return res
        .status(200)
        .json(new ApiResponse(200, updatedCart, 'cart updated successfully'))
})

export const updateUserProfilePic= AsyncHandler(async(req,res)=>{
  
  
    
 
   if(!req.file) return res.status(401).json({message:"file is required"}) 
    let file = await uploadToCloudinary(req.file.path) 

   if(!file) return res.status(500).json({message:"photo upload failed"})
    
    
    const updateProfile= await User.findByIdAndUpdate(req.user._id,{
        profileImage:file.secure_url
    },
{new:true})

console.log(updateProfile);


   return res.status(200).json(new ApiResponse(200,updateProfile,'profile picture uploaded successfully'))
 
})

export const getUserProfile= AsyncHandler(async(req,res)=>{
    const userId= req.user._id 
    if(!userId) return res.status(401).json({message:"user id is missing"})
        const user= await User.findById(userId) .populate({
    path: "cart",
    populate: {
      path: "products.productId", 
      model: "Product"
    }
  })
console.log(user);
return res.status(200).json(new ApiResponse(200, user,'user fetched'))
})

export const removeFromCart = AsyncHandler(async (req, res) => {
    const { option } = req.query
   
console.log('hi');

    const { id: recProductId } = req.params

    
    if (!recProductId)
        return res.status(404).json({ message: 'inavlid product id' })

    const cart = await Cart.findOne({ userId: req.user._id })
    
    
   
    if (!cart) return res.status(404).json({ message: 'cart not found' })

    const findIndex = await cart.products.findIndex(
        product =>product.productId.toString()=== recProductId
        
    )
   
    if (findIndex === -1) {
        return res.status(404).json({ message: 'no product found' })
    }

    const product = cart.products[findIndex]

    if (option === 'remove') {
        cart.products.splice(findIndex, 1)
    } else if (option === 'delete') {
        if (product.quantity > 1) {
            product.quantity -= 1
        } else {
            cart.products.splice(findIndex, 1)
        }
    } else {
        return res.status(401).json({ message: 'wrong querry passed' })
    }
    cart.totalPrice = cart.products.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0
    )

    await cart.save()
 const updatedCart= await Cart.findOne({userId:req.user._id}).populate('products.productId')
 
    console.log(updatedCart);
    
 return res
        .status(200)
        .json(new ApiResponse(200, updatedCart, 'cart has been updated successfully'))
})

export const addTowishList = AsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (!user) return res.status(404).json({ message: 'User not found' })

    const { id: productId } = req.params
    if (!productId) return res.status(404).json({ message: 'Product not found' })

    const product = await Product.findById(productId)
    if (!product) return res.status(404).json({ message: 'Product not found' })

    // Prevent duplicates
    if (user.wishList.includes(productId)) {
        return res.status(400).json({ message: 'Product already in wishList' })
    }

    user.wishList.push(productId)
    await user.save()

    return res
        .status(200)
        .json(new ApiResponse(200, user.wishList, 'Product added to wishList'))
})

export const removeFromwishList = AsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (!user) return res.status(404).json({ message: 'User not found' })

    const { id: productId } = req.params
    if (!productId) return res.status(404).json({ message: 'Product not found' })

    const index = user.wishList.findIndex(id => id.toString() === productId)
    if (index === -1) {
        return res.status(404).json({ message: 'Product not in wishList' })
    }

    user.wishList.splice(index, 1)
    await user.save()

    return res
        .status(200)
        .json(new ApiResponse(200, user.wishList, 'Product removed from wishList'))
})


export const userPayment= AsyncHandler(async(req,res)=>{



const {products}= req.body
const user= await User.findById(req.user._id).populate({
    path:'cart',
    populate:{
        path:"products.productId",
        model:"Product"
    }
})
if(!user) return res.status(404).json({message:"user not found"})
const cart= user.cart




 try {
     const session= await stripe.checkout.sessions.create({
    payment_method_types:['card'],
    mode:"payment",
      invoice_creation: {
    enabled: true,        
  },
    line_items: cart.products.map(item=> ({
        price_data:{
            currency:'inr',
            product_data:{
                name:item.productId.title,
            },
            unit_amount:Math.round(item.productId.price * 100)

        },
        quantity:Math.round(item.quantity)
    })) ,
    success_url:'http://localhost:5173/paymentSuccessful',
 cancel_url:'http://localhost:5173/cancelpayment'
 })

 const order= await orderModel.create({
    user: req.user._id,
    orderItems: cart.products.map(item => ({
        product: item.productId._id,
        name: item.productId.title,
        qty: item.quantity,
        price: item.productId.price
    })),
    shippingAddress: user.address,
    paymentMethod: 'Stripe',
    itemsPrice: cart.totalPrice,
    shippingPrice: 0, 
    totalPrice: cart.totalPrice + 0, 
    isPaid: true
 })
await Cart.findOne({ userId: user._id }).then(cart => {
    cart.products = []
    cart.totalPrice = 0
    return cart.save()
})
 
 await User.findByIdAndUpdate(user._id, {
    $push: { orderHistory: order._id }})
return res.status(200).json(new ApiResponse(200,session.url,'payment successful'))
 } catch (error) {
    return res.status(500).json({message:"internal server error while processing payment",error:error.message})
 }
 



})



