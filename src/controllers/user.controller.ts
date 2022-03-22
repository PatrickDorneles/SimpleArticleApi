import { Service } from 'typedi'
import { FindUserService } from '../services/user/find_user.service'

@Service()
export class UserController {

	constructor(
        readonly findUserService: FindUserService
	){}
}