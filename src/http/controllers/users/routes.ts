import { FastifyInstance } from "fastify";
import { authenticate } from "./authenticate";
import { profile } from "./profile";
import { verifyJWT } from "@/http/middlewares/verify-jwt";

export async function usersRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJWT)
    app.get('/me', profile)
    app.post('/signin', authenticate)
}