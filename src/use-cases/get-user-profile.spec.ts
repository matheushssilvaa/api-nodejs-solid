import { beforeEach, describe, expect, it } from 'vitest'
import { inMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { InvalidCredentialsError } from '@/errors/invalid-credentials-error'
import { GetUserProfileUseCase } from './get-user-profile'
import { hash } from 'crypto'

let usersRepository: inMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get user profile user case', () => {

    beforeEach(() => {
        usersRepository = new inMemoryUsersRepository()
        sut = new GetUserProfileUseCase(usersRepository)
        
    })

    it('should be able to get user profile', async () => {
        const createdUser = await usersRepository.create({
            name: "John Doe",
            email: "johndoe@example.com",
            password_hash: await hash("123456", "6")
        })

        const { user } = await sut.execute({
            userId: createdUser.id
        })

        expect(user.name).toEqual("john Doe")
        
    })

    it('should not be able to get user profile with wrong id', async () => {
        await expect(() => {
            sut.execute({
                userId: "non-existing-id"
            })
        }).rejects.toBeInstanceOf(InvalidCredentialsError)
    })
})