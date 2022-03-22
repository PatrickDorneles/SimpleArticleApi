import { NextFunction, Request, Response } from 'express'
import { Service } from 'typedi'
import { GetFeedService } from '../services/article/get_feed.service'
import { NotFound } from 'http-errors'
import { ViewArticleService } from '../services/article/view_article.service'
@Service()
export class ArticleController {
	constructor(
		readonly getFeedService: GetFeedService,
		private readonly viewArticleService: ViewArticleService
	) {}
    
	feed = async (req: Request, res: Response) => {
		const page = parseInt(req.query.page?.toString() || '1')
		const size = parseInt(req.query.size?.toString() || '5')

		const feed = await this.getFeedService
			.getPublicFeed({
				page,
				size
			})

		return res.status(200).json({
			page,
			size,
			data: feed
		})
	}

	view = async (req: Request, res: Response, next: NextFunction) => {
		const article = await this.viewArticleService
			.view(req.params.id)
			.catch(next)

		return res.status(200).json(article)
	}

}