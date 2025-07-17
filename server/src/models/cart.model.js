import mongoose from 'mongoose' 
const cartSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    products:{
        type:[
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            },
            price: {
                type: Number,
                required: true
            }
        }
    ],
    default:[]
    },
    totalPrice: {
        type: Number,
         default: 0
    },




},{timestamps:true})



export const Cart = mongoose.model('Cart', cartSchema);