import { NextFunction, Request, Response } from 'express'
import { Service } from 'typedi'
import { AuthenticateService } from '../services/auth/authenticate.service'

@Service()
export class AuthController {
	constructor(
		private readonly authenticateService: AuthenticateService
	) { }

	authenticate = async (req: Request, res: Response, next: NextFunction) => {
		const { username, password } = req.body
		
		const token = await this.authenticateService.authenticateWithUsernameAndPassword(username, password).catch(next)

		if(!token) return

		return res.status(200).json({ token })
	}

}