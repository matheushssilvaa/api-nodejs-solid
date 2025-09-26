import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod"
import { RegisterUseCase } from "@/use-cases/register";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-user-repository";
import { UserAlreadyExistsError } from "@/errors/user-already-exists-error";

export async function register(request: FastifyRequest, reply: FastifyReply) {
    const registrationSchema = z.object({
        name: z.string(),
        email: z.email(),
        password: z.string().min(6)
    })

    const { name, email, password } = registrationSchema.parse(request.body)

    try {

        const prismaUsersRepository = new PrismaUsersRepository()
        const registerUseCase = new RegisterUseCase(prismaUsersRepository)

        await registerUseCase.execute({
            name,
            email,
            password
        })

    } catch (err) {
        if(err instanceof UserAlreadyExistsError) {
            return reply.status(409).send({ message: err.message })
        }

        throw err
    }

    reply.status(201).send()
}