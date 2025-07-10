import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Validation helpers
const validateAnoPublicacao = (ano) => {
  const currentYear = new Date().getFullYear();
  return ano <= currentYear;
};

// Routes

// POST /livros - Criar novo livro
app.post('/livros', async (req, res) => {
  try {
    const { titulo, autor, anoPublicacao } = req.body;

    // Validações
    if (!titulo || !autor || !anoPublicacao) {
      return res.status(400).json({
        error: 'Título, autor e ano de publicação são obrigatórios'
      });
    }

    if (!validateAnoPublicacao(anoPublicacao)) {
      return res.status(400).json({
        error: 'Ano de publicação não pode ser futuro'
      });
    }

    const livro = await prisma.livro.create({
      data: {
        titulo,
        autor,
        anoPublicacao: parseInt(anoPublicacao),
        disponivel: true
      }
    });

    res.status(201).json(livro);
  } catch (error) {
    console.error('Erro ao criar livro:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// GET /livros - Listar livros com filtros
app.get('/livros', async (req, res) => {
  try {
    const { autor, disponivel } = req.query;

    const where = {};
    
    if (autor) {
      where.autor = {
        contains: autor,
        mode: 'insensitive'
      };
    }

    if (disponivel !== undefined) {
      where.disponivel = disponivel === 'true';
    }

    const livros = await prisma.livro.findMany({
      where,
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json(livros);
  } catch (error) {
    console.error('Erro ao listar livros:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// PATCH /livros/:id/emprestar - Emprestar livro
app.patch('/livros/:id/emprestar', async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar se o livro existe
    const livro = await prisma.livro.findUnique({
      where: { id: parseInt(id) }
    });

    if (!livro) {
      return res.status(404).json({ error: 'Livro não encontrado' });
    }

    // Verificar se o livro está disponível
    if (!livro.disponivel) {
      return res.status(400).json({
        error: 'Não é possível emprestar um livro indisponível'
      });
    }

    // Marcar como indisponível
    const livroAtualizado = await prisma.livro.update({
      where: { id: parseInt(id) },
      data: { disponivel: false }
    });

    res.json(livroAtualizado);
  } catch (error) {
    console.error('Erro ao emprestar livro:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// PATCH /livros/:id/devolver - Devolver livro (funcionalidade adicional)
app.patch('/livros/:id/devolver', async (req, res) => {
  try {
    const { id } = req.params;

    const livro = await prisma.livro.findUnique({
      where: { id: parseInt(id) }
    });

    if (!livro) {
      return res.status(404).json({ error: 'Livro não encontrado' });
    }

    if (livro.disponivel) {
      return res.status(400).json({
        error: 'Este livro já está disponível'
      });
    }

    const livroAtualizado = await prisma.livro.update({
      where: { id: parseInt(id) },
      data: { disponivel: true }
    });

    res.json(livroAtualizado);
  } catch (error) {
    console.error('Erro ao devolver livro:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// GET /livros/:id - Obter livro por ID
app.get('/livros/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const livro = await prisma.livro.findUnique({
      where: { id: parseInt(id) }
    });

    if (!livro) {
      return res.status(404).json({ error: 'Livro não encontrado' });
    }

    res.json(livro);
  } catch (error) {
    console.error('Erro ao obter livro:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📚 API da Biblioteca disponível em http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🔄 Desconectando do banco de dados...');
  await prisma.$disconnect();
  process.exit(0);
});