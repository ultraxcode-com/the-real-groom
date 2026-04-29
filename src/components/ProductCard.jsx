import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";

export function ProductCard({ product, index = 0 }) {
  const { addToCart } = useCart();

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 26, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.42,
        delay: Math.min(index * 0.035, 0.25),
        ease: "easeOut",
      }}
      className="group overflow-hidden rounded-[2rem] border border-white/70 bg-white shadow-[0_20px_70px_rgba(24,21,17,0.08)] ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-[0_35px_90px_rgba(24,21,17,0.16)]"
    >
      <Link to={`/producto/${product.id}`} className="block">
        <div className="relative overflow-hidden bg-gradient-to-br from-[#f0e4d2] via-[#fffaf4] to-[#eadfce]">
          <div className="absolute left-4 top-4 z-10 rounded-full bg-white/90 px-4 py-2 text-[10px] font-black uppercase tracking-wide text-black/65 shadow-sm backdrop-blur">
            {product.category}
          </div>

          {product.stockStatus === "instock" && (
            <div className="absolute right-4 top-4 z-10 rounded-full bg-[#181511] px-4 py-2 text-[10px] font-black uppercase tracking-wide text-white shadow-sm">
              En stock
            </div>
          )}

          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-72 w-full object-contain p-6 transition duration-500 group-hover:scale-105 md:h-80"
          />

          <div className="absolute inset-x-4 bottom-4 hidden translate-y-6 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 md:block">
            <div className="flex gap-3">
              <div className="flex flex-1 items-center justify-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-black text-black shadow-xl">
                <Eye size={17} />
                Ver detalle
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  addToCart(product);
                }}
                className="grid h-12 w-12 place-items-center rounded-full bg-[#181511] text-white shadow-xl transition hover:scale-105"
              >
                <ShoppingBag size={18} />
              </button>
            </div>
          </div>
        </div>
      </Link>

      <div className="p-5 md:p-6">
        <Link to={`/producto/${product.id}`}>
          <h3 className="line-clamp-2 min-h-14 text-lg font-black leading-tight tracking-tight transition group-hover:text-[#8a5a24] md:text-xl">
            {product.name}
          </h3>
        </Link>

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-black/50">
          {product.description}
        </p>

        <div className="mt-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-black/35">
              Precio
            </p>
            <p className="text-xl font-black md:text-2xl">
              {product.priceLabel}
            </p>
          </div>

          <button
            onClick={() => addToCart(product)}
            className="rounded-full bg-[#181511] px-5 py-3 text-sm font-black text-white shadow-lg transition hover:scale-105"
          >
            Añadir
          </button>
        </div>
      </div>
    </motion.article>
  );
}