import { Product } from "../models/products.model.js";
import { Review } from "../models/review.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";

export const addReview=AsyncHandler(async (req,res,next)=>{
    const {id:productId} = req.params 
    const {rating, comment} = req.body 
    if(!rating && !comment.trim() ) return res.status(400).json({message:"rating is required least one field is required"}) 
    const user= req.user._id 
    const product= await Product.findById(productId)
    if(!product) return res.status(404).json({message:"the product id does not exist"})

        const createReview= await Review.create({
           product:productId,
           user:user,
           rating:rating,
           comment
        })

        if(!createReview) return res.status(500).json({message:"internal server error while createing review"})
            return res.status(201).json(new ApiResponse(201,createReview,'review added successfully'))

})


export const deleteReview= AsyncHandler(async(req,res)=>{
    const {id:commentId} = req.params 
    if(!commentId) return res.status(404).json({message:"review not found"})


    const comment= await Review.findById(commentId)

    if(!comment) return res.status(404).json({message:"comment not found"})
        if(comment.user.toString() !==req.user._id) return res.status(401).json({message:"you are not authorize"})
            await Review.findByIdAndDelete(commentId)

    return res.status(200).json({message:"comment deleted Successfully"})

})

export const editComment= AsyncHandler(async(req,res)=>{
    const loggedUser= req.user._id 
    const {id:commentId} = req.params 
    if(!commentId) return res.status(404).json({message:"comment not found"})
        const {rating, comment} = req.body 
    if(!rating && !comment.trim()) return res.status(401).json({message:"fields cannot be empty"})


         const review = await Review.findById(commentId);
if (!review) return res.status(404).json({message:"comment not found"});
if (review.user.toString() !== req.user._id.toString()) return res.status(401).json({message:"you are not authorize"});
        const updateComment = await Review.findByIdAndUpdate(commentId,{
            rating,
            comment
        },{new:true})
        if(!updateComment) return res.status(400).json({message:'error while updating comment please try afte r some times'})
            return res.status(200).json(new ApiResponse(200,updateComment,"comment updated Successfully"))
    
})

