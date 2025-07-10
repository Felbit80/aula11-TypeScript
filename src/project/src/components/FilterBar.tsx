import React from 'react';
import { Search, Filter, BookOpen } from 'lucide-react';

interface FilterBarProps {
  autorFilter: string;
  setAutorFilter: (value: string) => void;
  disponibilidadeFilter: string;
  setDisponibilidadeFilter: (value: string) => void;
  onAddBook: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  autorFilter,
  setAutorFilter,
  disponibilidadeFilter,
  setDisponibilidadeFilter,
  onAddBook
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Filter className="h-5 w-5 text-blue-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-800">Filtros</h2>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Filtrar por autor..."
              value={autorFilter}
              onChange={(e) => setAutorFilter(e.target.value)}
              className="pl-10 pr-4 py-2 w-full md:w-64 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={disponibilidadeFilter}
            onChange={(e) => setDisponibilidadeFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Todos os livros</option>
            <option value="true">Disponíveis</option>
            <option value="false">Emprestados</option>
          </select>
          
          <button
            onClick={onAddBook}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <BookOpen className="h-4 w-4" />
            <span>Adicionar Livro</span>
          </button>
        </div>
      </div>
    </div>
  );
};