import React from 'react';
import { CATEGORIES } from '../constants';
import { Category } from '../types';
import { clsx } from 'clsx';

interface CategorySelectorProps {
  selected: Category | null;
  onSelect: (category: Category) => void;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({ selected, onSelect }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fadeIn">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          className={clsx(
            "flex flex-col items-center p-6 rounded-2xl border-2 transition-all duration-200 group relative",
            selected === cat.id
              ? "bg-white border-black shadow-none translate-y-1"
              : "bg-white border-black hover:bg-gray-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-1"
          )}
        >
          {selected === cat.id && (
             <div className="absolute top-2 right-2 w-3 h-3 bg-bitcoin rounded-full border border-black animate-pulse" />
          )}
          
          <span className="text-4xl mb-3 text-bitcoin drop-shadow-sm group-hover:scale-110 transition-transform duration-200">
            {cat.icon}
          </span>
          <span className={clsx(
            "font-black text-center text-lg leading-tight",
            selected === cat.id ? "text-black" : "text-black group-hover:text-gray-800"
          )}>
            {cat.label}
          </span>
        </button>
      ))}
    </div>
  );
};