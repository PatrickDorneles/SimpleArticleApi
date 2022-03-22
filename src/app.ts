import './prisma_client'

import { Container } from 'typedi'
import { createServer, Server } from 'http'
import express, { Express, json } from 'express'
import { AppRouter } from './router'
import { ErrorMiddleware } from './middlewares/error.middleware'

export class Application {
	private static _instance: Application
    
	private express!: Express
	private server!: Server

	private port!: number

	static get instance() {
		if(!this._instance) {
			this._instance = new Application()
		}

		return this._instance
	}
    
	create(port: number) {
		this.express = express()
		this.server = createServer(this.express)
		this.port = port

		this.express.use(json())
        
		return this
	}
    
	configure_cors() {
		return this
	}

	configure_routes() {
		this.verify()

		const app_router = Container.get(AppRouter)
		app_router.configure_routes(this.express)

		this.configure_error_handlers()

		return this
	}

	start() {
		this.verify()

        type StartPromiseResult = { app: Application, port: number }

        return new Promise<StartPromiseResult>(
        	(resolve, reject) => this.server
        		.listen(this.port)
        		.on('listening', () => resolve({ app: this, port: this.port }))
        		.on('error', reject)
        )
	}

	private verify() {
		if(!this.server) {
			throw new Error('Server not initialized')
		}

		if(!this.express) {
			throw new Error('Express not initialized')
		}

		if(!this.port) {
			throw new Error('Port invalid')
		}
	}

	private configure_error_handlers() {
		const errorMiddleware = Container.get(ErrorMiddleware)

		this.express.use(errorMiddleware.handleHttpError)
		this.express.use(errorMiddleware.handleUnhandledErrors)
	}


}