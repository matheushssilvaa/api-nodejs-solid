import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { inMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './checkin'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memoryGymsRepository'
import { Decimal } from 'generated/prisma/runtime/library'

let checkInsRepository: inMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {

    beforeEach(() => {
        checkInsRepository = new inMemoryCheckInsRepository()
        gymsRepository = new InMemoryGymsRepository()
        sut = new CheckInUseCase(checkInsRepository, gymsRepository)

        // usado para "mocar" a data
        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('should be able to check in', async () => {

        gymsRepository.items.push({
            id: 'gym-01',
            title: 'title',
            description: '',
            phone: '',
            latitude: new Decimal(0),
            longitude: new Decimal(0)
        })

        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

        const { checkIn } = await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: 0,
            userLongitude: 0
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

    it('should not be able to check in twice in the same day', async () => {
        await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: 0,
            userLongitude: 0
        })

        await expect(() => {
            sut.execute({
                gymId: 'gym-01',
                userId: 'user-01',
                userLatitude: 0,
                userLongitude: 0
            })
        }).rejects.toBeInstanceOf(Error)
    })

    it('should be able to check in twice but in different days', async () => {

        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

        await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: 0,
            userLongitude: 0
        })

        vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

        await expect(() => {
            sut.execute({
                gymId: 'gym-01',
                userId: 'user-01',
                userLatitude: 0,
                userLongitude: 0
            })
        }).resolves.toBeTruthy()
    })

    it('should not be able to check in on distant gym', async () => {

        gymsRepository.items.push({
            id: 'gym-02',
            title: "teste gym",
            description: "",
            phone: "",
            latitude: new Decimal(0),
            longitude: new Decimal(0)
        })

        await expect(() => {
            sut.execute({
                gymId: 'gym-02',
                userId: 'user-01',
                userLatitude: 0,
                userLongitude: 0
            })
        }).rejects.toBeInstanceOf(Error)
    })
})