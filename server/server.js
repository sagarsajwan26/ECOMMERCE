import 'dotenv/config'

import { connectDB } from './src/db/db.js'
import { app } from './src/app.js'
import serverless from 'serverless-http'
const PORT= process.env.PORT


connectDB()

export default serverless(app)
