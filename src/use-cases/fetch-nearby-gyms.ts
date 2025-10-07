import { Gym } from "generated/prisma"
import { GymsRepository } from "@/repositories/gyms-repository"

interface SearchNearbyGymsUseCaseRequest {
    userLatitude: number,
    userLongitude: number
}

interface SearchNearbyGymsUseCaseResponse {
    gyms: Gym[]
}

export class FetchNearbyGymsUseCase {

    constructor(private gymsRepository: GymsRepository) { }

    async execute({
        userLatitude,
        userLongitude
    }: SearchNearbyGymsUseCaseRequest): Promise<SearchNearbyGymsUseCaseResponse> {

        const gyms = await this.gymsRepository.findManyNearby({
            latitude: userLatitude,
            longitude: userLongitude
        })

        return { gyms }
    }
}
