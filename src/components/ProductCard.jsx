import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";

const goldText =
  "bg-gradient-to-r from-[#8C6A2A] via-[#D4AF37] to-[#F4E6C3] bg-clip-text text-transparent";

export function ProductCard({ product, index = 0 }) {
  const { addToCart } = useCart();

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group overflow-hidden rounded-[2rem] border border-[#D4AF37]/15 bg-[#24201a] shadow-[0_10px_40px_rgba(0,0,0,0.4)] transition hover:-translate-y-1 hover:border-[#F4E6C3]/40 hover:shadow-[0_20px_60px_rgba(212,175,55,0.15)]"
    >
      <Link to={`/producto/${product.id}`}>
        {/* Imagen */}
        <div className="relative h-72 overflow-hidden bg-[#100e0b]">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-contain p-6 transition duration-700 group-hover:scale-110"
          />

          {/* Badge oferta */}
          {product.on_sale && (
            <span className="absolute left-4 top-4 rounded-full bg-gradient-to-r from-[#8C6A2A] via-[#D4AF37] to-[#F4E6C3] px-3 py-1 text-xs font-black uppercase tracking-widest text-[#181511] shadow-[0_0_16px_rgba(212,175,55,0.4)]">
              Oferta
            </span>
          )}
        </div>

        {/* Info */}
        <div className="p-6">
          <h3 className="line-clamp-2 text-lg font-black text-white">
            {product.name}
          </h3>

          <p className="mt-2 text-sm text-white/50">
            {product.category || "Producto profesional"}
          </p>

          <div className="mt-5 flex items-center justify-between gap-3">
            {/* Precio */}
            <p className={`text-xl font-black ${goldText}`}>
              {product.priceLabel || "Ver precio"}
            </p>

            {/* Botones */}
            <div className="flex gap-2">
              {/* Añadir */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  addToCart(product);
                }}
                className="
                  rounded-xl 
                  bg-gradient-to-r 
                  from-[#8C6A2A] via-[#D4AF37] to-[#F4E6C3] 
                  px-4 py-2 
                  text-xs font-black 
                  text-[#181511] 
                  shadow-[0_0_14px_rgba(212,175,55,0.35)]
                  transition 
                  hover:shadow-[0_0_22px_rgba(212,175,55,0.55)]
                "
              >
                Añadir
              </button>

              {/* Ver */}
              <span className="rounded-xl border border-[#D4AF37]/30 px-4 py-2 text-xs font-black text-white/80 transition hover:border-[#F4E6C3]/60 hover:text-white">
                Ver →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}