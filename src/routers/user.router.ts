import { UserController } from './../controllers/user.controller'
import { Router } from 'express'
import Container from 'typedi'

const controller = Container.get(UserController)

export const UserRouter = Router()
