import { PrismaCheckinsRepository } from '@/repositories/prisma/prisma-checkins-repository'
import { ValidateCheckInUseCase } from '../validate-check-ins'

export function makeValidateCheckInUseCase() {
  const checkInsRepository = new PrismaCheckinsRepository()
  const useCase = new ValidateCheckInUseCase(checkInsRepository)

  return useCase
}