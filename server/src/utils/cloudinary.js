import { v2 as cloudinary } from 'cloudinary';



    cloudinary.config({ 
        cloud_name:process.env.CLOUD_NAME, 
        api_key: process.env.CLOUD_API_KEY, 
        api_secret: process.env.CLOUD_API_SECRET
    });
    

    export const uploadToCloudinary= async(localFilePath)=>{
        if(!localFilePath) return new Error('images are required') 
            try {
                const file=await cloudinary.uploader.upload(localFilePath)

                return file
            } catch (error) {
                console.log('INTERNAL SERVER ERROR WHILE UPLOADIN FILE TO CLOUDINARY',error);
                
            }
    }