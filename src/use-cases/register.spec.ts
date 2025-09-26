import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'
import { inMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from '@/errors/user-already-exists-error'

let usersRepository: inMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
    
    // executa antes de todos os testes
    beforeEach(() => {
        usersRepository = new inMemoryUsersRepository()
        sut = new RegisterUseCase(usersRepository)
    })

    it('should be able to register', async () => {

        const { user } = await sut.execute({
            name: "teste",
            email: "teste@teste.com",
            password: "123456"
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('should not be able to register with same email twice', async () => {

        const email = 'teste2@teste.com'

        await sut.execute({
            name: "teste",
            email,
            password: "123456"
        })

        await expect(() =>
            sut.execute({
                name: 'teste',
                email,
                password: '123456'
            })
        ).rejects.toBeInstanceOf(UserAlreadyExistsError)
    })
})