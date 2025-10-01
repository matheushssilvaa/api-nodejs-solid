import { CheckIn } from "generated/prisma"
import { CheckInsRepository } from "@/repositories/check-ins-repository"

interface FetchUserCheckinsHistoryUseCaseRequest {
    userId: string,
    page: number
}

interface FetchUserCheckinsHistoryUseCaseResponse {
    checkIns: CheckIn[]
}

export class FetchUserCheckinsHistoryUseCase {

    constructor(private checkInsRepository: CheckInsRepository) { }

    async execute({ userId }: FetchUserCheckinsHistoryUseCaseRequest): Promise<FetchUserCheckinsHistoryUseCaseResponse> {

        const checkIns = await this.checkInsRepository.findManyByUserId(userId)

        return { checkIns }
    }
}
