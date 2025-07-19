import Router from 'express'
import { addProductToCart, loginUser, logoutUser, removeFromCart, resetPasswordLink, signupUser, updateUserInfo, verifyUserEmail } from '../controllers/userController.js'
import { verifyUserToken } from '../middleware/auth.middleware.js'
import { allGroupedProducts, getFeaturedProducts, getProductList, getProductReview, suggestedProducts } from '../controllers/productController.js'
import { addReview, deleteReview, editComment } from '../controllers/reviewController.js'


const  router= Router()

router.route('/signup').post(signupUser)
router.route('/login').post(loginUser)
router.route('/logout').post(logoutUser)
router.route('/verify-email/:id').get(verifyUserEmail)
router.route('/update-user').put(verifyUserToken,updateUserInfo)

router.route('/addToCart/:id').post(verifyUserToken,addProductToCart)
router.route('/removeFromCart/:id').put(verifyUserToken,removeFromCart)
router.route('/resetPassword').post(resetPasswordLink)
router.route('/getProductReview').get(getProductReview)
router.route('/addReview').post(verifyUserToken,addReview)
router.route('/deleteReview').delete(verifyUserToken,deleteReview)
router.route('/updateReview').put(verifyUserToken,editComment)
router.route('/getProducts').get(getProductList)

router.route('/suggestedProducts').get(verifyUserEmail,suggestedProducts)
router.route('/allGroupedProducts').get(allGroupedProducts)
router.route('/getFeaturedProduct').get(getFeaturedProducts)
export default router