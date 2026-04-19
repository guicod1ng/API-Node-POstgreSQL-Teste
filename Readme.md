# API Node.js + PostgreSQL

CRUD básico de usuários para aprendizado de back-end.

## 🚀 Rodar Local

1. Instalar dependências:
   ```bash
   npm install
2. Criar arquivo .env:

text
DATABASE_URL=postgresql://postgres:SUA_SENHA@localhost:5432/meu_mentor_db

3. Criar tabela no PostgreSQL:

sql

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);
Rodar:

bash
node index.js

📡 Rotas

Método	Rota	Descrição
GET	/ping	Testa conexão com banco
GET	/usuarios	Lista todos
POST	/usuarios	Cria um novo

🔒 Segurança

.env no .gitignore

Queries parametrizadas ($1, $2) contra SQL Injection

Connection Pool