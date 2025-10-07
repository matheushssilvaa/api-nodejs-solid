import { Prisma, Gym } from "generated/prisma";
import { FindManyNearbyParams, GymsRepository } from "../gyms-repository";
import { prisma } from "@/lib/prisma";

export class PrismaGymRepository implements GymsRepository {
    async create(data: Prisma.GymCreateInput) {
        const gym = prisma.gym.create({
            data: data
        })

        return gym
    }

    async findById(id: string) {
        const gym = prisma.gym.findUnique({
            where: {
                id: id
            }
        })

        return gym
    }

    async findManyNearby({ latitude, longitude }: FindManyNearbyParams) {
        const gyms = await prisma.$queryRaw<Gym[]>`
            SELECT * FROM gyms
            WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
        `
        return gyms
    }

    async searchMany(query: string, page: number) {
        const gyms = prisma.gym.findMany({
            where: {
                title: {
                    contains: query
                }
            },
            take: 20,
            skip: (page - 1) * 20
        })

        return gyms
    }
}