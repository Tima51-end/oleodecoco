const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; 2025 Coconut Oil Blog. All rights reserved.</p>
        <div className="mt-2">
          <a href="/privacy" className="text-gray-300 hover:text-white mx-2">Privacy Policy</a>
          <a href="/contact" className="text-gray-300 hover:text-white mx-2">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;