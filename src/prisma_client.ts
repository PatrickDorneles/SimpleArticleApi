import { PrismaClient } from '@prisma/client'
import Container from 'typedi'

const prisma_client = new PrismaClient()

Container.set(PrismaClient, prisma_client)