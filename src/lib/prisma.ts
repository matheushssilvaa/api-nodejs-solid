import { env } from '@/env'
import { PrismaClient } from "generated/prisma";

export const prisma = new PrismaClient({
    log: env.NODE_ENV == 'dev' ? ['query']: [] // habilitando o log de query apenas no ambiente de desenvolvimento
})
