#APP

GymPass style app

## RFs (Requisitos funcionais)

- [x] Deve ser possivel se cadastrar
- [x] Deve ser possivel se autenticar
- [x] Deve ser possivel obter o perfil de um usuario logado
- [ ] Deve ser possivel obter o numero de check-ins realizados pelo usuario logado
- [ ] Deve ser possivel o usuario obter seu histórico de check-ins
- [ ] Deve ser possivel o usuario buscar academias próximas
- [ ] Deve ser possivel o usuario buscar academias pelo nome
- [x] Deve ser possivel o usuario realizar check-in em uma academia
- [ ] Deve ser possivel validar o check-in de um usuario
- [x] Deve ser possivel cadastrar uma academia

## RNs (Regras de negócio)

- [x] O usuario não deve poder se cadastrar com um e-mail duplicado
- [x] O usuario não pode fazer 2 check-ins no mesmo dia
- [ ] O usuario não pode fazer check-in se não estiver perto de 100m da academia
- [ ] O check-in só pode ser validado até 20 minutos após criado
- [ ] O check-in só pode ser validado por administradores
- [ ] A academia só pode ser cadastrada por administradores

## RNFs (Requisitos não funcionais)

- [x] A senha do usuario precisa estar criptografia
- [ ] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL
- [ ] Todas as listas de dados precisam estar paginadas com 20 itens por página
- [ ] O usuario deve ser identificado por um JWT (Json Web Token)