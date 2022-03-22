import { PrismaClient } from '@prisma/client'
import { Service } from 'typedi'

@Service()
export class FindUserService {
  
	constructor(readonly prisma: PrismaClient) {}
    
	findById(id: string) {
		return this.prisma.user.findUnique({
			where: {
				id
			}
		})
	}

	findByUsername(username: string) {
		return this.prisma.user.findUnique({
			where: {
				username
			}
		})
	}
}