import { Gym } from "generated/prisma"

export class InMemoryGymsRepository {
    public items: Gym[] = []

    async findById(id: string): Promise<Gym | null> {
        const gym = this.items.find((item) => item.id == id)

        if (!gym) {
            return null
        }

        return gym
    }
}