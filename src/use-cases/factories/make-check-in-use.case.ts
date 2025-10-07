import { PrismaCheckinsRepository } from '@/repositories/prisma/prisma-checkins-repository'
import { PrismaGymRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { CheckInUseCase } from '../checkin'

export function makeCheckInUseCase() {
  const checkInsRepository = new PrismaCheckinsRepository()
  const gymsRepository = new PrismaGymRepository()

  const useCase = new CheckInUseCase(checkInsRepository, gymsRepository)

  return useCase
}