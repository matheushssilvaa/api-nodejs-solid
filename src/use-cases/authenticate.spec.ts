import { beforeEach, describe, expect, it } from 'vitest'
import { inMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from '@/errors/invalid-credentials-error'

let usersRepository: inMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
    it('should be able to authenticate', async () => {

        beforeEach(() => {
            usersRepository = new inMemoryUsersRepository()
            sut = new AuthenticateUseCase(usersRepository)
        })

        await expect(() => {
            sut.execute({
            email: "teste@teste.com",
            password: "123456"
        })
        }).rejects.toBeInstanceOf(InvalidCredentialsError)
    })
})