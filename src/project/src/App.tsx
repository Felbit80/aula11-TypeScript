import React, { useState, useEffect } from 'react';
import { Library, AlertCircle, CheckCircle2 } from 'lucide-react';
import { BookCard } from './components/BookCard';
import { AddBookForm } from './components/AddBookForm';
import { FilterBar } from './components/FilterBar';

interface Book {
  id: number;
  titulo: string;
  autor: string;
  anoPublicacao: number;
  disponivel: boolean;
}

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [autorFilter, setAutorFilter] = useState('');
  const [disponibilidadeFilter, setDisponibilidadeFilter] = useState('');
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const API_URL = 'http://localhost:3001';

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const fetchBooks = async () => {
    try {
      const params = new URLSearchParams();
      if (autorFilter) params.append('autor', autorFilter);
      if (disponibilidadeFilter) params.append('disponivel', disponibilidadeFilter);

      const response = await fetch(`${API_URL}/livros?${params}`);
      if (!response.ok) throw new Error('Erro ao buscar livros');
      
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error('Erro ao buscar livros:', error);
      showNotification('error', 'Erro ao carregar livros');
    } finally {
      setLoading(false);
    }
  };

  const handleAddBook = async (bookData: { titulo: string; autor: string; anoPublicacao: number }) => {
    try {
      const response = await fetch(`${API_URL}/livros`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erro ao adicionar livro');
      }

      showNotification('success', 'Livro adicionado com sucesso!');
      await fetchBooks();
    } catch (error) {
      console.error('Erro ao adicionar livro:', error);
      showNotification('error', error instanceof Error ? error.message : 'Erro ao adicionar livro');
    }
  };

  const handleLoanBook = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/livros/${id}/emprestar`, {
        method: 'PATCH',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erro ao emprestar livro');
      }

      showNotification('success', 'Livro emprestado com sucesso!');
      await fetchBooks();
    } catch (error) {
      console.error('Erro ao emprestar livro:', error);
      showNotification('error', error instanceof Error ? error.message : 'Erro ao emprestar livro');
    }
  };

  const handleReturnBook = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/livros/${id}/devolver`, {
        method: 'PATCH',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erro ao devolver livro');
      }

      showNotification('success', 'Livro devolvido com sucesso!');
      await fetchBooks();
    } catch (error) {
      console.error('Erro ao devolver livro:', error);
      showNotification('error', error instanceof Error ? error.message : 'Erro ao devolver livro');
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [autorFilter, disponibilidadeFilter]);

  const availableBooks = books.filter(book => book.disponivel).length;
  const loanedBooks = books.filter(book => !book.disponivel).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Library className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Sistema de Biblioteca</h1>
                <p className="text-sm text-gray-600">Gerenciamento de livros e empréstimos</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{books.length}</div>
                <div className="text-sm text-gray-600">Total</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{availableBooks}</div>
                <div className="text-sm text-gray-600">Disponíveis</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{loanedBooks}</div>
                <div className="text-sm text-gray-600">Emprestados</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
          notification.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          <div className="flex items-center space-x-2">
            {notification.type === 'success' ? (
              <CheckCircle2 className="h-5 w-5" />
            ) : (
              <AlertCircle className="h-5 w-5" />
            )}
            <span className="font-medium">{notification.message}</span>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter Bar */}
        <FilterBar
          autorFilter={autorFilter}
          setAutorFilter={setAutorFilter}
          disponibilidadeFilter={disponibilidadeFilter}
          setDisponibilidadeFilter={setDisponibilidadeFilter}
          onAddBook={() => setShowAddForm(true)}
        />

        {/* Books Grid */}
        <div className="mt-8">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : books.length === 0 ? (
            <div className="text-center py-12">
              <Library className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-800 mb-2">Nenhum livro encontrado</h3>
              <p className="text-gray-600 mb-4">
                {autorFilter || disponibilidadeFilter 
                  ? 'Tente ajustar os filtros para encontrar livros'
                  : 'Comece adicionando alguns livros à biblioteca'
                }
              </p>
              <button
                onClick={() => setShowAddForm(true)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Adicionar Primeiro Livro
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {books.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  onLoan={handleLoanBook}
                  onReturn={handleReturnBook}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Add Book Form Modal */}
      {showAddForm && (
        <AddBookForm
          onAdd={handleAddBook}
          onClose={() => setShowAddForm(false)}
        />
      )}
    </div>
  );
}

export default App;