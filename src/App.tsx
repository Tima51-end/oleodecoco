
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import IntroBlock from "./components/IntroBlock";
import Header from "./components/Header";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
}

function App() {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen bg-neutral-100 font-inter" >
      <ScrollToTop />
      <Header />
      {location.pathname === "/" && <IntroBlock />}
      <main
      
        className={`flex-grow ${
          location.pathname === "/contact" ? "" : "container mx-auto px-4 py-8"
        }`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            <AppRoutes />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

export default App;
