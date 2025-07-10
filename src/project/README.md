# Sistema de Biblioteca

Uma aplicação completa de gerenciamento de biblioteca com API REST e interface web moderna.

## 🚀 Funcionalidades

### API REST
- **POST /livros** - Criar novo livro
- **GET /livros** - Listar livros (com filtros por autor e disponibilidade)
- **PATCH /livros/:id/emprestar** - Emprestar livro
- **PATCH /livros/:id/devolver** - Devolver livro
- **GET /livros/:id** - Obter livro por ID
- **GET /health** - Health check

### Validações
- ✅ Ano de publicação não pode ser futuro
- ✅ Não permite empréstimo de livro indisponível
- ✅ Validação de campos obrigatórios
- ✅ Tratamento de erros completo

### Interface Web
- 📱 Design responsivo e moderno
- 🎨 Interface intuitiva com Tailwind CSS
- 🔍 Filtros em tempo real
- 📊 Dashboard com estatísticas
- 🔔 Notificações de sucesso/erro

## 🛠️ Tecnologias

- **Backend**: Node.js, Express, Prisma ORM
- **Frontend**: React, TypeScript, Tailwind CSS
- **Database**: SQLite (desenvolvimento)
- **Icons**: Lucide React

## 🏃‍♂️ Como executar

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar o banco de dados
```bash
npm run db:generate
npm run db:migrate
```

### 3. Iniciar a aplicação
```bash
npm run dev
```

A aplicação será executada em:
- Frontend: http://localhost:5173
- Backend: http://localhost:3001

## 📡 Testando a API

### Criar livro
```bash
curl -X POST http://localhost:3001/livros \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Dom Casmurro",
    "autor": "Machado de Assis",
    "anoPublicacao": 1899
  }'
```

### Listar livros
```bash
curl http://localhost:3001/livros
```

### Filtrar por autor
```bash
curl "http://localhost:3001/livros?autor=Machado"
```

### Filtrar por disponibilidade
```bash
curl "http://localhost:3001/livros?disponivel=true"
```

### Emprestar livro
```bash
curl -X PATCH http://localhost:3001/livros/1/emprestar
```

### Devolver livro
```bash
curl -X PATCH http://localhost:3001/livros/1/devolver
```

## 🗃️ Estrutura do Banco

```sql
CREATE TABLE livros (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  titulo TEXT NOT NULL,
  autor TEXT NOT NULL,
  anoPublicacao INTEGER NOT NULL,
  disponivel BOOLEAN DEFAULT TRUE,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## 📝 Scripts disponíveis

- `npm run dev` - Inicia frontend e backend
- `npm run dev:frontend` - Inicia apenas o frontend
- `npm run dev:backend` - Inicia apenas o backend
- `npm run db:migrate` - Executa migrações do banco
- `npm run db:generate` - Gera cliente Prisma
- `npm run db:studio` - Abre Prisma Studio
- `npm run build` - Build da aplicação
- `npm run lint` - Executa linting

## 🔧 Configuração adicional

### Variáveis de ambiente (.env)
```env
DATABASE_URL="file:./dev.db"
PORT=3001
```

### Para usar com PostgreSQL
```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/biblioteca"
```

## 🧪 Testando com Postman/Insomnia

Importe a coleção de requests ou crie manualmente:

1. **Criar Livro** - POST http://localhost:3001/livros
2. **Listar Livros** - GET http://localhost:3001/livros
3. **Filtrar por Autor** - GET http://localhost:3001/livros?autor=Machado
4. **Filtrar Disponíveis** - GET http://localhost:3001/livros?disponivel=true
5. **Emprestar Livro** - PATCH http://localhost:3001/livros/1/emprestar
6. **Devolver Livro** - PATCH http://localhost:3001/livros/1/devolver

## 📄 Licença

Este projeto está sob a licença MIT.