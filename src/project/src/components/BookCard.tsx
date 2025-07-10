import React from 'react';
import { Book, User, Calendar, CheckCircle, XCircle } from 'lucide-react';

interface BookCardProps {
  book: {
    id: number;
    titulo: string;
    autor: string;
    anoPublicacao: number;
    disponivel: boolean;
  };
  onLoan: (id: number) => void;
  onReturn: (id: number) => void;
}

export const BookCard: React.FC<BookCardProps> = ({ book, onLoan, onReturn }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-gray-100">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Book className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-800 leading-tight">
              {book.titulo}
            </h3>
            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <User className="h-4 w-4" />
                <span>{book.autor}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{book.anoPublicacao}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {book.disponivel ? (
            <div className="flex items-center space-x-1 text-green-600 bg-green-50 px-2 py-1 rounded-full">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm font-medium">Disponível</span>
            </div>
          ) : (
            <div className="flex items-center space-x-1 text-red-600 bg-red-50 px-2 py-1 rounded-full">
              <XCircle className="h-4 w-4" />
              <span className="text-sm font-medium">Emprestado</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex justify-end space-x-2 mt-4">
        {book.disponivel ? (
          <button
            onClick={() => onLoan(book.id)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
          >
            Emprestar
          </button>
        ) : (
          <button
            onClick={() => onReturn(book.id)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
          >
            Devolver
          </button>
        )}
      </div>
    </div>
  );
};