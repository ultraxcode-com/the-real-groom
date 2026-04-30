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
    <header className="sticky top-0 z-50 bg-[#181511] text-white shadow-2xl">
      <div className="border-b border-[#d6a84f]/25 bg-black px-4 py-2 text-center text-[11px] font-black uppercase tracking-[0.18em] text-[#d6a84f]">
        Envío gratis desde 75€ · Envíos 24/48h · Precio especial para profesionales
      </div>

      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
        <Link to="/" className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#d6a84f] text-sm font-black text-[#181511] shadow-lg">
            TRG
          </div>

          <div>
            <h1 className="text-lg font-black leading-none tracking-tight text-white md:text-xl">
              The Real Groom
            </h1>
            <p className="mt-1 text-[11px] font-bold tracking-wide text-white/60">
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
                  `text-sm font-black tracking-wide transition ${
                    isActive
                      ? "text-[#d6a84f]"
                      : "text-white/80 hover:text-[#d6a84f]"
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button className="hidden h-11 w-11 place-items-center rounded-xl bg-white/10 text-white ring-1 ring-white/15 transition hover:bg-[#d6a84f] hover:text-[#181511] md:grid">
            <Search size={18} />
          </button>

          <button className="hidden h-11 w-11 place-items-center rounded-xl bg-white/10 text-white ring-1 ring-white/15 transition hover:bg-[#d6a84f] hover:text-[#181511] md:grid">
            <User size={18} />
          </button>

          <Link
            to="/carrito"
            className="relative grid h-11 w-11 place-items-center rounded-xl bg-[#d6a84f] text-[#181511] shadow-lg transition hover:bg-[#b8872f] md:flex md:w-auto md:gap-2 md:px-5"
          >
            <ShoppingBag size={18} />
            <span className="hidden text-sm font-black md:block">Carrito</span>

            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-white text-[11px] font-black text-[#181511]">
                {cartCount}
              </span>
            )}
          </Link>

          <button
            onClick={() => setOpen(true)}
            className="grid h-11 w-11 place-items-center rounded-xl bg-white/10 text-white ring-1 ring-white/15 lg:hidden"
          >
            <Menu />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.aside
              className="ml-auto h-full w-[84%] max-w-sm bg-[#181511] p-6 text-white shadow-2xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
            >
              <div className="mb-10 flex items-center justify-between">
                <div>
                  <p className="text-xl font-black text-white">
                    The Real Groom
                  </p>
                  <p className="text-sm font-bold text-[#d6a84f]">Menú</p>
                </div>

                <button
                  onClick={() => setOpen(false)}
                  className="grid h-10 w-10 place-items-center rounded-xl bg-white/10"
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
                    className="block rounded-xl bg-white/10 px-5 py-4 text-lg font-black text-white ring-1 ring-white/10 transition hover:bg-[#d6a84f] hover:text-[#181511]"
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