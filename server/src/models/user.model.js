import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  username: {
    firstName: { type: String, required: true },
    lastName: { type: String}
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
  isEmailVerified:{
    type:Boolean,
    default:false
  },

  
  profileImage: {
    type: String,
    default:''
  },
  dateOfBirth: {
    type: Date,
    
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other']
  },

  cart:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart',
    default: null
  },
  wishList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      default: []
    }
  ],
  orderHistory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order'
    }
  ],
  favoriteCategories: [
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
      ]
    }
  ],
 
 

}, {
  timestamps: true
});





userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});


userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  return token;
};



export const User = mongoose.model('User', userSchema);
