import React, { useState } from 'react';
import { BookPlus, X } from 'lucide-react';

interface AddBookFormProps {
  onAdd: (book: { titulo: string; autor: string; anoPublicacao: number }) => void;
  onClose: () => void;
}

export const AddBookForm: React.FC<AddBookFormProps> = ({ onAdd, onClose }) => {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [anoPublicacao, setAnoPublicacao] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!titulo || !autor || !anoPublicacao) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    const year = parseInt(anoPublicacao);
    const currentYear = new Date().getFullYear();
    
    if (year > currentYear) {
      alert('Ano de publicação não pode ser futuro');
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onAdd({
        titulo,
        autor,
        anoPublicacao: year
      });
      
      // Reset form
      setTitulo('');
      setAutor('');
      setAnoPublicacao('');
      onClose();
    } catch (error) {
      console.error('Erro ao adicionar livro:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BookPlus className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Adicionar Livro</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Título
            </label>
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Digite o título do livro"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Autor
            </label>
            <input
              type="text"
              value={autor}
              onChange={(e) => setAutor(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Digite o nome do autor"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ano de Publicação
            </label>
            <input
              type="number"
              value={anoPublicacao}
              onChange={(e) => setAnoPublicacao(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Digite o ano de publicação"
              min="1000"
              max={new Date().getFullYear()}
              required
            />
          </div>

          <div className="flex space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Adicionando...' : 'Adicionar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};