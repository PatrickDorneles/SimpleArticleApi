import { PrismaClient } from '@prisma/client'
import { Service } from 'typedi'

const DEFAULT_PAGE = 1

@Service()
export class GetFeedService {
	constructor(
        private readonly prisma: PrismaClient
	) {}
    
	async getPublicFeed({ page = DEFAULT_PAGE, size = 5 }: { page: number, size: number }) {
		const skip = (page - 1) * size
        
		const basic_articles = await this.prisma.article.findMany({
			skip,
			take: size,
			select: {
				id: true,
				views: true,
				title: true
			},
			orderBy: {
				created_at: 'asc'
			},
			where: {
				public: true
			}
		})

		return basic_articles
	}
}