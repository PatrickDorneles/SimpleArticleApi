import { NotFound } from 'http-errors'
import { PrismaClient } from '@prisma/client'
import { Service } from 'typedi'
import { FindArticleService } from './find_article.service'

@Service()
export class ViewArticleService {
	constructor(
        private readonly prisma: PrismaClient,
        private readonly findArticleService: FindArticleService
	){}

	async view(id: string) {
		const article = await this.findArticleService.findById(id)

		if(!article) {
			throw new NotFound('Artigo não encontrado')
		}

		return await this.prisma.article.update({
			where: {
				id
			},
			data: {
				views: article.views + 1
			},	
			include: {
				article_tags: true,
				author: true
			}
		})	
	}
}