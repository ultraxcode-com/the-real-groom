import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";

const links = [
  { name: "Inicio", path: "/" },
  { name: "Tienda", path: "/tienda" },
  { name: "Cursos", path: "/cursos" },
  { name: "Sobre nosotros", path: "/sobre-nosotros" },
  { name: "Contacto", path: "/contacto" },
];

const Navbar = () => {
  const { cartCount } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-[#f7f1e8]/90 backdrop-blur-2xl">
      <div className="bg-[#1f1b16] px-4 py-2 text-center text-[11px] font-black uppercase tracking-wide text-white md:text-xs">
        Envíos 24/48h · Pago seguro · Productos profesionales para grooming
      </div>

      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
        <Link to="/" className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-full bg-[#1f1b16] text-sm font-black text-white shadow-xl">
            TRG
          </div>

          <div>
            <h1 className="text-lg font-black leading-none md:text-xl">
              The Real Groom
            </h1>
            <p className="mt-1 text-[11px] font-semibold text-black/50">
              Professional Grooming Store
            </p>
          </div>
        </Link>

        <ul className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-black transition ${
                    isActive ? "text-black" : "text-black/50 hover:text-black"
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button className="hidden h-11 w-11 place-items-center rounded-full bg-white shadow-sm ring-1 ring-black/10 md:grid">
            <Search size={18} />
          </button>

          <button className="hidden h-11 w-11 place-items-center rounded-full bg-white shadow-sm ring-1 ring-black/10 md:grid">
            <User size={18} />
          </button>

          <Link
            to="/carrito"
            className="relative grid h-11 w-11 place-items-center rounded-full bg-[#1f1b16] text-white shadow-xl md:flex md:w-auto md:gap-2 md:px-5"
          >
            <ShoppingBag size={18} />
            <span className="hidden text-sm font-black md:block">Carrito</span>

            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-white text-[11px] font-black text-black">
                {cartCount}
              </span>
            )}
          </Link>

          <button
            onClick={() => setOpen(true)}
            className="grid h-11 w-11 place-items-center rounded-full bg-white shadow-sm ring-1 ring-black/10 lg:hidden"
          >
            <Menu />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.aside
              className="ml-auto h-full w-[82%] max-w-sm bg-[#f7f1e8] p-6 shadow-2xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
            >
              <div className="mb-10 flex items-center justify-between">
                <p className="text-xl font-black">Menú</p>
                <button
                  onClick={() => setOpen(false)}
                  className="grid h-10 w-10 place-items-center rounded-full bg-white shadow-sm"
                >
                  <X />
                </button>
              </div>

              <div className="space-y-3">
                {links.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl bg-white px-5 py-4 text-lg font-black shadow-sm"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;