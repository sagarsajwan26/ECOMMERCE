import { Product } from "../models/products.model.js";
import { Review } from "../models/review.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";

export const getProductList = AsyncHandler(async (req, res) => {
    const limit = parseInt(req.query.limit) || 24;
    const skip = parseInt(req.query.skip) || 0;

    const products = await Product.find().limit(limit).skip(skip);

    return res.status(200).json(new ApiResponse(200, products, "Products fetched"));
});

export const getProductReview= AsyncHandler(async(req,res)=>{
    const {id:productId} = req.params 
    if(!productId) return res.status(401).json({message:"product id is missing"})

   const review= await Review.find({product:productId}).populate('product','title description price stock ratings').populate('user','username profileImage')
})

 