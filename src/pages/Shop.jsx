import { useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Truck,
} from "lucide-react";
import { motion } from "framer-motion";
import { ProductCard } from "../components/ProductCard";
import { getCategories, getProducts } from "../services/woocommerce";

export function Shop() {
  const scrollRef = useRef(null);

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const [activeCategory, setActiveCategory] = useState({
    id: null,
    name: "Todos",
  });

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const [catData, prodData] = await Promise.all([
          getCategories(),
          getProducts({ perPage: 12, page: 1 }),
        ]);

        setCategories(catData);
        setProducts(prodData);
        setHasMore(prodData.length === 12);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const scrollCategories = (direction) => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: direction === "left" ? -340 : 340,
      behavior: "smooth",
    });
  };

  const handleAllClick = async () => {
    setActiveCategory({ id: null, name: "Todos" });
    setSearch("");
    setPage(1);
    setLoading(true);

    try {
      const data = await getProducts({ perPage: 12, page: 1 });
      setProducts(data);
      setHasMore(data.length === 12);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = async (category) => {
    setActiveCategory(category);
    setSearch("");
    setPage(1);
    setLoading(true);

    try {
      const data = await getProducts({
        perPage: 12,
        page: 1,
        categoryId: category.id,
      });

      setProducts(data);
      setHasMore(data.length === 12);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreProducts = async () => {
    setLoadingMore(true);

    try {
      const nextPage = page + 1;

      const data = await getProducts({
        perPage: 12,
        page: nextPage,
        categoryId: activeCategory.id,
      });

      setProducts((prev) => {
        const ids = new Set(prev.map((item) => item.id));
        const unique = data.filter((item) => !ids.has(item.id));
        return [...prev, ...unique];
      });

      setPage(nextPage);
      setHasMore(data.length === 12);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingMore(false);
    }
  };

  const filteredProducts = products.filter((product) => {
    const text = `${product.name} ${product.category} ${product.description}`.toLowerCase();
    return text.includes(search.toLowerCase());
  });

  return (
    <main className="min-h-screen bg-[#f6f0e7]">
      <section className="relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-[420px] bg-[#181511]" />
        <div className="absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(circle_at_top_right,#d6a84f33,transparent_35%)]" />

        <div className="relative mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="grid gap-8 text-white lg:grid-cols-[1.15fr_.85fr] lg:items-end"
          >
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-xl border border-[#d6a84f]/30 bg-[#24201a] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#d6a84f]">
                <Sparkles size={15} />
                Catálogo conectado a WooCommerce
              </div>

              <h1 className="max-w-4xl text-5xl font-black leading-[0.92] tracking-tight md:text-7xl">
                Tienda profesional para groomers.
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-white/70 md:text-lg md:leading-8">
                Productos reales, imágenes reales, precios reales y categorías
                cargadas directamente desde WooCommerce.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <MiniBenefit
                icon={<Truck size={18} />}
                title="Envíos 24/48h"
                text="Logística actual"
              />
              <MiniBenefit
                icon={<ShieldCheck size={18} />}
                title="Pago seguro"
                text="WooCommerce"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="mt-8 rounded-[2rem] border border-[#d6a84f]/20 bg-[#181511] p-5 shadow-[0_25px_80px_rgba(0,0,0,0.24)]"
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="relative w-full lg:max-w-lg">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/45"
                  size={18}
                />

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar productos..."
                  className="w-full rounded-xl border border-white/10 bg-[#24201a] py-4 pl-11 pr-5 font-semibold text-white outline-none placeholder:text-white/45 focus:border-[#d6a84f] focus:ring-2 focus:ring-[#d6a84f]/20"
                />
              </div>

              <button className="trg-btn-dark">
                <SlidersHorizontal size={18} />
                Filtros
              </button>
            </div>

            <div className="relative mt-6">
              <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-12 bg-gradient-to-r from-[#181511] to-transparent" />
              <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-12 bg-gradient-to-l from-[#181511] to-transparent" />

              <button
                onClick={() => scrollCategories("left")}
                className="absolute left-0 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-xl bg-[#d6a84f] text-[#181511] shadow-xl transition hover:scale-105"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                onClick={() => scrollCategories("right")}
                className="absolute right-0 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-xl bg-[#d6a84f] text-[#181511] shadow-xl transition hover:scale-105"
              >
                <ChevronRight size={20} />
              </button>

              <div
                ref={scrollRef}
                className="scrollbar-hide flex gap-3 overflow-x-auto px-12 pb-2"
              >
                <CategoryButton
                  active={activeCategory.name === "Todos"}
                  onClick={handleAllClick}
                  label="Todos"
                  count={products.length}
                />

                {categories.map((category) => (
                  <CategoryButton
                    key={category.id}
                    active={activeCategory.id === category.id}
                    onClick={() => handleCategoryClick(category)}
                    label={category.name}
                    count={category.count}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          <div className="mt-6 flex flex-col gap-3 text-sm font-bold text-black/50 sm:flex-row sm:items-center sm:justify-between">
            <p>
              {loading
                ? "Cargando productos reales..."
                : `${filteredProducts.length} productos encontrados`}
            </p>

            <p>
              {activeCategory.name === "Todos"
                ? "WooCommerce conectado"
                : `Categoría: ${activeCategory.name}`}
            </p>
          </div>

          {loading ? (
            <div className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <ProductSkeleton key={index} />
              ))}
            </div>
          ) : (
            <>
              {filteredProducts.length > 0 ? (
                <motion.div
                  layout
                  className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-3"
                >
                  {filteredProducts.map((product, index) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      index={index}
                    />
                  ))}
                </motion.div>
              ) : (
                <div className="mt-10 rounded-[2rem] bg-white p-10 text-center shadow-sm ring-1 ring-black/5">
                  <h2 className="text-2xl font-black text-[#181511]">
                    No encontramos productos
                  </h2>
                  <p className="mt-3 text-black/55">
                    Prueba con otro nombre o cambia de categoría.
                  </p>
                </div>
              )}

              {hasMore && search.trim() === "" && (
                <div className="mt-12 text-center">
                  <button
                    onClick={loadMoreProducts}
                    disabled={loadingMore}
                    className="trg-btn"
                  >
                    {loadingMore ? "Cargando..." : "Cargar más productos"}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}

function CategoryButton({ active, onClick, label, count }) {
  return (
    <button
      onClick={onClick}
      className={`whitespace-nowrap rounded-xl px-5 py-3 text-sm font-black tracking-wide transition ${
        active
          ? "bg-[#d6a84f] text-[#181511] shadow-xl"
          : "bg-[#24201a] text-white/80 ring-1 ring-white/10 hover:bg-[#d6a84f] hover:text-[#181511]"
      }`}
    >
      <span>{label}</span>

      {typeof count === "number" && (
        <span
          className={`ml-2 rounded-md px-2 py-1 text-[10px] ${
            active ? "bg-black/10 text-[#181511]" : "bg-white/10 text-white/70"
          }`}
        >
          {count}
        </span>
      )}
    </button>
  );
}

function MiniBenefit({ icon, title, text }) {
  return (
    <div className="rounded-2xl border border-[#d6a84f]/20 bg-[#24201a] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.16)]">
      <div className="mb-3 grid h-10 w-10 place-items-center rounded-xl bg-[#d6a84f] text-[#181511]">
        {icon}
      </div>
      <p className="font-black text-white">{title}</p>
      <p className="text-sm font-semibold text-white/55">{text}</p>
    </div>
  );
}

function ProductSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-black/5">
      <div className="h-80 bg-black/10" />
      <div className="space-y-4 p-6">
        <div className="h-5 w-3/4 rounded-full bg-black/10" />
        <div className="h-4 w-full rounded-full bg-black/10" />
        <div className="h-4 w-2/3 rounded-full bg-black/10" />
        <div className="flex items-center justify-between pt-4">
          <div className="h-7 w-24 rounded-full bg-black/10" />
          <div className="h-11 w-24 rounded-xl bg-black/10" />
        </div>
      </div>
    </div>
  );
}