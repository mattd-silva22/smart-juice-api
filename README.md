### Sistema de Maquinas de venda Smart Juice

### Tecnologias:

- Nest.Js
- Docker
- Prisma ORM
- PostgreSQL

### Funcionalidade:

As principais funcionalidades dessa aplicação são:

- Realizar pedidos de sucos e produtos;
- Realizar entrega de pedidos na Estação selecionada;

#### Modulo de Auth

Responsável pela gestão de autorizações dentro da aplicação.

- Realizar login;
- Autenticação via JWT;

#### Modulo de Usuário

Responsável pela gestão dos usuários e clientes cadastrados na plataforma.

- Buscar Usuário por ID;
- Buscar Usuário por Username;

#### Modulo de Produtos

Responsável pela gestão de Produtos, Receitas e Ingredientes da aplicação.

- Buscar Produto por ID;
- Pesquisar Produto;
- Listar todos os Produtos;

### Module Juice Station

Responsável pela gestão das maquinas e operação realizada pela mesmas.

- Buscar Estação por ID;
- Listar todas as Estações

### Documentação

#### Como executar o projeto

Todo projeto está disponível para uso via Docker Compose.

Para rodar o projeto via Docker bastar executar os seguintes comandos na pasta raiz do projeto:

```bash
docker-compose build --no-cache
docker-compose up

```

Após a execução verifique em seu docker se os containers foram criados com sucesso.

A API está disponível na porta localhost:3000 e o Banco de Dados na localhost:5532.

#### Autenticação

Todas as rotas da aplicação estão protegidas pelo um Guard JWT. Desta forma, é necessário realizar login na aplicação através da seguinte rota

##### Login

**POST /auth/login**

**Body :**

```json
{
  "username": "carlossilva",
  "password": "senha123"
}
```

**Resposta**s:

**Caso sucesso**

Http code: **200**
body:

```json
{
  "access_token": "seu-token-acesso"
}
```

**Caso falha**
Http code: **401**
body:

```json
{
  "message": "Invalid credentials"
}
```

**A documentação do restante da aplicação está localizado na pasta 'docs' em uma collection do ThunderClient.**
