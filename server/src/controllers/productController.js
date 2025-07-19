import { Product } from "../models/products.model.js";
import { Review } from "../models/review.model.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";

export const getProductList = AsyncHandler(async (req, res) => {
    const limit = parseInt(req.query.limit) || 24;
    const skip = parseInt(req.query.skip) || 0;

    const products = await Product.find().limit(limit).skip(skip);

        if(products.length ===0) return res.status(404).json({message:"internal server error while loading products for you"})
    return res.status(200).json(new ApiResponse(200, products, "Products fetched"));
});

export const getProductReview= AsyncHandler(async(req,res)=>{
    const {id:productId} = req.params 
    if(!productId) return res.status(401).json({message:"product id is missing"})

   const review= await Review.find({product:productId}).populate('product','title description price stock ratings').populate('user','username profileImage')
})


export const suggestedProducts = AsyncHandler(async (req, res) => {
    const user = await User.findById(req.user);
    let suggestedProducts = [];

    if (!user || !user.favoriteCategories || user.favoriteCategories.length === 0) {
        suggestedProducts = await Product.aggregate([{ $sample: { size: 10 } }]);
    } else {
        suggestedProducts = await Product.find({
            category: { $in: user.favoriteCategories }
        }).limit(10); 
    }

    return res.status(200).json(new ApiResponse(200, suggestedProducts, "Suggested products fetched"));
});



export const allGroupedProducts = AsyncHandler(async (req, res) => {
    const allCategories = [
      "Fashion","Electronics","Books","Home & Kitchen","Toys",
      "Sports","Beauty","Automotive","Grocery"
    ];

    // Fetch all products
    const products = await Product.find({});
    if(products.length ===0) return res.status(401).json({message:"internal server error"})
    // Group by category
    const result = allCategories.map(cat => ({
      category: cat,
      products: products.filter(p => p.category.includes(cat))
    }));

    return res.status(200).json(new ApiResponse(200, result, "Products grouped by category"));
});


export const getFeaturedProducts= AsyncHandler(async(req,res)=>{

    let featuredProducts =[];
     featuredProducts= await Product.find({isFeatured:true})
    if(featuredProducts.length===0) {
    featuredProducts= await Product.find({isPublished:true})    
    }
    if(featuredProducts.length===0) return res.status(500).json({message:"internal server error"})
    return res.status(200).json(new ApiResponse(200,featuredProducts,'featured product fetched'))
})