import { Express, Router as ExpressRouter } from 'express'
import { Service } from 'typedi'
import { ArticleRouter } from './routers/article.router'
import { AuthRouter } from './routers/auth.router'
import { UserRouter } from './routers/user.router'

type RoutesObject = {
    [key: string]: ReturnType<typeof ExpressRouter>
}

const routes: RoutesObject = {
	'/user': UserRouter,
	'/auth': AuthRouter,
	'/article': ArticleRouter
}

@Service()
export class AppRouter {
	configure_routes(app: Express) {
		Object
			.entries(routes)
			.forEach(([baseUrl, router]) => {
				app.use(baseUrl, router)
			})
	}       
}