import fastify from "fastify"
import { checkInsRoutes } from "./http/controllers/check-ins/routes"
import { usersRoutes } from "./http/controllers/users/routes"
import { gymRoutes } from "./http/controllers/gyms/routes"
import { ZodError } from "zod"
import { env } from "./env"
import fastifyJwt from "@fastify/jwt"

export const app = fastify()

app.register(checkInsRoutes)
app.register(usersRoutes)
app.register(gymRoutes)

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    sign: {
        expiresIn: '10m'
    }
})

app.setErrorHandler((error, _, reply) => {
    if(error instanceof ZodError) {
        return reply.status(400).send({ message: 'Validation error.', issues: error.format})
    }

    if(env.NODE_ENV !== 'production'){
        console.error(error)
    } else {
        // TODO Here we should log to an external tool like DataDog/NewRelic/Sentry
    }

    return reply.status(500).send({ message: 'Internal server error' })
})