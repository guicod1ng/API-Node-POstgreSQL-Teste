# 🚀 API de Clientes

![Node.js](https://img.shields.io/badge/Node.js-20.x-339933)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1)
![JWT](https://img.shields.io/badge/auth-JWT-black)
![Deploy](https://img.shields.io/badge/deploy-Render-5C4EE5)

API REST para gerenciamento de clientes com autenticação JWT, arquitetura em camadas e deploy em nuvem.

---
## 📸 Teste via Postman 

![preview](./assets/API.png.png)

---

## ⚙️ Stack

Node.js • Express • PostgreSQL • JWT • bcrypt • Render • Neon

---

## 📌 Funcionalidades

* Autenticação (registro e login)
* CRUD de clientes
* Rotas protegidas com JWT
* Relacionamento usuário ↔ clientes
* Acesso isolado por usuário
* FOREIGN KEY com `ON DELETE CASCADE`

---

## 📁 Estrutura

```bash
src/
├── config/
├── controllers/
├── services/
├── routes/
└── middlewares/
```

---

## 🚀 Rodar local

```bash
npm install
```

**.env**
```
DATABASE_URL=postgresql://postgres:SENHA@localhost:5432/treino_db
JWT_SECRET=sua_frase_secreta
```

**sql**
```
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  email VARCHAR(100) UNIQUE,
  senha VARCHAR(255)
);

CREATE TABLE clientes (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100),
  telefone VARCHAR(20),
  usuario_id INT REFERENCES usuarios(id) ON DELETE CASCADE
);
```

```bash
npm start
```

---

## 📡 Endpoints

**Auth**

* POST `/auth/registro`
* POST `/auth/login`

**Clientes (JWT)**

* GET `/clientes`
* POST `/clientes`
* PUT `/clientes/:id`
* DELETE `/clientes/:id`

---

## 🔐 Segurança

* bcrypt (hash de senha)
* JWT com expiração
* Prepared Statements
* `.env` protegido

---

## 🌐 Deploy

Render (API) • Neon (PostgreSQL)

---

## 💡 Sobre o projeto

API desenvolvida para simular um sistema real de gerenciamento de clientes, com autenticação segura e estrutura escalável.
