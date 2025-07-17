import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const sellerSchema = new mongoose.Schema({
  username: {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    select:false 
  },
   storeName:{
        type:String,
        required:true
    },
  contactNumber: {
    type: Number,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  isBlocked: {
    type: Boolean,
    default: false
  },
LoginId:{
  type:Number,

},
 profilePic:{
  type:String,
  
 },
  sellerPerformance: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  isEmailVerified: {
    type: Boolean,  
    default: false
  },

  productCategories: [
    {
      type: String,
      enum: [
        "Fashion",
        "Electronics",
        "Home & Kitchen",
        "Beauty",
        "Sports",
        "Books",
        "Toys",
        "Grocery",
        "Automotive"
      ]
    }
  ],
  currentSellingProducts:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Product",
      default:[]
    }
  ],
}, {
  timestamps: true
});



sellerSchema.pre('save', async function(next) {
  if (this.isModified('password')) {  
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }} )
 
  sellerSchema.methods.comparePassword = async function(candidatePassword) {
    const hi= await bcrypt.compare(candidatePassword, this.password)
    console.log( hi);
    
    return await bcrypt.compare(candidatePassword, this.password);
  };



  sellerSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return token;
  };


export const Seller = mongoose.model("Seller", sellerSchema)
