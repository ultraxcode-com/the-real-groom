import { Link } from "react-router-dom";
import { BadgeCheck, Scissors, ShieldCheck, Sparkles, Truck } from "lucide-react";
import imgHistoria from "../assets/imgHistoria.png";
export function About() {
  return (
    <main className="bg-[#f6f0e7]">
      <section className="relative overflow-hidden px-6 py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#b8874630,transparent_35%),radial-gradient(circle_at_bottom_left,#18151118,transparent_35%)]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-sm font-black uppercase tracking-[0.25em] text-black/40">
              Sobre nosotros
            </p>

            <h1 className="text-4xl font-black leading-tight md:text-6xl">
              Más que una tienda, una marca especializada en grooming profesional.
            </h1>

            <p className="mt-6 text-lg leading-8 text-black/60">
              The Real Groom ofrece productos profesionales para peluquería
              canina: tijeras, peines, cardas, cosmética, herramientas y
              accesorios seleccionados para groomers que buscan calidad,
              precisión y resultados.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <Info icon={<Scissors />} title="Herramientas premium" />
              <Info icon={<Truck />} title="Envíos 24/48h" />
              <Info icon={<ShieldCheck />} title="Compra segura" />
              <Info icon={<BadgeCheck />} title="Catálogo real WooCommerce" />
            </div>

            <Link
              to="/tienda"
              className="mt-8 inline-block rounded-full bg-[#181511] px-8 py-4 font-black text-white shadow-xl transition hover:scale-[1.02]"
            >
              Ver tienda
            </Link>
          </div>

          <div className="relative">
            <div className="rounded-[1rem] bg-[#181511] p-4 shadow-1xl">
              <img
                src={imgHistoria}
                alt="Producto profesional The Real Groom"
                className="max-h-[900px] w-full rounded-[1.5rem] bg-black object-contain p-10"
              />
            </div>

            <div className="absolute -bottom-6 left-6 rounded-3xl bg-white p-5 shadow-2xl">
              <Sparkles className="mb-2 text-[#b88746]" />
              <p className="text-sm font-bold text-black/50">
                Nueva experiencia
              </p>
              <p className="text-2xl font-black">React + WooCommerce</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Info({ icon, title }) {
  return (
    <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-black/5">
      <div className="mb-3 grid h-10 w-10 place-items-center rounded-full bg-[#181511] text-white">
        {icon}
      </div>
      <p className="font-black">{title}</p>
    </div>
  );
}