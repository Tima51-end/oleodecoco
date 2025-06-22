import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(prev => !prev);

  const navLinks = (
    <>
      {[
        { to: '/', label: 'Home' },
        { to: '/about', label: 'About' },
        { to: '/blog', label: 'Blog' },
        { to: '/contact', label: 'Contact' },
        { to: '/privacy', label: 'Privacy' },
      ].map(({ to, label }) => (
        <li key={to}>
          <NavLink
            to={to}
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `transition-colors duration-300 px-3 py-2 rounded-md text-sm font-medium ${
                isActive
                  ? 'text-green-600 font-semibold bg-green-50'
                  : 'text-gray-700 hover:text-green-600 hover:bg-gray-100'
              }`
            }
          >
            {label}
          </NavLink>
        </li>
      ))}
    </>
  );

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold text-green-600 tracking-tight">
          Oleodecoco
        </h1>

        <ul className="hidden md:flex space-x-4 items-center">{navLinks}</ul>

        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-800 focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {isOpen && (
        <ul className="md:hidden bg-white shadow-md px-4 py-4 space-y-2 border-t border-gray-200">
          {navLinks}
        </ul>
      )}
    </header>
  );
};

export default Header;
