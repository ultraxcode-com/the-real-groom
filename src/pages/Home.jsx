import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  ShieldCheck,
  Sparkles,
  Truck,
  Scissors,
  ShoppingBag,
} from "lucide-react";
import { getProducts } from "../services/woocommerce";
import { ProductCard } from "../components/ProductCard";

export function Home() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    getProducts({ perPage: 6, page: 1 })
      .then(setFeatured)
      .catch(console.error);
  }, []);

  return (
    <main className="overflow-hidden bg-[#f6f0e7]">
      <section className="relative px-4 py-14 md:px-6 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#b8874640,transparent_35%),radial-gradient(circle_at_bottom_left,#18151120,transparent_35%)]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-4 py-2 text-xs font-black uppercase tracking-wide shadow-sm">
              <Sparkles size={16} />
              Ecommerce React + WooCommerce
            </div>

            <h1 className="text-5xl font-black leading-[0.9] tracking-tight md:text-7xl lg:text-8xl">
              Grooming profesional con una tienda más rápida y premium.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-black/60 md:text-lg">
              Nueva experiencia visual para The Real Groom: productos reales,
              imágenes reales, carrito en React y navegación optimizada para móvil.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/tienda"
                className="rounded-full bg-[#181511] px-8 py-4 text-center font-black text-white shadow-xl transition hover:scale-[1.02]"
              >
                Ver tienda
                <ArrowRight className="ml-2 inline" size={18} />
              </Link>

              <Link
                to="/sobre-nosotros"
                className="rounded-full border border-black/10 bg-white px-8 py-4 text-center font-black shadow-sm transition hover:scale-[1.02]"
              >
                Conocer la marca
              </Link>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              <InfoCard icon={<Truck size={18} />} title="Envíos 24/48h" />
              <InfoCard icon={<ShieldCheck size={18} />} title="Pago seguro" />
              <InfoCard icon={<BadgeCheck size={18} />} title="Catálogo real" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="rounded-[2rem] bg-[#181511] p-3 shadow-2xl md:p-4">
              <div className="grid h-[420px] place-items-center rounded-[1.5rem] bg-white p-8 md:h-[560px]">
                <div className="text-center">
                  <div className="mx-auto mb-6 grid h-28 w-28 place-items-center rounded-full bg-[#181511] text-4xl font-black text-white">
                    TRG
                  </div>
                  <p className="text-sm font-black uppercase tracking-[0.25em] text-black/40">
                    The Real Groom
                  </p>
                  <h2 className="mt-3 text-4xl font-black">
                    Professional Store
                  </h2>
                  <p className="mt-3 text-black/50">
                    WooCommerce conectado · React frontend
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-5 left-4 rounded-3xl bg-white p-5 shadow-2xl md:left-8">
              <p className="text-sm font-bold text-black/50">Demo real</p>
              <p className="text-2xl font-black">React + Woo</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-4 py-10 md:px-6">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          <Category title="Tijeras" text="Herramientas premium" icon={<Scissors />} />
          <Category title="Cosmética" text="Cuidado profesional" icon={<Sparkles />} />
          <Category title="Tienda online" text="Compra rápida y segura" icon={<ShoppingBag />} />
        </div>
      </section>

      <section className="px-4 py-14 md:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="mb-2 text-sm font-black uppercase tracking-[0.25em] text-black/40">
                Productos destacados
              </p>
              <h2 className="text-4xl font-black md:text-6xl">
                Directamente desde WooCommerce
              </h2>
            </div>

            <Link
              to="/tienda"
              className="rounded-full bg-[#181511] px-6 py-3 text-center font-black text-white"
            >
              Ver catálogo completo
            </Link>
          </div>

          {featured.length === 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-96 animate-pulse rounded-[2rem] bg-white" />
              ))}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function InfoCard({ icon, title }) {
  return (
    <div className="rounded-3xl bg-white/80 p-4 shadow-sm ring-1 ring-black/5">
      <div className="mb-3 grid h-10 w-10 place-items-center rounded-full bg-[#181511] text-white">
        {icon}
      </div>
      <p className="font-black">{title}</p>
    </div>
  );
}

function Category({ icon, title, text }) {
  return (
    <Link
      to="/tienda"
      className="group rounded-[2rem] bg-white p-7 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-2xl"
    >
      <div className="mb-5 grid h-12 w-12 place-items-center rounded-full bg-[#181511] text-white">
        {icon}
      </div>
      <h3 className="text-2xl font-black">{title}</h3>
      <p className="mt-2 text-black/55">{text}</p>
      <p className="mt-5 font-black text-[#8a5a24]">Ver productos →</p>
    </Link>
  );
}