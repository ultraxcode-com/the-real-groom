import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  CreditCard,
  Heart,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { getProductById } from "../services/woocommerce";
import { useCart } from "../context/CartContext";

const goldText =
  "bg-gradient-to-r from-[#8C6A2A] via-[#D4AF37] to-[#F4E6C3] bg-clip-text text-transparent drop-shadow-[0_0_14px_rgba(212,175,55,0.25)]";

const goldButton =
  "flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#8C6A2A] via-[#D4AF37] to-[#F4E6C3] px-6 py-4 font-black text-[#181511] shadow-[0_0_24px_rgba(212,175,55,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_0_34px_rgba(212,175,55,0.55)]";

export function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProductById(id)
      .then((data) => {
        setProduct(data);
        setSelectedImage(data.image);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#181511] px-6 py-20 text-white">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-[#D4AF37]/20 bg-[#24201a] p-10 text-center font-black shadow-xl">
          Cargando producto...
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-[#181511] px-6 py-20 text-white">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-4xl font-black">Producto no encontrado</h1>
          <Link to="/tienda" className={`${goldButton} mt-8 inline-flex`}>
            Volver a tienda
          </Link>
        </div>
      </main>
    );
  }

  const gallery = product.images?.length > 0 ? product.images : [product.image];

  const handleAdd = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <main className="min-h-screen bg-[#181511] pb-24 text-white md:pb-0">
      <section className="relative overflow-hidden px-4 py-10 md:px-6 md:py-14">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.22),transparent_34%)]" />

        <div className="relative mx-auto max-w-7xl">
          <Link
            to="/tienda"
            className="mb-8 inline-flex items-center gap-2 text-sm font-black text-white/60 transition hover:text-white"
          >
            <ArrowLeft size={18} />
            Volver a la tienda
          </Link>

          <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
            <div>
              <div className="overflow-hidden rounded-[2.5rem] border border-[#D4AF37]/20 bg-[#24201a] p-4 shadow-2xl">
                <div className="rounded-[2rem] bg-[#100e0b]">
                  <img
                    src={selectedImage}
                    alt={product.name}
                    className="h-[360px] w-full rounded-[2rem] object-contain p-5 md:h-[560px]"
                  />
                </div>
              </div>

              <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
                {gallery.slice(0, 6).map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(img)}
                    className={`min-w-24 overflow-hidden rounded-2xl bg-[#24201a] p-2 shadow-sm ring-2 transition ${
                      selectedImage === img
                        ? "ring-[#D4AF37]"
                        : "ring-[#D4AF37]/10"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${index + 1}`}
                      className="h-20 w-20 rounded-xl object-contain"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:pt-8">
              <div className="mb-4 flex flex-wrap gap-3">
                <span className="rounded-full bg-gradient-to-r from-[#8C6A2A] via-[#D4AF37] to-[#F4E6C3] px-4 py-2 text-xs font-black uppercase tracking-wide text-[#181511] shadow-[0_0_18px_rgba(212,175,55,0.35)]">
                  {product.category || "Producto profesional"}
                </span>

                {product.stockStatus === "instock" && (
                  <span className="rounded-full border border-[#D4AF37]/25 bg-[#24201a] px-4 py-2 text-xs font-black uppercase tracking-wide text-white">
                    En stock
                  </span>
                )}
              </div>

              <h1 className="text-3xl font-black leading-tight tracking-tight md:text-6xl">
                {product.name}
              </h1>

              <p className={`mt-5 text-4xl font-black ${goldText}`}>
                {product.priceLabel}
              </p>

              {product.description && (
                <div
                  className="mt-5 max-h-56 overflow-y-auto pr-2 text-base leading-8 text-white/65 md:text-lg"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              )}

              <div className="mt-6 space-y-3">
                <Line text="Producto cargado desde la tienda actual" />
                <Line text="Precio, stock e imágenes conectados" />
                <Line text="Compra compatible con el sistema existente" />
              </div>

              <div className="mt-8 rounded-[2rem] border border-[#D4AF37]/20 bg-[#24201a] p-5 text-white shadow-2xl">
                <div className="flex flex-col gap-4 sm:flex-row">
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="rounded-xl border border-[#D4AF37]/20 bg-[#100e0b] px-5 py-4 font-black text-white outline-none sm:w-40"
                  >
                    <option value={1}>Cantidad: 1</option>
                    <option value={2}>Cantidad: 2</option>
                    <option value={3}>Cantidad: 3</option>
                    <option value={4}>Cantidad: 4</option>
                  </select>

                  <button onClick={handleAdd} className={`${goldButton} flex-1`}>
                    <ShoppingBag size={19} />
                    {added ? "Añadido ✓" : "Añadir al carrito"}
                  </button>

                  <button className="hidden h-14 w-14 place-items-center rounded-xl border border-[#D4AF37]/20 bg-[#100e0b] text-white shadow-sm transition hover:border-[#F4E6C3]/50 sm:grid">
                    <Heart size={20} />
                  </button>
                </div>

                {added && (
                  <Link
                    to="/carrito"
                    className="mt-4 block rounded-xl border border-[#D4AF37]/25 bg-[#100e0b] px-6 py-4 text-center font-black text-white transition hover:border-[#F4E6C3]/60"
                  >
                    Ver carrito
                  </Link>
                )}
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <Trust icon={<Truck size={18} />} title="Envíos" text="24/48h" />
                <Trust icon={<CreditCard size={18} />} title="Pago seguro" text="Redsys/Bizum" />
                <Trust icon={<ShieldCheck size={18} />} title="Tienda" text="Conectada" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#D4AF37]/20 bg-[#100e0b] p-4 shadow-2xl md:hidden">
        <button onClick={handleAdd} className={`${goldButton} w-full`}>
          {added ? "Añadido al carrito ✓" : `Añadir · ${product.priceLabel}`}
        </button>
      </div>
    </main>
  );
}

function Line({ text }) {
  return (
    <p className="flex items-center gap-3 text-sm font-bold text-white/65">
      <span className="grid h-6 w-6 place-items-center rounded-full bg-gradient-to-r from-[#8C6A2A] via-[#D4AF37] to-[#F4E6C3] text-[#181511] shadow-[0_0_12px_rgba(212,175,55,0.35)]">
        <Check size={14} />
      </span>
      {text}
    </p>
  );
}

function Trust({ icon, title, text }) {
  return (
    <div className="rounded-3xl border border-[#D4AF37]/20 bg-[#24201a] p-5 shadow-sm">
      <div className="mb-3 grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-r from-[#8C6A2A] via-[#D4AF37] to-[#F4E6C3] text-[#181511] shadow-[0_0_16px_rgba(212,175,55,0.35)]">
        {icon}
      </div>
      <p className="font-black text-white">{title}</p>
      <p className="text-sm text-white/50">{text}</p>
    </div>
  );
}