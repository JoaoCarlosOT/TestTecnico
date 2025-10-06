
<h1 align="center" style="font-weight: bold;">📝 Teste Técnico para vaga de estágio.</h1>  

<p align="center">  
  <a href="#tech">Tecnologias</a> •   
  <a href="#start">Como rodar</a> •   
  <a href="#structure">Arquitetura</a> •  
</p>  

<p align="center"><b>API RESTful feita com Node.js, Prisma e PostgreSQL.</b></p>


<p align="center">     
  <a href="#">📱 Acesse o projeto hospedado na render.</a> 
</p>


## 📋 Pré-requisitos

* **Node.js** >= 18
* **Git**

---

## 🚀 Como rodar o projeto <a id="start"></a>

### 1. Clone o repositório

```bash
git clone <url-do-repo>
cd api_prisma_test
```

#### Setup manual
crie o arquivo `.env` da sua aplicação:
```bash
cd api_prisma_test
copy .env.example .env
```

## 📝 Comandos úteis de Migrations

```bash
npx prisma migrate dev      # Cria as tabelas no banco
npx prisma db seed          # Insere dados nas tabelas (se houver seed)
npx prisma migrate reset    # Reseta todas as migrations
```

### 3. Configure a API

```bash
cd api_prisma_test
cp .env.example .env
npm install
npx prisma migrate dev      # Executa migrations
npm run dev                 # Inicia o servidor localmente
```

> Isso iniciará o PostgreSQL e deixará o banco acessível na porta `5432`.

---

## 💻 Tecnologias utilizadas <a id="tech"></a>

### 🛠️ Backend

* Node.js
* Express
* PostgreSQL
* Prisma
* MVC
* API Restfull
* zod


## 📁 Estrutura do Projeto

```
api_prisma_test/
├── src/
│   |── config/
│   |── controllers/
│   │── models/
│   │── routes/ 
│   │── schemas/ 
│   │── types/
│   │── useCases/
│   └── index.ts
└── README.md
```



