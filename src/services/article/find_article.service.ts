import { PrismaClient } from '@prisma/client'
import { Service } from 'typedi'

@Service()
export class FindArticleService {
  
	constructor(readonly prisma: PrismaClient) {}
    
	findById(id: string) {
		return this.prisma.article.findUnique({
			where: {
				id
			},
			include: {
				article_tags: true,
				author: true
			}
		})
	}
}