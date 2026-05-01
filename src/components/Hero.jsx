import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, BadgeCheck, ShieldCheck, Truck } from "lucide-react";
import { getProducts } from "../services/woocommerce";
import dogGold from "../assets/ui/dog-gold.png";

const goldText =
  "bg-gradient-to-r from-[#8C6A2A] via-[#D4AF37] to-[#F4E6C3] bg-clip-text text-transparent";

export function Hero() {
  const [products, setProducts] = useState([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    getProducts({ perPage: 30, page: 1 })
      .then((data) => setProducts(Array.isArray(data) ? data : []))
      .catch(console.error);
  }, []);

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
    <section className="relative min-h-[88vh] overflow-hidden bg-[#090908] px-4 py-14 text-white md:px-6 md:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.16),transparent_36%),radial-gradient(circle_at_top_right,rgba(212,175,55,0.18),transparent_35%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:70px_70px]" />

      {/* SILUETA CENTRAL */}
      <img
  src={dogGold}
  alt=""
  aria-hidden="true"
  className="pointer-events-none absolute left-1/2 top-[52%] z-0 h-[240px] -translate-x-1/2 -translate-y-1/2 opacity-55 drop-shadow-[0_0_45px_rgba(212,175,55,0.35)] md:h-[520px] md:opacity-90 lg:left-[43%] lg:top-[48%] lg:h-[308px]"
/>

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.95fr_0.9fr]">
        {/* TEXTO */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
         className="order-2 text-center lg:order-1 lg:text-left"
        >
          <p
            className={`mb-4 text-sm font-black uppercase tracking-[0.35em] ${goldText}`}
          >
            The Real Groom · Petfume
          </p>

       <h1 className="mx-auto max-w-[360px] text-center text-5xl font-bold leading-[1.05] tracking-[0.03em] md:max-w-xl md:text-7xl lg:mx-0 lg:text-left">
  Todo lo que necesitas para crecer en tu peluquería canina.
</h1>

    <p className="mt-6 max-w-lg text-base leading-8 text-white/70 md:text-lg">
 Te ayudamos a mejorar tu{" "}
  <span className="font-black text-[#D4AF37]">técnica</span>,<br />

  tus{" "}
  <span className="font-black text-[#D4AF37]">resultados</span> y hacer crecer tu{" "}
  <span className="font-black text-[#D4AF37]">negocio</span><br />
   en peluquería canina.
</p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link to="/tienda" className="trg-gold-btn px-8 py-4">
              Ver tienda <ArrowRight size={18} />
            </Link>

            <Link to="/contacto" className="trg-dark-btn px-8 py-4">
              Distribuidores
            </Link>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <Benefit
              icon={<Truck size={20} />}
              title="24/48h"
              text="Envíos rápidos"
            />
            <Benefit
              icon={<ShieldCheck size={20} />}
              title="Pago seguro"
              text="100% protegido"
            />
            <Benefit
              icon={<BadgeCheck size={20} />}
              title="Calidad pro"
              text="Productos profesionales"
            />
          </div>
        </motion.div>

        {/* PRODUCTO */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative order-1 lg:order-2"
        >
          <Link
            to={product?.id ? `/producto/${product.id}` : "/tienda"}
            className="group relative block h-[410px] overflow-hidden rounded-[2rem] border border-[#D4AF37]/40 bg-[#100e0b] shadow-[0_0_45px_rgba(212,175,55,0.12)] md:h-[560px]"
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

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

            <div className="absolute bottom-5 left-5 right-5">
              <p className="line-clamp-2 text-xl font-black leading-tight md:text-2xl">
                {product?.name}
              </p>

              <div className="mt-5 flex items-center justify-between gap-4">
                <span className={`text-xl font-black ${goldText}`}>
                  {product?.priceLabel || ""}
                </span>

                <span className="trg-gold-btn min-h-0 px-5 py-3 text-sm">
                  Ver producto <ArrowRight size={16} />
                </span>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function Benefit({ icon, title, text }) {
  return (
    <div className="rounded-xl border border-[#D4AF37]/25 bg-black/30 p-4 text-white/75 backdrop-blur">
      <div className="mb-3 text-[#D4AF37]">{icon}</div>
      <p className="text-sm font-black text-white">{title}</p>
      <p className="mt-1 text-xs text-white/55">{text}</p>
    </div>
  );
}