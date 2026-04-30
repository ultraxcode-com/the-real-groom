import { Link } from "react-router-dom";
import {
  Mail,
  MapPin,
  Phone,
  Scissors,
  ShieldCheck,
  Truck,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#181511] text-white">
      <div className="border-b border-[#d6a84f]/20">
        <div className="mx-auto grid max-w-7xl gap-5 px-6 py-8 md:grid-cols-3">
          <FooterBenefit
            icon={<Truck size={20} />}
            title="Envíos 24/48h"
            text="Logística actual de la tienda"
          />
          <FooterBenefit
            icon={<ShieldCheck size={20} />}
            title="Pago seguro"
            text="Compatible con WooCommerce"
          />
          <FooterBenefit
            icon={<Scissors size={20} />}
            title="Grooming profesional"
            text="Productos para profesionales"
          />
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-[1.2fr_.8fr_.8fr_1fr]">
        <div>
          <div className="mb-5 grid h-14 w-14 place-items-center rounded-full bg-[#d6a84f] text-lg font-black text-[#181511] shadow-xl">
            TRG
          </div>

          <h2 className="text-2xl font-black">The Real Groom</h2>

          <p className="mt-4 text-sm leading-7 text-white/60">
            Tienda profesional de productos para peluquería canina, cosmética,
            herramientas y formación para groomers.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-black text-[#d6a84f]">
            Navegación
          </h3>

          <ul className="space-y-3 text-sm text-white/60">
            <li>
              <Link to="/" className="transition hover:text-[#d6a84f]">
                Inicio
              </Link>
            </li>
            <li>
              <Link to="/tienda" className="transition hover:text-[#d6a84f]">
                Tienda
              </Link>
            </li>
            <li>
              <Link to="/cursos" className="transition hover:text-[#d6a84f]">
                Cursos
              </Link>
            </li>
            <li>
              <Link
                to="/sobre-nosotros"
                className="transition hover:text-[#d6a84f]"
              >
                Sobre nosotros
              </Link>
            </li>
            <li>
              <Link to="/contacto" className="transition hover:text-[#d6a84f]">
                Contacto
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-black text-[#d6a84f]">
            Categorías
          </h3>

          <ul className="space-y-3 text-sm text-white/60">
            <li>Tijeras profesionales</li>
            <li>Cosmética</li>
            <li>Peines y cardas</li>
            <li>Accesorios</li>
            <li>Formación</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-black text-[#d6a84f]">Contacto</h3>

          <div className="space-y-4 text-sm text-white/60">
            <p className="flex items-center gap-3">
              <MapPin size={17} className="text-[#d6a84f]" />
              Córdoba, España
            </p>

            <p className="flex items-center gap-3">
              <Phone size={17} className="text-[#d6a84f]" />
              +34 621 33 25 37
            </p>

            <p className="flex items-center gap-3">
              <Mail size={17} className="text-[#d6a84f]" />
              info@therealgroom.com
            </p>
          </div>

          <Link
            to="/contacto"
            className="mt-6 inline-block rounded-full bg-[#d6a84f] px-6 py-3 text-sm font-black text-[#181511] shadow-xl transition hover:scale-105 hover:bg-[#b8872f]"
          >
            Contactar
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-6 text-center text-xs font-bold uppercase tracking-wide text-white/40">
        © {new Date().getFullYear()} The Real Groom · React + WooCommerce
      </div>
    </footer>
  );
};

function FooterBenefit({ icon, title, text }) {
  return (
    <div className="rounded-3xl bg-[#24201a] p-5 ring-1 ring-[#d6a84f]/20">
      <div className="mb-3 grid h-10 w-10 place-items-center rounded-full bg-[#d6a84f] text-[#181511]">
        {icon}
      </div>
      <p className="font-black">{title}</p>
      <p className="mt-1 text-sm text-white/50">{text}</p>
    </div>
  );
}

export default Footer;