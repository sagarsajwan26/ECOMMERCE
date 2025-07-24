import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    orderItems: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            name: { type: String, required: true },
            qty: { type: Number, required: true },
            price: { type: Number, required: true },
        
        }
    ],
    shippingAddress: {
        type: String, required: true
      
    },
    paymentMethod: { type: String, required: true },
  
    itemsPrice: { type: Number, required: true },

    shippingPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date }
}, {
    timestamps: true
});

export const orderModel = mongoose.model('Order', orderSchema);