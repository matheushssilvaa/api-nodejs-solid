import { CheckIn, Prisma } from "generated/prisma";

export interface CheckInsRepository {
    create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
    findById(id: string): Promise<CheckIn | null>
    findManyByUserId(userId: string): Promise<CheckIn[]>
    countByUserId(userId: string): Promise<number>
    findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
    save(checkin: CheckIn): Promise<CheckIn>
}