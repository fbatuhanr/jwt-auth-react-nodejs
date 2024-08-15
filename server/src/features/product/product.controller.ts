import { Request, Response, NextFunction } from "express"
import * as productService from './product.service'

async function get(req: Request, res: Response, next: NextFunction) {
    try {

        const result = productService.get()
        res.json(result)
        
    } catch (error) {
        next(error)
    }
}
export { get }