import { PrismaClient } from '@prisma/client'
import { Service } from 'typedi'
import { BadRequest } from 'http-errors'
import { hash } from 'bcrypt'

@Service()
export class RegisterUserService {
	constructor(
        private readonly prisma: PrismaClient
	) {}


	async registerUser(register: { username: string, password: string, admin: boolean }) {
		const userWithSameUsername = await this.prisma.user.findUnique({
			where: {
				username: register.username
			}
		})

		if(userWithSameUsername) {
			throw new BadRequest('Username em uso')
		}

		const encryptedPassword = await hash(register.password, 12)

		return await this.prisma.user.create({
			data: {
				username: register.username,
				password: encryptedPassword,
				admin: register.admin,
				active: true
			},
			select: {
				id: true,
				username: true,
				admin: true,
				password: false
			}
		})


	}
}