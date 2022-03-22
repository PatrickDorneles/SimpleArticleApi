import { Router } from 'express'
import Container from 'typedi'
import { ArticleController } from '../controllers/article.controller'

const controller = Container.get(ArticleController)

export const ArticleRouter = Router()

ArticleRouter.get('/feed', controller.feed)
ArticleRouter.get('/:id', controller.view)
