# User Data Processing API

API RESTful para processamento e consulta de dados de usuários a partir de arquivos JSON.

## 📋 Características

- Upload e processamento de arquivos JSON com milhares de usuários
- Validação robusta de dados
- Processamento em lotes para melhor performance
- Consulta individual de usuários por ID
- Listagem paginada de usuários
- Tratamento de erros completo
- Dockerizado para fácil execução

## 🛠️ Tecnologias

- **Node.js** com **TypeScript**
- **Express** - Framework web
- **MongoDB** com **Mongoose** - Banco de dados
- **Multer** - Upload de arquivos
- **Docker** e **Docker Compose** - Containerização

## 📁 Estrutura do Projeto
api/
├── src/
│ ├── config/ # Configurações (database)
│ ├── controllers/ # Controladores
│ ├── middlewares/ # Middlewares (upload, error handler)
│ ├── models/ # Models do Mongoose
│ ├── routes/ # Rotas da API
│ ├── services/ # Lógica de negócio
│ ├── types/ # Definições TypeScript
│ ├── utils/ # Utilitários (validadores)
│ └── app.ts # Ponto de entrada


## 🚀 Pré-requisitos

- **Docker** e **Docker Compose** instalados
- **Node.js 18+** (se rodar localmente sem Docker)

## 📦 Instalação e Execução

### Opção 1: Usando Docker (Recomendado)

1. **Clone o repositório:**
```bash
git clone <seu-repositorio>
cd user-data-api

Configure as variáveis de ambiente:

cp api/.env.example api/.env

Inicie os containers:

docker-compose up --build

A API estará disponível em http://localhost:3000

Opção 2: Execução Local

Instale o MongoDB localmente ou use uma instância cloud

Instale as dependências:

cd api
npm install

Configure o .env:

PORT=3000
MONGODB_URI=mongodb://localhost:27017/userdata
NODE_ENV=development

Execute em modo desenvolvimento:

npm run dev

Ou compile e execute:

npm run build
npm start


📡 Endpoints da API
1. Health Check
http

GET /health
Resposta:

JSON

{
  "status": "OK",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
2. Upload de Arquivo JSON
http

POST /api/users/upload
Content-Type: multipart/form-data
Body (form-data):

file: arquivo JSON com array de usuários
Exemplo de arquivo JSON:

JSON

[
  {
    "id": "5df38f6e695566a48211da8f",
    "first_name": "Blankenship",
    "last_name": "Vincent",
    "email": "blankenshipvincent@rocklogic.com"
  }
]
Resposta de Sucesso:

JSON

{
  "message": "Arquivo processado com sucesso",
  "data": {
    "total_records": 32000,
    "successful_imports": 31850,
    "failed_imports": 150,
    "processing_time_ms": 5432
  }
}
3. Buscar Usuário por ID
http

GET /api/users/:id
Exemplo:

http

GET /api/users/5df38f6e695566a48211da8f
Resposta:

JSON

{
  "user": {
    "id": "5df38f6e695566a48211da8f",
    "first_name": "Blankenship",
    "last_name": "Vincent",
    "email": "blankenshipvincent@rocklogic.com"
  }
}
4. Listar Usuários (com paginação)
http

GET /api/users?page=1&limit=100
Resposta:

JSON

{
  "users": [...],
  "pagination": {
    "total": 32000,
    "page": 1,
    "limit": 100,
    "total_pages": 320
  }
}
🧪 Testando com cURL
Upload do arquivo:
Bash

curl -X POST http://localhost:3000/api/users/upload \
  -F "file=@mock-data.json"
Buscar usuário:
Bash

curl http://localhost:3000/api/users/5df38f6e695566a48211da8f
Listar usuários:
Bash

curl "http://localhost:3000/api/users?page=1&limit=10"
🧪 Testando com Postman
Upload de Arquivo:
Método: POST
URL: http://localhost:3000/api/users/upload
Body → form-data
Key: file (tipo: File)
Value: Selecione o arquivo mock-data.json
Buscar Usuário:
Método: GET
URL: http://localhost:3000/api/users/{id}
🔧 Comandos Docker Úteis
Bash

# Iniciar containers
docker-compose up -d

# Ver logs
docker-compose logs -f api

# Parar containers
docker-compose down

# Rebuild
docker-compose up --build

# Limpar volumes
docker-compose down -v
📊 Performance
A API foi otimizada para processar grandes volumes de dados:

✅ Inserção em lotes (batch insert) de 1000 registros
✅ Índices otimizados no MongoDB
✅ Validação eficiente de dados
✅ Processamento assíncrono
✅ ~32.000 registros processados em menos de 10 segundos

📝 Boas Práticas Implementadas
✅ Arquitetura em camadas (Controller → Service → Model)
✅ Separação de responsabilidades
✅ Validação de dados robusta
✅ Tratamento de erros centralizado
✅ TypeScript para type safety
✅ Código limpo e documentado
✅ Variáveis de ambiente
✅ Dockerização completa

# user-data-api
