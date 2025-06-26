import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState<string>(
    window.location.pathname
  );

  const toggleMenu = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname);
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const links = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/blog", label: "Blog" },
    { to: "/contact", label: "Contact" },
    { to: "/privacy", label: "Privacy" },
  ];

  const navLinks = (
    <>
      {links.map(({ to, label }) => {
        const isActive = currentPath === to;
        return (
          <li key={to}>
            <a
              href={to}
              onClick={() => {
                setCurrentPath(to);
                setIsOpen(false);
              }}
              className={`transition-colors duration-300 px-3 py-2 rounded-md text-sm font-medium ${
                isActive
                  ? "text-green-600 font-semibold bg-green-50"
                  : "text-gray-700 hover:text-green-600 hover:bg-gray-100"
              }`}
            >
              {label}
            </a>
          </li>
        );
      })}
    </>
  );

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div>
          <a
            href="/"
            className="text-xl md:text-2xl font-bold text-green-600 tracking-tight"
          >
            Oleodecoco
          </a>
        </div>
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
