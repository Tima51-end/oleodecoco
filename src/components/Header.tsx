import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // можно заменить на любые иконки

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(prev => !prev);

  const navLinks = (
    <>
      <li>
        <NavLink to="/" onClick={() => setIsOpen(false)} className={({ isActive }) => isActive ? "text-green-600 font-semibold" : "text-gray-600 hover:text-green-600"}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/about" onClick={() => setIsOpen(false)} className={({ isActive }) => isActive ? "text-green-600 font-semibold" : "text-gray-600 hover:text-green-600"}>
          About
        </NavLink>
      </li>
      <li>
        <NavLink to="/blog" onClick={() => setIsOpen(false)} className={({ isActive }) => isActive ? "text-green-600 font-semibold" : "text-gray-600 hover:text-green-600"}>
          Blog
        </NavLink>
      </li>
      <li>
        <NavLink to="/contact" onClick={() => setIsOpen(false)} className={({ isActive }) => isActive ? "text-green-600 font-semibold" : "text-gray-600 hover:text-green-600"}>
          Contact
        </NavLink>
      </li>
      <li>
        <NavLink to="/privacy" onClick={() => setIsOpen(false)} className={({ isActive }) => isActive ? "text-green-600 font-semibold" : "text-gray-600 hover:text-green-600"}>
          Privacy
        </NavLink>
      </li>
    </>
  );

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-green-600">Coconut Oil Blog</h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 items-center">
          {navLinks}
        </ul>

        {/* Mobile menu button */}
        <button onClick={toggleMenu} className="md:hidden text-gray-800 focus:outline-none">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <ul className="md:hidden bg-white shadow-md px-4 py-4 space-y-4">
          {navLinks}
        </ul>
      )}
    </header>
  );
};

export default Header;
