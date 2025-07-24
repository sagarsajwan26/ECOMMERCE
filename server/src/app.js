import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import userRouter from './routes/user.route.js'
import adminRouter from './routes/admin.route.js'
import sellerRouter from './routes/seller.route.js'

const app= express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT']
}))

app.use(express.static('public'))


app.use('/api/v1/admin', adminRouter)
app.use('/api/v1/seller', sellerRouter)
app.use('/api/v1/user', userRouter)


app.use('/', (req, res) => {
    res.send('welcome to E-commerce APIS')
})

export {app}



