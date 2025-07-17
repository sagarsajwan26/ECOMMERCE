import Router from 'express'
import { loginAdmin, logoutAdmin, signupAdmin } from '../controllers/adminController.js'

const  router= Router()
router.route('/signup').post(signupAdmin)
router.route('/login').post(loginAdmin)
router.route('/logout').post(logoutAdmin)



export default router