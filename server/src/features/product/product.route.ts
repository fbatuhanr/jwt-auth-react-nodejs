import { Router } from 'express'
import * as productController from './product.controller'
import authenticateToken from '../../middlewares/authMiddleware'

const router = Router()

router.get('/', authenticateToken, productController.get)

export default router