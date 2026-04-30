import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, BadgeCheck, ShieldCheck, Truck } from "lucide-react";
import { getProducts } from "../services/woocommerce";

export function Hero() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts({ perPage: 30, page: 1 })
      .then((data) => setProducts(data))
      .catch(console.error);
  }, []);

  const slides = useMemo(() => {
    const petfumeProducts = products.filter((product) => {
      const text = `${product.name} ${product.category} ${product.description}`.toLowerCase();

      return (
        text.includes("petfume") ||
        text.includes("perfume") ||
        text.includes("cosmética") ||
        text.includes("cosmetica")
      );
    });

    const selected =
      petfumeProducts.length > 0
        ? petfumeProducts
        : products.filter((product) => product.image);

    return selected.slice(0, 5);
  }, [products]);

  const [active, setActive] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;

    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const product = slides[active];

  return (
    <section className="relative min-h-[88vh] overflow-hidden bg-[#181511] px-4 py-16 text-white md:px-6 md:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#d6a84f33,transparent_35%)]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="mb-4 text-sm font-black uppercase tracking-[0.3em] text-[#d6a84f]">
            The Real Groom · Petfume
          </p>

          <h1 className="text-5xl font-black leading-[0.9] md:text-7xl">
            Alta perfumería natural y grooming profesional.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-white/65 md:text-lg">
            Productos, herramientas y cosmética profesional para peluquería
            canina, con una experiencia rápida, limpia y premium.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link to="/tienda" className="trg-btn">
              Ver tienda <ArrowRight size={18} />
            </Link>

            <Link to="/contacto" className="trg-btn-dark">
              Hazte distribuidor
            </Link>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <Benefit icon={<Truck />} text="Envíos 24/48h" />
            <Benefit icon={<ShieldCheck />} text="Pago seguro" />
            <Benefit icon={<BadgeCheck />} text="Pro quality" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="rounded-[2.5rem] bg-[#24201a] p-4 shadow-2xl ring-1 ring-[#d6a84f]/25">
            <Link
              to={product?.id ? `/producto/${product.id}` : "/tienda"}
              className="group relative block h-[420px] overflow-hidden rounded-[2rem] bg-[#f6f0e7] md:h-[540px]"
            >
              <AnimatePresence mode="wait">
                {product?.image ? (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.55 }}
                    className="flex h-full w-full items-center justify-center p-6"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-h-full max-w-full object-contain transition duration-700 group-hover:scale-105"
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex h-full w-full items-center justify-center"
                  >
                    <div className="text-center">
                      <div className="mx-auto mb-6 grid h-28 w-28 place-items-center rounded-xl bg-[#181511] text-4xl font-black text-[#d6a84f]">
                        TRG
                      </div>
                      <p className="text-black/40">Cargando producto...</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {product && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

                  <div className="absolute bottom-5 left-5 right-5">
                    <p className="line-clamp-1 text-xl font-black text-white">
                      {product.name}
                    </p>

                    <div className="mt-3 flex items-center justify-between gap-4">
                      <p className="font-black text-[#d6a84f]">
                        {product.priceLabel}
                      </p>

                      <span className="rounded-xl bg-[#d6a84f] px-4 py-3 text-sm font-black text-[#181511] shadow-xl">
                        Ver producto →
                      </span>
                    </div>
                  </div>
                </>
              )}
            </Link>
          </div>

          {slides.length > 1 && (
            <div className="mt-5 flex justify-center gap-2">
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  onClick={() => setActive(index)}
                  className={`h-2.5 rounded-full transition ${
                    active === index
                      ? "w-8 bg-[#d6a84f]"
                      : "w-2.5 bg-white/25 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

function Benefit({ icon, text }) {
  return (
    <div className="rounded-xl bg-[#24201a] p-4 text-sm font-bold text-white/70 ring-1 ring-[#d6a84f]/15">
      <div className="mb-2 text-[#d6a84f]">{icon}</div>
      {text}
    </div>
  );
}