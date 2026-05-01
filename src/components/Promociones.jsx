import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getProducts } from "../services/woocommerce";
import { ProductCard } from "./ProductCard";

const goldText =
  "bg-gradient-to-r from-[#8C6A2A] via-[#D4AF37] to-[#F4E6C3] bg-clip-text text-transparent drop-shadow-[0_0_14px_rgba(212,175,55,0.25)]";

const goldButton =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#8C6A2A] via-[#D4AF37] to-[#F4E6C3] px-6 py-3 font-black text-[#181511] shadow-[0_0_24px_rgba(212,175,55,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_0_34px_rgba(212,175,55,0.55)]";

export function Promociones() {
  const [products, setProducts] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    getProducts({ perPage: 30, page: 1 })
      .then((data) => setProducts(Array.isArray(data) ? data : []))
      .catch(console.error);
  }, []);

  const offers = useMemo(() => {
    const withImage = products.filter((product) => product.image);
    const onSale = withImage.filter((product) => product.on_sale);

    return onSale.length > 0 ? onSale : withImage.slice(0, 8);
  }, [products]);

  const scroll = (direction) => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: direction === "left" ? -360 : 360,
      behavior: "smooth",
    });
  };

  if (products.length === 0) return null;

  return (
    <section className="bg-[#181511] px-4 py-16 text-white md:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p
              className={`mb-2 text-sm font-black uppercase tracking-[0.25em] ${goldText}`}
            >
              Promociones
            </p>

            <h2 className="text-4xl font-black text-white md:text-6xl">
              Productos destacados
            </h2>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <button
              onClick={() => scroll("left")}
              className="grid h-12 w-12 place-items-center rounded-full border border-[#D4AF37]/25 bg-[#24201a] text-white shadow-xl transition hover:-translate-y-0.5 hover:border-[#F4E6C3]/60 hover:shadow-[0_0_24px_rgba(212,175,55,0.25)]"
            >
              <ArrowLeft size={20} />
            </button>

            <button
              onClick={() => scroll("right")}
              className="grid h-12 w-12 place-items-center rounded-full border border-[#D4AF37]/25 bg-[#24201a] text-white shadow-xl transition hover:-translate-y-0.5 hover:border-[#F4E6C3]/60 hover:shadow-[0_0_24px_rgba(212,175,55,0.25)]"
            >
              <ArrowRight size={20} />
            </button>

            <Link to="/tienda" className={goldButton}>
              Ver tienda
            </Link>
          </div>

          <Link to="/tienda" className={`${goldButton} md:hidden`}>
            Ver tienda
          </Link>
        </div>

        <div
          ref={scrollRef}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-4 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {offers.map((product, index) => (
            <div
              key={product.id}
              className="min-w-[82%] snap-start sm:min-w-[340px] lg:min-w-[370px]"
            >
              <ProductCard product={product} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}