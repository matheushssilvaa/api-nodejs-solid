import { makeValidateCheckInUseCase } from "@/use-cases/factories/make-validate-check-in-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function validate(request: FastifyRequest, reply: FastifyReply) {

    const validateCheckInParamsSchema = z.object({
        checkInId: z.uuid()
    })

    const { checkInId } = validateCheckInParamsSchema.parse(request.body)

    const createCheckInUseCase = makeValidateCheckInUseCase()

    await createCheckInUseCase.execute({
        checkInId
    })

    return reply.status(204).send()
}