import { motion } from "framer-motion";
import { Eye, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export function ProductCard({ product, index = 0 }) {
  const { addToCart } = useCart();

  return (
    <motion.article
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      className="group flex h-full min-h-[475px] flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-[#100e0b] shadow-[0_20px_70px_rgba(0,0,0,0.45)] transition hover:-translate-y-1"
    >
      <div className="h-[330px] overflow-hidden bg-black">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="line-clamp-2 min-h-[56px] text-lg font-black leading-tight text-white">
          {product.name}
        </h3>

        <p className="mt-1 text-sm text-white/50">
          {product.category || "Producto"}
        </p>

        <div className="mt-auto pt-5">
          <p className="text-xl font-black text-[#D4AF37]">
            {product.priceLabel || "Ver precio"}
          </p>

          <div className="mt-5 grid grid-cols-[1fr_auto] gap-3">
            <button
              onClick={() => addToCart(product)}
              className="flex h-14 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#8C6A2A] via-[#D4AF37] to-[#F4E6C3] px-4 text-sm font-black text-[#181511] shadow-[0_0_18px_rgba(212,175,55,0.35)] transition hover:scale-[1.03]"
            >
              <ShoppingBag size={16} />
              Añadir
            </button>

            <Link
              to={`/producto/${product.id}`}
              className="flex h-14 min-w-[94px] items-center justify-center gap-2 rounded-xl border border-white/15 px-4 text-sm font-black text-white/70 transition hover:border-[#D4AF37]/50 hover:text-white"
            >
              <Eye size={16} />
              Ver
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}