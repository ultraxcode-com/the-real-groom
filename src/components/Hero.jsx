import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, BadgeCheck, ShieldCheck, Truck } from "lucide-react";
import { getProducts } from "../services/woocommerce";

const goldText =
  "bg-gradient-to-r from-[#8C6A2A] via-[#D4AF37] to-[#F4E6C3] bg-clip-text text-transparent";

const goldButton =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#8C6A2A] via-[#D4AF37] to-[#F4E6C3] px-6 py-3 font-black text-[#181511] shadow-[0_0_24px_rgba(212,175,55,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_0_34px_rgba(212,175,55,0.55)]";

export function Hero() {
  const [products, setProducts] = useState([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    getProducts({ perPage: 30, page: 1 })
      .then((data) => setProducts(Array.isArray(data) ? data : []))
      .catch(console.error);
  }, []);

  // 🔥 LÓGICA ORIGINAL (NO CAMBIADA)
const slides = useMemo(() => {
  const selected = products.filter((product) => {
    const name = (product.name || "").toLowerCase();

    return (
      name.includes("caja 5 petfume") ||
      name.includes("white ritual")
    );
  });

  return selected.filter((product) => product.image).slice(0, 3);
}, [products]);

  useEffect(() => {
    if (active >= slides.length) setActive(0);
  }, [slides.length, active]);

  useEffect(() => {
    if (slides.length <= 1) return;

    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const product = slides[active];

  return (
    <section className="relative min-h-[88vh] overflow-hidden bg-[#181511] px-4 py-14 text-white md:px-6 md:py-24">
      {/* Fondo */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.2),transparent_40%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:70px_70px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        
        {/* TEXTO */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="order-2 lg:order-1"
        >
          <p className={`mb-4 text-sm font-black uppercase tracking-[0.3em] ${goldText}`}>
            The Real Groom · Petfume
          </p>

          <h1 className="text-4xl font-black leading-[0.95] md:text-6xl">
            Grooming profesional de alto nivel.
          </h1>

          <p className="mt-5 max-w-xl text-base leading-7 text-white/65 md:text-lg">
            Productos, herramientas y cosmética profesional para peluquería
            canina. Diseñado por groomers para groomers.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link to="/tienda" className={goldButton}>
              Ver tienda <ArrowRight size={18} />
            </Link>

            <Link
              to="/contacto"
              className="rounded-xl border border-[#D4AF37]/25 bg-[#24201a] px-6 py-3 font-black text-white transition hover:border-[#F4E6C3]/60"
            >
              Distribuidores
            </Link>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <Benefit icon={<Truck size={18} />} text="24/48h" />
            <Benefit icon={<ShieldCheck size={18} />} text="Pago seguro" />
            <Benefit icon={<BadgeCheck size={18} />} text="Calidad pro" />
          </div>
        </motion.div>

        {/* IMAGEN (PRIMERO EN MÓVIL) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative order-1 lg:order-2"
        >
          <Link
            to={product?.id ? `/producto/${product.id}` : "/tienda"}
            className="group relative block h-[380px] overflow-hidden rounded-[2rem] md:h-[520px]"
          >
          <AnimatePresence mode="wait">
  {product?.image && (
    <motion.img
      key={product.id}
      src={product.image}
      alt={product.name}
      initial={{ opacity: 0, scale: 1.05 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full w-full object-cover object-center transition duration-700 group-hover:scale-105"
    />
  )}
</AnimatePresence>
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

            {/* Info */}
            <div className="absolute bottom-4 left-4 right-4">
              <p className="line-clamp-2 text-lg font-black md:text-xl">
                {product?.name}
              </p>

              <div className="mt-3 flex items-center justify-between">
                <span className={`font-black ${goldText}`}>
                  {product?.priceLabel || ""}
                </span>

                <span className="rounded-xl bg-gradient-to-r from-[#8C6A2A] via-[#D4AF37] to-[#F4E6C3] px-4 py-2 text-sm font-black text-[#181511]">
                  Ver →
                </span>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function Benefit({ icon, text }) {
  return (
    <div className="rounded-lg bg-[#24201a] p-3 text-center text-xs font-bold text-white/70">
      <div className="mb-1 text-[#D4AF37]">{icon}</div>
      {text}
    </div>
  );
}