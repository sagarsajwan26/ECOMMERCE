import Router from 'express'
import { addProductToCart, loginUser, logoutUser, removeFromCart, resetPasswordLink, signupUser, verifyUserEmail } from '../controllers/userController.js'
import { verifyUserToken } from '../middleware/auth.middleware.js'
import { getProductReview } from '../controllers/productController.js'
import { addReview, deleteReview, editComment } from '../controllers/reviewController.js'

const  router= Router()

router.route('/signup').post(signupUser)
router.route('/login').post(loginUser)
router.route('/logout').post(logoutUser)
router.route('/verify-email/:id').get(verifyUserEmail)
router.route('/addToCart/:id').post(verifyUserToken,addProductToCart)
router.route('/removeFromCart/:id').put(verifyUserToken,removeFromCart)
router.route('/resetPassword').post(resetPasswordLink)
router.route('/getProductReview').get(getProductReview)
router.route('/addReview').post(verifyUserToken,addReview)
router.route('/deleteReview').delete(verifyUserToken,deleteReview)
router.route('/updateReview').put(verifyUserToken,editComment)
export default router