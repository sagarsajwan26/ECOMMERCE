import Router from 'express'
import { addProduct, deleteProduct, getAllProductsList, getOrderList, getSellerProfile,  loginSeller, logoutSeller, signup, updateProduct, UpdateSellerProfile, updateSellerProfilePic, verifyEmail } from '../controllers/sellerController.js'
import { verifySellerToken } from '../middleware/auth.middleware.js'
import { upload } from '../middleware/multer.middleware.js'

const  router= Router()

router.route('/signup').post(signup)
router.route('/login').post(loginSeller)
router.route('/logout').post(logoutSeller)
router.route('/verify-email/:verifyToken').get(verifyEmail)

router.route('/update-profile').put(verifySellerToken, UpdateSellerProfile)
router.route('/update-profile-pic').put(verifySellerToken,upload.single('image'),updateSellerProfilePic)


router.route('/getProfile').get(verifySellerToken,getSellerProfile)
router.route('/add-product').post(verifySellerToken, upload.array('images',10),addProduct)
router.route("/getProductList").get(verifySellerToken,getAllProductsList)
router.route('/update-product/:id').put(verifySellerToken,updateProduct)
router.route('/delete-product/:id').delete(verifySellerToken,deleteProduct)
router.route('/getOrderList').get(verifySellerToken,getOrderList)
export default router