# Descrição do Projeto

## Requisitos de ambiente
- Node.js 22
- Executar o projeto com `npm run dev`
- Acesso padrão via https://localhost:3000/
- lista das rotas no app.js

## Funcionalidades

### Criar Usuário
- Rota: `/create`
- Método: POST
- Parâmetros:
  ```json
  {
    "name": "teste modulos",
    "email": "teste@example.com",
    "password": "123456"
  }
### Para logar
- Rota: `/login`
- Método: POST
- Parâmetros:
  ```json
  {
    "email": "example@example.com",
    "password": "password"
  }
### Para usar o Auth
- Rota: `/users`
- Método: GET
- Parâmetros:
  ```
    Auth: Bearer "Token"
