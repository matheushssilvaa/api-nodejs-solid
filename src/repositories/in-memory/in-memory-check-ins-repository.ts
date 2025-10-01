import { CheckIn, Prisma } from "generated/prisma";
import { CheckInsRepository } from "../check-ins-repository";
import { randomUUID } from "crypto";
import dayjs from "dayjs";

export class inMemoryCheckInsRepository implements CheckInsRepository {

    public items: CheckIn[] = []

    async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
        const checkIn = {
            id: randomUUID(),
            user_id: data.user_id,
            gym_id: data.gym_id,
            validated_at: data.validated_at ? new Date(data.validated_at) : null,
            created_at: new Date()
        }

        this.items.push(checkIn)

        return checkIn
    }

    async save(checkin: CheckIn): Promise<CheckIn> {
        const checkinIndex = this.items.findIndex(item => item.id == checkin.id)

        if (checkinIndex >= 0) {
            this.items[checkinIndex] = checkin
        }

        return checkin
    }

    async findByUserIdOnDate(userId: string, date: Date) {

        const startOfTheDay = dayjs(date).startOf('date')
        const endOfTheDay = dayjs(date).endOf('date')

        const checkInOnSameDate = this.items.find((checkIn) => {
            const checkInDate = dayjs(checkIn.created_at)

            const isOneSameDate = checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)

            return checkIn.user_id == userId && isOneSameDate
        })

        if (!checkInOnSameDate) {
            return null
        }

        return checkInOnSameDate
    }

    async countByUserId(userId: string): Promise<number> {
        return this.items.filter((checkIn) => checkIn.user_id == userId).length
    }

    async findById(id: string): Promise<CheckIn | null> {
        const checkIn = this.items.find((item) => item.id == id)

        if (!checkIn) {
            return null
        }

        return checkIn
    }

    async findManyByUserId(userId: string): Promise<CheckIn[]> {
        return this.items.filter((item) => item.user_id == userId)
    }
}