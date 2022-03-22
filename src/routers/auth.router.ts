import { Container } from 'typedi'
import { Router } from 'express'
import { AuthController } from '../controllers/auth.controller'

const controller = Container.get(AuthController)

export const AuthRouter = Router()

AuthRouter.post('/', controller.authenticate)