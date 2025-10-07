import { randomUUID } from 'crypto'
import 'dotenv/config'

import type { Environment } from 'vitest/environments'

export default <Environment>{
    name: 'prisma',
    transformMode: 'ssr', // para aplicações backend usar sempre ssr
    async setup() {
        // executando os teste - Criar o banco de testes

        const schema = randomUUID()

        return {
            async teardown() {
                // Apagar o banco de testes
            }
        }
    }
}