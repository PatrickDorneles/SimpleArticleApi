import { InvalidAuthError } from './../../errors/invalid_auth.error'
import { Service } from 'typedi'
import { FindUserService } from '../user/find_user.service'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'

@Service()
export class AuthenticateService {
	constructor(
        readonly findUserService: FindUserService
	) {}
    
	async authenticateWithUsernameAndPassword(username: string, password: string) {
		const user = await this.verifyAuthenticationAndReturnUser(username, password)

		if(!user) {
			throw new InvalidAuthError()
		}

		const payload = { user_id: user.id }

		return sign(payload, process.env.JWT_SECRET!, { expiresIn: '3d' })
	}

	private async verifyAuthenticationAndReturnUser(username: string, password: string) {
		const user = await this.findUserService.findByUsername(username)
        
		if(!user) {
			return
		}

		const doesPasswordMatch = await compare(password, user.password)     
        
		if(!doesPasswordMatch) {
			return
		}

		return user
	}
}