import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const adminSchema= new mongoose.Schema({
    username:{
        firstName:{
            type:String,
            required:true
        },
        lastName:{
                type:String,
            required:true
        }

    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        select:false

    },
    contactNumber:{
        type:Number,
        required:true
    },
    

},{
    timestamps:true
})


adminSchema.pre('save', async function(next) {
    if (this.isModified('password')) {     
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }       
    next()

});


adminSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);       
}


adminSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return token;   
}   




export const Admin = mongoose.model('Admin',adminSchema)