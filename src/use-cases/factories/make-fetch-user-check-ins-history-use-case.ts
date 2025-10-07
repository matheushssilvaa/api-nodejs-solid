import { PrismaCheckinsRepository } from '@/repositories/prisma/prisma-checkins-repository'
import { FetchUserCheckinsHistoryUseCase } from '../fetch-user-check-ins-history'

export function makeFetchUserCheckInsHistoryUseCase() {
  const checkInsRepository = new PrismaCheckinsRepository()
  const useCase = new FetchUserCheckinsHistoryUseCase(checkInsRepository)

  return useCase
}