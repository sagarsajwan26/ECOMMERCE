import Router from 'express'
import { addProductToCart, getUserProfile, loginUser, logoutUser, removeFromCart, resetPasswordLink, signupUser, updateUserInfo, updateUserProfilePic, userPayment, verifyUserEmail } from '../controllers/userController.js'
import { verifyUserToken } from '../middleware/auth.middleware.js'
import { allGroupedProducts, getFeaturedProducts, getProductDetail, getProductList, getProductReview, suggestedProducts } from '../controllers/productController.js'
import { addReview, deleteReview, editComment } from '../controllers/reviewController.js'
import { upload } from '../middleware/multer.middleware.js'


const  router= Router()

router.route('/signup').post(signupUser)
router.route('/login').post(loginUser)
router.route('/logout').post(logoutUser)
router.route('/verify-email/:id').get(verifyUserEmail)
router.route('/update-user/:userId').put(verifyUserToken,updateUserInfo)
router.route('/getProfile').get(verifyUserToken, getUserProfile)
router.route('/updateProfilePic').put(verifyUserToken,upload.single('profilePic'),updateUserProfilePic)
router.route('/addToCart/:id').post(verifyUserToken,addProductToCart)
router.route('/removeFromCart/:id').put(verifyUserToken,removeFromCart)
router.route('/resetPassword').post(resetPasswordLink)
router.route('/getProductReview').get(getProductReview)
router.route('/addReview/:id').post(verifyUserToken,addReview)
router.route('/deleteReview/:id').delete(verifyUserToken,deleteReview)
router.route('/updateReview/:id').put(verifyUserToken,editComment)
router.route('/getProducts').get(getProductList)

router.route('/suggestedProducts').get(verifyUserEmail,suggestedProducts)
router.route('/allGroupedProducts').get(allGroupedProducts)
router.route('/getFeaturedProduct').get(getFeaturedProducts)
router.route('/getProductDetails/:id').get(getProductDetail)

router.route('/payment').post(verifyUserToken,userPayment)



export default router