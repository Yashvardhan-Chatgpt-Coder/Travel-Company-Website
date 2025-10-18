import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumb = ({ items }) => {
  return (
    <nav className="flex items-center space-x-1 text-sm text-slate-600 mb-6">
      <Link 
        to="/admin" 
        className="flex items-center hover:text-emerald-600 transition-colors"
      >
        <Home className="h-4 w-4 mr-1" />
        Admin
      </Link>
      
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="h-4 w-4 text-slate-400" />
          {index === items.length - 1 ? (
            <span className="text-slate-900 font-medium">{item.label}</span>
          ) : (
            <Link 
              to={item.href} 
              className="hover:text-emerald-600 transition-colors"
            >
              {item.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export { Breadcrumb };
