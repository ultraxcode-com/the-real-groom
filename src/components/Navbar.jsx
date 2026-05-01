import { Link, NavLink } from "react-router-dom";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "../context/CartContext";

const goldText =
  "bg-gradient-to-r from-[#8C6A2A] via-[#D4AF37] to-[#F4E6C3] bg-clip-text text-transparent drop-shadow-[0_0_14px_rgba(212,175,55,0.25)]";

const goldButton =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#8C6A2A] via-[#D4AF37] to-[#F4E6C3] px-5 py-3 font-black text-[#181511] shadow-[0_0_22px_rgba(212,175,55,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_0_32px_rgba(212,175,55,0.55)]";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { cartCount } = useCart();

  const navClass = ({ isActive }) =>
    `font-bold transition ${
      isActive ? goldText : "text-white/70 hover:text-white"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-[#D4AF37]/15 bg-[#100e0b]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
        
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-r from-[#8C6A2A] via-[#D4AF37] to-[#F4E6C3] text-lg font-black text-[#181511] shadow-[0_0_22px_rgba(212,175,55,0.35)]">
            TRG
          </div>

          <div>
            <p className={`text-xl font-black leading-none ${goldText}`}>
              The Real Groom
            </p>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/45">
              Professional Grooming Store
            </p>
          </div>
        </Link>

        {/* DESKTOP MENU */}
        <nav className="hidden items-center gap-8 md:flex">
          <NavLink to="/" className={navClass}>
            Inicio
          </NavLink>

          <NavLink to="/tienda" className={navClass}>
            Tienda
          </NavLink>

          <NavLink to="/cursos" className={navClass}>
            Cursos
          </NavLink>

          <NavLink to="/the-real-groom" className={navClass}>
            The Real Groom
          </NavLink>

          <NavLink to="/contacto" className={navClass}>
            Contacto
          </NavLink>
        </nav>

        {/* CART DESKTOP */}
        <div className="hidden md:block">
          <CartButton cartCount={cartCount} />
        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="grid h-11 w-11 place-items-center rounded-xl border border-[#D4AF37]/25 bg-[#24201a] text-white md:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="border-t border-[#D4AF37]/15 bg-[#100e0b] px-4 py-5 md:hidden">
          <nav className="flex flex-col gap-4">

            <NavLink onClick={() => setOpen(false)} to="/" className={navClass}>
              Inicio
            </NavLink>

            <NavLink onClick={() => setOpen(false)} to="/tienda" className={navClass}>
              Tienda
            </NavLink>

            <NavLink onClick={() => setOpen(false)} to="/cursos" className={navClass}>
              Cursos
            </NavLink>

            {/* 🔥 CORREGIDO */}
            <NavLink
              onClick={() => setOpen(false)}
              to="/the-real-groom"
              className={navClass}
            >
              The Real Groom
            </NavLink>

            <NavLink onClick={() => setOpen(false)} to="/contacto" className={navClass}>
              Contacto
            </NavLink>

            <div onClick={() => setOpen(false)} className="mt-2">
              <CartButton cartCount={cartCount} />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

function CartButton({ cartCount }) {
  return (
    <Link to="/carrito" className=" trg-gold-btn relative">
      <ShoppingBag size={20} />
      Carrito

      {cartCount > 0 && (
        <span className="absolute -right-2 -top-2 grid h-6 min-w-6 place-items-center rounded-full border border-[#181511] bg-red-600 px-1 text-xs font-black text-white shadow-lg">
          {cartCount}
        </span>
      )}
    </Link>
  );
}