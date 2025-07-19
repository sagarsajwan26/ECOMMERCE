import mongoose from 'mongoose'
export const connectDB = async () => {
    try {
        const instance= await mongoose.connect(process.env.MONGO_URI);
        console.log('Database connected successfully:', instance.connection.host);
        
    } catch (error) {
        console.log('Error connecting to database:', error.message);
        
    }

}