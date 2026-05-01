import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, BadgeCheck, ShieldCheck, Truck } from "lucide-react";
import { getProducts } from "../services/woocommerce";

const goldText =
  "bg-gradient-to-r from-[#8C6A2A] via-[#D4AF37] to-[#F4E6C3] bg-clip-text text-transparent drop-shadow-[0_0_14px_rgba(212,175,55,0.25)]";

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

  const slides = useMemo(() => {
    const productsWithImage = products.filter((product) => product.image);
    const offerProducts = productsWithImage.filter((product) => product.on_sale);

    const petfumeProducts = productsWithImage.filter((product) => {
      const text = `
        ${product.name || ""}
        ${product.description || ""}
        ${product.short_description || ""}
        ${(product.categories || []).map((cat) => cat.name).join(" ")}
      `.toLowerCase();

      return (
        text.includes("petfume") ||
        text.includes("perfume") ||
        text.includes("cosmética") ||
        text.includes("cosmetica")
      );
    });

    const selected =
      offerProducts.length > 0
        ? offerProducts
        : petfumeProducts.length > 0
        ? petfumeProducts
        : productsWithImage;

    return selected.slice(0, 5);
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
    <section className="relative min-h-[88vh] overflow-hidden bg-[#181511] px-4 py-16 text-white md:px-6 md:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.22),transparent_35%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:70px_70px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className={`mb-4 text-sm font-black uppercase tracking-[0.3em] ${goldText}`}>
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
            <Link to="/tienda" className={goldButton}>
              Ver tienda <ArrowRight size={18} />
            </Link>

            <Link
              to="/contacto"
              className="inline-flex items-center justify-center rounded-xl border border-[#D4AF37]/25 bg-[#24201a] px-6 py-3 font-black text-white shadow-xl transition hover:-translate-y-0.5 hover:border-[#F4E6C3]/60 hover:shadow-[0_0_24px_rgba(212,175,55,0.2)]"
            >
              Hazte distribuidor
            </Link>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <Benefit icon={<Truck size={22} />} text="Envíos 24/48h" />
            <Benefit icon={<ShieldCheck size={22} />} text="Pago seguro" />
            <Benefit icon={<BadgeCheck size={22} />} text="Pro quality" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="rounded-[2.5rem] border border-[#D4AF37]/20 bg-[#24201a] p-4 shadow-2xl ring-1 ring-[#D4AF37]/20">
            <Link
              to={product?.id ? `/producto/${product.id}` : "/tienda"}
              className="group relative block h-[420px] overflow-hidden rounded-[2rem] bg-[#100e0b] md:h-[540px]"
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
                      <div className="mx-auto mb-6 grid h-28 w-28 place-items-center rounded-xl bg-gradient-to-r from-[#8C6A2A] via-[#D4AF37] to-[#F4E6C3] text-4xl font-black text-[#181511] shadow-[0_0_24px_rgba(212,175,55,0.35)]">
                        TRG
                      </div>
                      <p className="text-white/45">Cargando producto...</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {product && (
                <>
                  <div className="absolute left-5 top-5 z-10 rounded-full bg-gradient-to-r from-[#8C6A2A] via-[#D4AF37] to-[#F4E6C3] px-4 py-2 text-xs font-black uppercase tracking-widest text-[#181511] shadow-[0_0_22px_rgba(212,175,55,0.35)]">
                    {product.on_sale ? "Oferta" : "Producto destacado"}
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

                  <div className="absolute bottom-5 left-5 right-5">
                    <p className="line-clamp-1 text-xl font-black text-white">
                      {product.name}
                    </p>

                    <div className="mt-3 flex items-center justify-between gap-4">
                      <p className={`font-black ${goldText}`}>
                        {product.priceLabel || "Ver precio"}
                      </p>

                      <span className="rounded-xl bg-gradient-to-r from-[#8C6A2A] via-[#D4AF37] to-[#F4E6C3] px-4 py-3 text-sm font-black text-[#181511] shadow-[0_0_22px_rgba(212,175,55,0.35)]">
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
                  aria-label={`Ver producto ${index + 1}`}
                  className={`h-2.5 rounded-full transition ${
                    active === index
                      ? "w-8 bg-gradient-to-r from-[#8C6A2A] via-[#D4AF37] to-[#F4E6C3] shadow-[0_0_14px_rgba(212,175,55,0.45)]"
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
    <div className="rounded-xl border border-[#D4AF37]/15 bg-[#24201a] p-4 text-sm font-bold text-white/70 shadow-sm transition hover:border-[#F4E6C3]/40 hover:shadow-[0_0_20px_rgba(212,175,55,0.16)]">
      <div className="mb-2 bg-gradient-to-r from-[#8C6A2A] via-[#D4AF37] to-[#F4E6C3] bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(212,175,55,0.35)]">
        {icon}
      </div>
      {text}
    </div>
  );
}