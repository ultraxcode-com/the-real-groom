import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";

export function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45 }}
      className="group overflow-hidden rounded-[2rem] bg-white shadow-[0_20px_60px_rgba(24,21,17,0.07)] ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(24,21,17,0.14)]"
    >
      <Link to={`/producto/${product.id}`} className="block">
        <div className="relative overflow-hidden bg-gradient-to-br from-[#f1e6d6] to-[#fffaf4]">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-72 w-full object-contain p-5 transition duration-500 group-hover:scale-105 md:h-80"
          />

          <div className="absolute left-4 top-4 rounded-full bg-white/90 px-4 py-2 text-[11px] font-black uppercase tracking-wide shadow-sm">
            {product.category}
          </div>

          {product.stockStatus === "instock" && (
            <div className="absolute right-4 top-4 rounded-full bg-[#181511] px-4 py-2 text-[11px] font-black uppercase tracking-wide text-white shadow-sm">
              En stock
            </div>
          )}

          <div className="absolute inset-x-4 bottom-4 hidden translate-y-6 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 md:block">
            <div className="flex gap-3">
              <div className="flex flex-1 items-center justify-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-black text-black shadow-lg">
                <Eye size={17} />
                Ver detalle
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  addToCart(product);
                }}
                className="grid h-12 w-12 place-items-center rounded-full bg-[#181511] text-white shadow-lg transition hover:scale-105"
              >
                <ShoppingBag size={18} />
              </button>
            </div>
          </div>
        </div>
      </Link>

      <div className="p-5 md:p-6">
        <Link to={`/producto/${product.id}`}>
          <h3 className="line-clamp-2 min-h-14 text-lg font-black leading-tight transition group-hover:text-[#8a5a24] md:text-xl">
            {product.name}
          </h3>
        </Link>

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-black/50">
          {product.description}
        </p>

        <div className="mt-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-black/35">
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