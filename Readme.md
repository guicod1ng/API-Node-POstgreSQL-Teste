API de Clientes - Node.js + PostgreSQL
API REST com CRUD completo e autenticação JWT.

🚀 Executar Local
bash
npm install
Configure o .env:

text
DATABASE_URL=postgresql://postgres:SENHA@localhost:5432/treino_db
JWT_SECRET=frase_secreta_longa
Crie as tabelas no PostgreSQL:

sql
CREATE TABLE clientes (id SERIAL PRIMARY KEY, nome VARCHAR(100), telefone VARCHAR(20));
CREATE TABLE usuarios (id SERIAL PRIMARY KEY, email VARCHAR(100) UNIQUE, senha VARCHAR(255));
Rode:

bash
node index.js
📡 Endpoints
Públicos
Método	Rota	Body
POST	/auth/registro	{email, senha}

POST	/auth/login	{email, senha} → retorna token

Protegidos (Header: Authorization: Bearer <token>)

Método	Rota	Body

GET	/clientes	-

POST	/clientes	{nome, telefone}

PUT	/clientes/:id	{nome, telefone}

DELETE	/clientes/:id	-

🛠 Stack
Node.js | Express | PostgreSQL | JWT | bcrypt

📁 Estrutura
text
src/
├── config/       → db.js, env.js
├── controllers/  → auth, clientes
├── services/     → queries SQL
├── routes/       → endpoints
└── middlewares/  → autenticação JWT

Status: ✅ Funcional | 📦 Pronto para Portfólio | 🔒 Seguro