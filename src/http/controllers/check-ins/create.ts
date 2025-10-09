import { makeCheckInUseCase } from "@/use-cases/factories/make-check-in-use.case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply) {

    const createCheckInsParamsSchema = z.object({
        gymId: z.string()
    })

    const createCheckInBodySchema = z.object({
        userLatitude: z.number(),
        userLongitude: z.number(),
    })

    const { gymId } = createCheckInsParamsSchema.parse(request.body)

    const {
        userLatitude,
        userLongitude, } = createCheckInBodySchema.parse(request.body)

    const createCheckInUseCase = makeCheckInUseCase()

    await createCheckInUseCase.execute({
        userId: request.user.sub,
        gymId,
        userLatitude,
        userLongitude,
    })

    return reply.status(201).send()
}