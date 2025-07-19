import 'dotenv/config'

import { connectDB } from './src/db/db.js'
import { app } from './src/app.js'
const PORT= process.env.PORT


connectDB().then(()=>{
app.listen(PORT,()=>{
    console.log('app is listening on port '+PORT);
    
})

}).catch((error)=>{
    console.error('Failed to connect to the database:', error); 
})

