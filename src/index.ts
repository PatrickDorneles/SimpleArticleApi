import 'reflect-metadata'
import { Application } from './app'

Application
	.instance
	.create(3000)
	.configure_routes()
	.configure_cors()
	.start()
	.then(({ port }) => {
		console.log(`Running on http://localhost:${port}`)
	})
