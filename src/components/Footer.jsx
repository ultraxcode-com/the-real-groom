import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#181511] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-4">
        <div>
          <div className="mb-5 grid h-14 w-14 place-items-center rounded-full bg-white text-lg font-black text-[#181511]">
            TRG
          </div>

          <h2 className="text-2xl font-black">The Real Groom</h2>

          <p className="mt-4 text-sm leading-7 text-white/60">
            Tienda profesional de productos para peluquería canina. Diseño
            premium, catálogo real y experiencia ecommerce moderna.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-black">Navegación</h3>
          <ul className="space-y-3 text-sm text-white/60">
            <li><Link to="/" className="hover:text-white">Inicio</Link></li>
            <li><Link to="/tienda" className="hover:text-white">Tienda</Link></li>
            <li><Link to="/cursos" className="hover:text-white">Cursos</Link></li>
            <li><Link to="/contacto" className="hover:text-white">Contacto</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-black">Categorías</h3>
          <ul className="space-y-3 text-sm text-white/60">
            <li>Tijeras profesionales</li>
            <li>Cosmética</li>
            <li>Peines y cardas</li>
            <li>Accesorios</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-black">Contacto</h3>
          <div className="space-y-3 text-sm text-white/60">
            <p>Córdoba, España</p>
            <p>+34 621 33 25 37</p>
            <p>info@therealgroom.com</p>
          </div>

          <Link
            to="/contacto"
            className="mt-6 inline-block rounded-full bg-white px-6 py-3 text-sm font-black text-[#181511] transition hover:scale-105"
          >
            Contactar
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-6 text-center text-xs font-bold uppercase tracking-wide text-white/40">
        © {new Date().getFullYear()} The Real Groom · Demo React + WooCommerce
      </div>
    </footer>
  );
};

export default Footer;