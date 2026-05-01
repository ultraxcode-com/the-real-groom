import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Truck, ShieldCheck, BadgeCheck } from "lucide-react";

const goldText =
  "bg-gradient-to-r from-[#8C6A2A] via-[#D4AF37] to-[#F4E6C3] bg-clip-text text-transparent drop-shadow-[0_0_14px_rgba(212,175,55,0.25)]";

function FooterBenefit({ icon, title, text }) {
  return (
    <div className="rounded-2xl border border-[#D4AF37]/15 bg-[#24201a] p-5">
      <div className="mb-3 text-[#D4AF37] drop-shadow-[0_0_12px_rgba(212,175,55,0.35)]">
        {icon}
      </div>
      <p className="font-black text-white">{title}</p>
      <p className="mt-1 text-sm text-white/50">{text}</p>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-[#D4AF37]/15 bg-[#100e0b] px-4 pt-14 text-white md:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid gap-5 md:grid-cols-3">
          <FooterBenefit
            icon={<Truck size={24} />}
            title="Envíos 24/48h"
            text="Logística para profesionales"
          />
          <FooterBenefit
            icon={<ShieldCheck size={24} />}
            title="Pago seguro"
            text="Compra protegida"
          />
          <FooterBenefit
            icon={<BadgeCheck size={24} />}
            title="Grooming profesional"
            text="Productos y formación especializada"
          />
        </div>

        <div className="grid gap-10 border-t border-[#D4AF37]/15 py-12 md:grid-cols-[1.2fr_.7fr_.7fr_1fr]">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <div className="grid h-14 w-14 place-items-center rounded-xl bg-gradient-to-r from-[#8C6A2A] via-[#D4AF37] to-[#F4E6C3] text-xl font-black text-[#181511] shadow-[0_0_22px_rgba(212,175,55,0.35)]">
                TRG
              </div>

              <div>
                <p className={`text-2xl font-black leading-none ${goldText}`}>
                  The Real Groom
                </p>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/45">
                  Professional Grooming Store
                </p>
              </div>
            </div>

            <p className="max-w-sm leading-7 text-white/55">
              Tienda profesional de productos para peluquería canina,
              cosmética, herramientas y formación para groomers.
            </p>
          </div>

          <div>
            <h3 className={`mb-5 text-sm font-black uppercase tracking-[0.25em] ${goldText}`}>
              Navegación
            </h3>

            <div className="flex flex-col gap-3 text-white/60">
              <Link className="hover:text-white" to="/">
                Inicio
              </Link>
              <Link className="hover:text-white" to="/tienda">
                Tienda
              </Link>
              <Link className="hover:text-white" to="/cursos">
                Cursos
              </Link>
              <Link className="hover:text-white" to="/sobre-nosotros">
                Sobre nosotros
              </Link>
              <Link className="hover:text-white" to="/contacto">
                Contacto
              </Link>
            </div>
          </div>

          <div>
            <h3 className={`mb-5 text-sm font-black uppercase tracking-[0.25em] ${goldText}`}>
              Categorías
            </h3>

            <div className="flex flex-col gap-3 text-white/60">
              <Link className="hover:text-white" to="/tienda">
                Tijeras profesionales
              </Link>
              <Link className="hover:text-white" to="/tienda">
                Cosmética
              </Link>
              <Link className="hover:text-white" to="/tienda">
                Peines y cardas
              </Link>
              <Link className="hover:text-white" to="/tienda">
                Accesorios
              </Link>
              <Link className="hover:text-white" to="/cursos">
                Formación
              </Link>
            </div>
          </div>

          <div>
            <h3 className={`mb-5 text-sm font-black uppercase tracking-[0.25em] ${goldText}`}>
              Contacto
            </h3>

            <div className="space-y-4 text-white/60">
              <p className="flex gap-3">
                <MapPin className="mt-1 shrink-0 text-[#D4AF37]" size={18} />
                Fernando Amor y Mayor, 1, Noroeste, 14011 Córdoba
              </p>

              <p className="flex items-center gap-3">
                <Phone className="text-[#D4AF37]" size={18} />
                +34 621 33 25 37
              </p>

              <p className="flex items-center gap-3">
                <Mail className="text-[#D4AF37]" size={18} />
                info@therealgroom.com
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-[#D4AF37]/15 py-6 text-sm text-white/40 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} The Real Groom. Todos los derechos reservados.</p>
          <p>Diseño premium ecommerce · React + WooCommerce</p>
        </div>
      </div>
    </footer>
  );
}