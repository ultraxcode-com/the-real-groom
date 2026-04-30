import { Link } from "react-router-dom";
import {
  BadgeCheck,
  Scissors,
  ShieldCheck,
  Sparkles,
  Truck,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";

export function About() {
  return (
    <main className="bg-[#f6f0e7]">
      <section className="relative overflow-hidden bg-[#181511] px-6 py-20 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#d6a84f33,transparent_35%)]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <p className="mb-3 text-sm font-black uppercase tracking-[0.25em] text-[#d6a84f]">
              Sobre The Real Groom
            </p>

            <h1 className="text-4xl font-black leading-tight md:text-6xl">
              Una marca especializada en grooming profesional.
            </h1>

            <p className="mt-6 text-lg leading-8 text-white/65">
              The Real Groom ofrece productos profesionales para peluquería
              canina: tijeras, peines, cardas, cosmética, herramientas,
              accesorios y formación para groomers que buscan calidad,
              precisión y resultados.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <Info icon={<Scissors />} title="Herramientas premium" />
              <Info icon={<Truck />} title="Envíos 24/48h" />
              <Info icon={<ShieldCheck />} title="Compra segura" />
              <Info icon={<BadgeCheck />} title="Catálogo profesional" />
            </div>

            <Link
              to="/tienda"
              className="mt-8 inline-block rounded-full bg-[#d6a84f] px-8 py-4 font-black text-[#181511] shadow-xl transition hover:scale-[1.02] hover:bg-[#b8872f]"
            >
              Ver tienda
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65 }}
            className="relative"
          >
            <div className="rounded-[2.5rem] bg-[#24201a] p-4 shadow-2xl ring-1 ring-[#d6a84f]/25">
              <div className="grid h-[480px] place-items-center rounded-[2rem] bg-white p-10">
                <div className="text-center">
                  <div className="mx-auto mb-6 grid h-28 w-28 place-items-center rounded-full bg-[#181511] text-4xl font-black text-[#d6a84f]">
                    TRG
                  </div>
                  <p className="text-xs font-black uppercase tracking-[0.3em] text-black/40">
                    The Real Groom
                  </p>
                  <h2 className="mt-3 text-4xl font-black text-[#181511]">
                    Professional Grooming
                  </h2>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 left-6 rounded-3xl bg-[#d6a84f] p-5 text-[#181511] shadow-2xl">
              <Sparkles className="mb-2" />
              <p className="text-sm font-bold text-black/60">
                Nueva experiencia
              </p>
              <p className="text-2xl font-black">Más rápida y premium</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-3">
            <ValueCard
              title="Especialización"
              text="Productos seleccionados para profesionales del grooming y peluquería canina."
            />
            <ValueCard
              title="Experiencia"
              text="Una tienda pensada para que el cliente encuentre rápido lo que necesita."
            />
            <ValueCard
              title="Confianza"
              text="Gestión conectada con WooCommerce para mantener catálogo, precios y stock."
            />
          </div>

          <div className="mt-16 grid gap-10 rounded-[2.5rem] bg-white p-8 shadow-xl ring-1 ring-black/5 lg:grid-cols-[1fr_.8fr] lg:items-center md:p-12">
            <div>
              <p className="mb-3 text-sm font-black uppercase tracking-[0.25em] text-[#b8872f]">
                Misión
              </p>
              <h2 className="text-3xl font-black text-[#181511] md:text-5xl">
                Hacer que la experiencia de compra sea tan profesional como los
                productos que se venden.
              </h2>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-black/55">
                La nueva propuesta visual mantiene la esencia de The Real Groom,
                pero organiza mejor la información, mejora la navegación móvil y
                reduce los tiempos de espera entre secciones.
              </p>
            </div>

            <div className="rounded-[2rem] bg-[#181511] p-7 text-white">
              <Users className="mb-5 text-[#d6a84f]" size={34} />
              <h3 className="text-2xl font-black">Para profesionales</h3>
              <p className="mt-3 leading-7 text-white/60">
                Una tienda enfocada en groomers, peluquerías caninas y clientes
                que buscan productos especializados.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Info({ icon, title }) {
  return (
    <div className="rounded-3xl bg-[#24201a] p-5 shadow-sm ring-1 ring-[#d6a84f]/20">
      <div className="mb-3 grid h-10 w-10 place-items-center rounded-full bg-[#d6a84f] text-[#181511]">
        {icon}
      </div>
      <p className="font-black text-white">{title}</p>
    </div>
  );
}

function ValueCard({ title, text }) {
  return (
    <article className="rounded-[2rem] bg-white p-7 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-2xl">
      <p className="mb-4 text-sm font-black uppercase tracking-[0.25em] text-[#b8872f]">
        The Real Groom
      </p>
      <h3 className="text-2xl font-black text-[#181511]">{title}</h3>
      <p className="mt-3 leading-7 text-black/55">{text}</p>
    </article>
  );
}