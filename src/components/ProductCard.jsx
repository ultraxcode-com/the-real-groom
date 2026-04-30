import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";

export function ProductCard({ product, index = 0 }) {
  const { addToCart } = useCart();

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: Math.min(index * 0.04, 0.25),
      }}
      className="group overflow-hidden rounded-3xl bg-white shadow-[0_18px_55px_rgba(24,21,17,0.10)] ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_85px_rgba(24,21,17,0.18)]"
    >
      <Link to={`/producto/${product.id}`} className="block">
        <div className="relative overflow-hidden bg-[#181511]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#d6a84f33,transparent_35%)]" />

          <div className="absolute left-4 top-4 z-10 rounded-xl bg-[#d6a84f] px-3 py-2 text-[10px] font-black uppercase tracking-wide text-[#181511] shadow-lg">
            Profesional
          </div>

          {product.stockStatus === "instock" && (
            <div className="absolute right-4 top-4 z-10 rounded-xl bg-white px-3 py-2 text-[10px] font-black uppercase tracking-wide text-[#181511] shadow-lg">
              En stock
            </div>
          )}

          <div className="relative grid h-72 place-items-center p-6 md:h-80">
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
            />
          </div>

          <div className="absolute inset-x-4 bottom-4 hidden translate-y-5 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 md:block">
            <div className="grid grid-cols-[1fr_auto] gap-3">
              <div className="flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-black text-[#181511] shadow-xl">
                <Eye size={17} />
                Ver detalle
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  addToCart(product);
                }}
                className="grid h-12 w-12 place-items-center rounded-xl bg-[#d6a84f] text-[#181511] shadow-xl transition hover:bg-[#b8872f]"
              >
                <ShoppingBag size={18} />
              </button>
            </div>
          </div>
        </div>
      </Link>

      <div className="p-5 md:p-6">
        <p className="mb-2 text-[10px] font-black uppercase tracking-[0.25em] text-[#b8872f]">
          {product.category}
        </p>

        <Link to={`/producto/${product.id}`}>
          <h3 className="line-clamp-2 min-h-14 text-lg font-black leading-tight text-[#181511] transition group-hover:text-[#b8872f] md:text-xl">
            {product.name}
          </h3>
        </Link>

        <p className="mt-3 line-clamp-2 text-sm leading-6 text-black/50">
          {product.description}
        </p>

        <div className="mt-5 flex items-end justify-between gap-4 border-t border-black/10 pt-5">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-black/35">
              Precio
            </p>
            <p className="text-2xl font-black text-[#181511]">
              {product.priceLabel}
            </p>
            <p className="text-xs font-semibold text-black/40">IVA incluido</p>
          </div>

          <button
            onClick={() => addToCart(product)}
            className="trg-btn px-5 py-3 text-sm"
          >
            Añadir
          </button>
        </div>
      </div>
    </motion.article>
  );
}