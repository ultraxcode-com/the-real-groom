import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { getProducts } from "../services/woocommerce";
import { ProductCard } from "./ProductCard";

const goldText =
  "bg-gradient-to-r from-[#8C6A2A] via-[#D4AF37] to-[#F4E6C3] bg-clip-text text-transparent drop-shadow-[0_0_14px_rgba(212,175,55,0.25)]";

const goldButton =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#8C6A2A] via-[#D4AF37] to-[#F4E6C3] px-6 py-3 font-black text-[#181511] shadow-[0_0_24px_rgba(212,175,55,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_0_34px_rgba(212,175,55,0.55)]";

export function PetfumeSection() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts({ perPage: 30, page: 1 })
      .then((data) => setProducts(Array.isArray(data) ? data : []))
      .catch(console.error);
  }, []);

  const petfumeProducts = useMemo(() => {
    return products
      .filter((product) => {
        const text = `
          ${product.name || ""}
          ${product.description || ""}
          ${product.short_description || ""}
          ${(product.categories || []).map((cat) => cat.name).join(" ")}
        `.toLowerCase();

        return (
          product.image &&
          (text.includes("petfume") ||
            text.includes("perfume") ||
            text.includes("cosmética") ||
            text.includes("cosmetica"))
        );
      })
      .slice(0, 3);
  }, [products]);

  return (
    <section className="bg-[#181511] px-4 py-16 text-white md:px-6">
      <div className="mx-auto grid max-w-7xl gap-10 rounded-[2.5rem] border border-[#D4AF37]/20 bg-[#100e0b] p-8 shadow-2xl md:p-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-center">
          <div>
            <p
              className={`mb-3 text-sm font-black uppercase tracking-[0.25em] ${goldText}`}
            >
              Petfume
            </p>

            <h2 className="text-4xl font-black leading-tight text-white md:text-6xl">
              Alta perfumería natural para mascotas.
            </h2>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-white/60">
              Fragancias y cosmética profesional para elevar el acabado del
              grooming, mejorar la experiencia del cliente y reforzar la imagen
              premium del salón.
            </p>

            <Link to="/tienda" className={`${goldButton} mt-8`}>
              Ver productos Petfume
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="rounded-[2rem] border border-[#D4AF37]/20 bg-[#24201a] p-8 text-white shadow-xl">
            <Sparkles
              className="mb-5 text-[#D4AF37] drop-shadow-[0_0_14px_rgba(212,175,55,0.35)]"
              size={34}
            />

            <h3 className="text-3xl font-black">
              Aroma, acabado y presentación profesional.
            </h3>

            <p className="mt-4 leading-8 text-white/60">
              Una línea pensada para groomers que quieren diferenciar su
              servicio con productos de imagen cuidada y acabado premium.
            </p>
          </div>
        </div>

        {petfumeProducts.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {petfumeProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}