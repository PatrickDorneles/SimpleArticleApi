// comandos de terminal para trabalhar com prisma
// inicia o projeto criando o diretorio do prisma
prisma init

// gera o client com o codigo type-safe 
prisma generate

// cria as migrations para a arquitetura do banco
prisma migrate dev

// cria o schema baseado em um db existente
prisma db pull

// fluxo inicial do projeto
(prisma init) -> modifica o schema -> (prisma generate) -> (prisma migrate dev)
ou
(prisma init) -> (prisma db pull) -> (prisma generate)

// fluxo normal de modificação
modifica o schema -> (prisma generate)* -> (prisma migrate dev)
