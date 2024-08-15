import { Router } from 'express'
import * as userController from './user.controller'

const router = Router()

router.post('/login', userController.login)
router.post('/logout', userController.logout)


export default router