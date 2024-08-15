import { Request, Response, NextFunction } from 'express'

function errorHandlerMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {
  console.error(err.stack)
  
  // General server error
  res.status(500).json({ message: `(*) ${err.message}` || '(*) Internal Server Error' });
}

export default errorHandlerMiddleware