import { Service } from 'typedi'
import { ErrorRequestHandler } from 'express'
import { isHttpError } from 'http-errors'

@Service()
export class ErrorMiddleware {
    
	handleHttpError: ErrorRequestHandler =  (err, req, res, next) => {
		if(isHttpError(err)) {
			return res.status(err.statusCode).json({
				message: err.message
			})
		}

		next(err)
	}

	handleUnhandledErrors: ErrorRequestHandler = (err, req, res, next) => {
		return res.status(500).send(err.message)
	}

}