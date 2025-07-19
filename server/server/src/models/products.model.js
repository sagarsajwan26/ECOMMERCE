import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Seller',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: [
    {
    type: String,
    enum: [
      'Fashion',
      'Electronics',
      'Books',
      'Home & Kitchen',
      'Toys',
      'Sports',
      'Beauty',
      'Automotive',
      'Grocery'
    ],
    required: true
  }
  ],
  price: {
    type: Number,
    required: true
  },
  discount: {
    type: Number
  },
  stock: {
    type: Number,
    required: true,
    min: 0
  },
  images: [
    {
      type: String, 
      required: true
    }
  ],
  ratings: {
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 }
  },
  reviews: [
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:'Review',
      default:[]
    }
  ],
  isPublished: {
    type: Boolean,
    default: false
  },
  isFeatured:{
    type:Boolean,
    default:false
  }

}, {
  timestamps: true
});

export const Product = mongoose.model('Product', productSchema);
