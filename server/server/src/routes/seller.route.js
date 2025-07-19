import Router from 'express'
import { addProduct, deleteProduct, getAllProductsList, getSellerProfile,  loginSeller, logoutSeller, signup, updateProduct, verifyEmail } from '../controllers/sellerController.js'
import { verifySellerToken } from '../middleware/auth.middleware.js'
import { upload } from '../middleware/multer.middleware.js'

const  router= Router()

router.route('/signup').post(signup)
router.route('/login').post(loginSeller)
router.route('/logout').post(logoutSeller)
router.route('/verify-email/:verifyToken').get(verifyEmail)
router.route('/getProfile').get(verifySellerToken,getSellerProfile)
router.route('/add-product').post(verifySellerToken, upload.any('images'),addProduct)
router.route("/getProductList").get(verifySellerToken,getAllProductsList)
router.route('/update-product/:id').put(verifySellerToken,updateProduct)
router.route('/delete-product/:id').delete(verifySellerToken,deleteProduct)
export default router