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

  const [activeCategory, setActiveCategory] = useState({
    id: null,
    name: "Todos",
  });

  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadInitialData() {
      try {
        const [categoriesData, productsData] = await Promise.all([
          getCategories(),
          getProducts({ perPage: 12, page: 1 }),
        ]);

        setCategories(categoriesData);
        setProducts(productsData);
        setHasMore(productsData.length === 12);
      } catch (error) {
        console.error(error);
        setError("No se pudieron cargar los productos reales.");
      } finally {
        setLoading(false);
      }
    }

    loadInitialData();
  }, []);

  const scrollCategories = (direction) => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: direction === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  const handleAllClick = async () => {
    try {
      setActiveCategory({ id: null, name: "Todos" });
      setSearch("");
      setPage(1);
      setLoading(true);

      const data = await getProducts({ perPage: 12, page: 1 });

      setProducts(data);
      setHasMore(data.length === 12);
    } catch (error) {
      console.error(error);
      setError("No se pudieron cargar los productos.");
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = async (category) => {
    try {
      setActiveCategory(category);
      setSearch("");
      setPage(1);
      setLoading(true);

      const data = await getProducts({
        perPage: 12,
        page: 1,
        categoryId: category.id,
      });

      setProducts(data);
      setHasMore(data.length === 12);
    } catch (error) {
      console.error(error);
      setError("No se pudieron cargar los productos de esta categoría.");
    } finally {
      setLoading(false);
    }
  };

  const loadMoreProducts = async () => {
    try {
      setLoadingMore(true);

      const nextPage = page + 1;

      const data = await getProducts({
        perPage: 12,
        page: nextPage,
        categoryId: activeCategory.id,
      });

      setProducts((prev) => {
        const ids = new Set(prev.map((product) => product.id));
        const uniqueProducts = data.filter((product) => !ids.has(product.id));
        return [...prev, ...uniqueProducts];
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
      <section className="relative overflow-hidden px-4 py-10 md:px-6 md:py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#b8874640,transparent_34%),radial-gradient(circle_at_bottom_left,#18151118,transparent_34%)]" />

        <div className="relative mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="grid gap-8 lg:grid-cols-[1.15fr_.85fr] lg:items-end"
          >
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-4 py-2 text-xs font-black uppercase tracking-wide shadow-sm backdrop-blur">
                <Sparkles size={15} />
                Catálogo conectado a WooCommerce
              </div>

              <h1 className="max-w-4xl text-5xl font-black leading-[0.92] tracking-tight md:text-7xl">
                Tienda profesional para groomers.
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-black/60 md:text-lg md:leading-8">
                Productos reales, imágenes reales, precios reales y categorías
                cargadas directamente desde WooCommerce.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <MiniBenefit
                icon={<Truck size={18} />}
                title="Envíos CTT"
                text="Logística actual"
              />
              <MiniBenefit
                icon={<ShieldCheck size={18} />}
                title="Pago seguro"
                text="Redsys / Bizum"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="mt-8 rounded-[2rem] border border-white/70 bg-white/80 p-4 shadow-[0_25px_80px_rgba(24,21,17,0.08)] backdrop-blur-xl md:p-5"
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="relative w-full lg:max-w-lg">
                <Search
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-black/35"
                  size={18}
                />

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar por producto, categoría o descripción..."
                  className="w-full rounded-full border border-black/10 bg-[#f6f0e7] py-4 pl-12 pr-5 font-semibold outline-none transition focus:bg-white focus:ring-2 focus:ring-[#181511]/10"
                />
              </div>

              <button className="flex items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-5 py-4 text-sm font-black shadow-sm transition hover:-translate-y-0.5 hover:bg-[#181511] hover:text-white">
                <SlidersHorizontal size={18} />
                Filtros avanzados
              </button>
            </div>

            <div className="relative mt-6">
              <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-12 bg-gradient-to-r from-white/90 to-transparent" />
              <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-12 bg-gradient-to-l from-white/90 to-transparent" />

              <button
                onClick={() => scrollCategories("left")}
                className="absolute left-0 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white shadow-xl ring-1 ring-black/10 transition hover:scale-110"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                onClick={() => scrollCategories("right")}
                className="absolute right-0 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white shadow-xl ring-1 ring-black/10 transition hover:scale-110"
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

          <div className="mt-6 flex flex-col gap-3 text-sm font-bold text-black/45 sm:flex-row sm:items-center sm:justify-between">
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

          {error && (
            <div className="mt-8 rounded-2xl bg-red-100 p-5 font-bold text-red-700">
              {error}
            </div>
          )}

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
                  <h2 className="text-2xl font-black">
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
                    className="rounded-full bg-[#181511] px-9 py-4 font-black text-white shadow-xl transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
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
      className={`group whitespace-nowrap rounded-full px-5 py-3 text-sm font-black transition ${
        active
          ? "bg-[#181511] text-white shadow-xl"
          : "bg-white text-black/65 shadow-sm ring-1 ring-black/5 hover:bg-[#eadfce] hover:text-black"
      }`}
    >
      <span>{label}</span>
      {typeof count === "number" && (
        <span
          className={`ml-2 rounded-full px-2 py-1 text-[10px] ${
            active ? "bg-white/15 text-white" : "bg-black/5 text-black/45"
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
    <div className="rounded-3xl border border-white/70 bg-white/80 p-5 shadow-[0_20px_60px_rgba(24,21,17,0.06)] backdrop-blur">
      <div className="mb-3 grid h-10 w-10 place-items-center rounded-full bg-[#181511] text-white">
        {icon}
      </div>
      <p className="font-black">{title}</p>
      <p className="text-sm text-black/50">{text}</p>
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
          <div className="h-11 w-24 rounded-full bg-black/10" />
        </div>
      </div>
    </div>
  );
}