# RebirthIt API
A **API** da rede social RebirthIt, desenvolvida com **TypeScript**, **Express**, **Prisma** e **PostgreSQL**. A API permite a criação, edição, interação e autenticação de perfis, postagens e amizades dentro da plataforma. ([english version]())
## Tecnologias Utilizadas
- **TypeScript**: Para garantir tipagem estática e maior segurança no desenvolvimento.
- **Express**: Framework para construção de APIs em Node.js.
- **Prisma**: ORM para facilitar a interação com o banco de dados PostgreSQL.
- **PostgreSQL**: Banco de dados relacional utilizado para armazenar os dados.
- **JWT**: Para autenticação e controle de sessão.
- **bcrypt**: Para hash de senhas.
- **Zod**: Para validação de dados de entrada.
- **Swagger**: Para documentação da API.
## Pré-requisitos
Antes de executar o projeto, certifique-se de ter as seguintes ferramentas instaladas:
- **Node.js** (Recomendado: versão 18+)
- **PostgreSQL** (ou Docker para executar o banco de dados)
- **Prisma CLI** (Usado para rodar as migrações)
## Estrutura do Projeto
Aqui está uma visão geral das principais pastas e arquivos do repositório:
```bash
rebirthit-api-ts
┣ .env # Variáveis de ambiente
┣ README.md # Documentação do projeto
┣ app.ts # Configuração e inicialização do servidor Express
┣ server.ts # Arquivo de inicialização do servidor
┣ dist/ # Arquivos compilados
┣ docs/ # Documentação em português
┃   ┗ LEIAME.md
┣ package-lock.json # Arquivo de bloqueio de dependências
┣ package.json # Dependências do projeto
┣ prisma/ # Arquivos de migrações e esquema do banco de dados
┃   ┣ migrations/
┃   ┗ schema.prisma
┣ src/
┃   ┣ config/ # Arquivos de configuração (JWT, Prisma)
┃   ┣ controllers/ # Controladores para manipulação de rotas
┃   ┣ errors/ # Classes de erro personalizadas
┃   ┣ middlewares/ # Middlewares para validação e tratamento de erros
┃   ┣ models/ # Modelos de dados
┃   ┣ routes/ # Definição das rotas da API
┃   ┣ schemas/ # Validação de dados com Zod
┃   ┗ services/ # Lógica de negócio
┣ tsconfig.json # Configuração do TypeScript
```
## Como Executar o Projeto
1. Clone o repositório:
```bash
git clone https://github.com/YOUR_USER/rebirthit-api-ts.git &&
cd rebirthit-api-ts
```
2. Instale as dependências
```bash
npm install
```
3. Configure o banco de dados
   - Crie um banco de dados PostgreSQL.
   - No arquivo `.env`, defina a URL de conexão com o banco de dados:
```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/rebirthit"
```
4. Execute as migrações do Prisma para criar as tabelas:
```bash
npx prisma migrate deploy
```
5. Inicie o servidor
```bash
npm run dev
```
A API estará rodando em [http://localhost:3000](http://localhost:3000)
## Documentação da API com Swagger
A documentação da API é gerada usando **Swagger** e pode ser acessada em:
```bash
http://localhost:3000/api-docs
```
Isso fornece uma referência completa para todos os endpoints disponíveis, seus inputs esperados e respostas.
## Como Contribuir
1. Faça um fork do repositório.
2. Crie um branch para sua feature (`git checkout -b feature/nome-da-feature`).
3. Faça commit das suas alterações (`git commit -m 'Adicionar feature'`).
4. Envie para o repositório remoto (`git push origin feature/nome-da-feature`).
5. Crie um pull request.