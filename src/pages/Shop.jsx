import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { motion } from "framer-motion";
import { ProductCard } from "../components/ProductCard";
import { getCategories, getProducts } from "../services/woocommerce";

const goldText =
  "bg-gradient-to-r from-[#8C6A2A] via-[#D4AF37] to-[#F4E6C3] bg-clip-text text-transparent drop-shadow-[0_0_14px_rgba(212,175,55,0.25)]";

const goldButton =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#8C6A2A] via-[#D4AF37] to-[#F4E6C3] px-6 py-3 font-black text-[#181511] shadow-[0_0_24px_rgba(212,175,55,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_0_34px_rgba(212,175,55,0.55)]";

export function Shop() {
  const scrollRef = useRef(null);
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category");

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
      setLoading(true);

      try {
        const catData = await getCategories();
        const safeCategories = Array.isArray(catData) ? catData : [];

        setCategories(safeCategories);

        const selectedCategory = safeCategories.find(
          (cat) => String(cat.id) === String(categoryFromUrl)
        );

        const prodData = await getProducts({
          perPage: 12,
          page: 1,
          categoryId: selectedCategory?.id || undefined,
        });

        setActiveCategory(
          selectedCategory || {
            id: null,
            name: "Todos",
          }
        );

        setProducts(Array.isArray(prodData) ? prodData : []);
        setHasMore(Array.isArray(prodData) && prodData.length === 12);
        setPage(1);
        setSearch("");
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [categoryFromUrl]);

  const scrollCategories = (direction) => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: direction === "left" ? -280 : 280,
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
      setProducts(Array.isArray(data) ? data : []);
      setHasMore(Array.isArray(data) && data.length === 12);
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

      setProducts(Array.isArray(data) ? data : []);
      setHasMore(Array.isArray(data) && data.length === 12);
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
        categoryId: activeCategory.id || undefined,
      });

      const safeData = Array.isArray(data) ? data : [];

      setProducts((prev) => {
        const ids = new Set(prev.map((item) => item.id));
        const unique = safeData.filter((item) => !ids.has(item.id));
        return [...prev, ...unique];
      });

      setPage(nextPage);
      setHasMore(safeData.length === 12);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingMore(false);
    }
  };

  const filteredProducts = products.filter((product) => {
    const text = `
      ${product.name || ""}
      ${product.description || ""}
      ${product.short_description || ""}
      ${(product.categories || []).map((cat) => cat.name).join(" ")}
    `.toLowerCase();

    return text.includes(search.toLowerCase());
  });

  return (
    <main className="min-h-screen bg-[#181511] text-white">
      <section className="relative overflow-hidden px-4 py-8 md:px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.16),transparent_32%)]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="rounded-[2rem] border border-[#D4AF37]/20 bg-[#100e0b] p-5 shadow-[0_25px_80px_rgba(0,0,0,0.35)]">
            <div className="grid gap-5 lg:grid-cols-[1fr_520px] lg:items-center">
              <div>
                <p
                  className={`mb-2 text-xs font-black uppercase tracking-[0.25em] ${goldText}`}
                >
                  Catálogo profesional
                </p>

                <h1 className="text-3xl font-black leading-tight text-white md:text-4xl">
                  Tienda para groomers.
                </h1>

                <p className="mt-2 max-w-xl text-sm leading-6 text-white/55">
                  Productos profesionales para peluquería canina, cosmética,
                  herramientas y formación especializada.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative w-full">
                  <Search
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white/45"
                    size={18}
                  />

                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Buscar productos..."
                    className="w-full rounded-xl border border-[#D4AF37]/15 bg-[#24201a] py-4 pl-11 pr-5 font-semibold text-white outline-none placeholder:text-white/45 focus:border-[#F4E6C3]/60 focus:ring-2 focus:ring-[#D4AF37]/20"
                  />
                </div>

                <button className={goldButton}>
                  <SlidersHorizontal size={18} />
                  Filtros
                </button>
              </div>
            </div>

            <div className="relative mt-4 lg:hidden">
              <button
                onClick={() => scrollCategories("left")}
                className="absolute left-0 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-xl bg-gradient-to-r from-[#8C6A2A] via-[#D4AF37] to-[#F4E6C3] text-[#181511] shadow-[0_0_16px_rgba(212,175,55,0.35)]"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                onClick={() => scrollCategories("right")}
                className="absolute right-0 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-xl bg-gradient-to-r from-[#8C6A2A] via-[#D4AF37] to-[#F4E6C3] text-[#181511] shadow-[0_0_16px_rgba(212,175,55,0.35)]"
              >
                <ChevronRight size={20} />
              </button>

              <div
                ref={scrollRef}
                className="flex gap-3 overflow-x-auto px-12 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
          </div>

          <div className="mt-5 grid gap-8 lg:grid-cols-[280px_1fr]">
            <aside className="hidden h-fit rounded-[2rem] border border-[#D4AF37]/20 bg-[#100e0b] p-5 shadow-2xl lg:block">
              <p
                className={`mb-5 text-sm font-black uppercase tracking-[0.25em] ${goldText}`}
              >
                Categorías
              </p>

              <div className="space-y-2">
                <SidebarCategoryButton
                  active={activeCategory.name === "Todos"}
                  onClick={handleAllClick}
                  label="Todos"
                  count={products.length}
                />

                {categories.map((category) => (
                  <SidebarCategoryButton
                    key={category.id}
                    active={activeCategory.id === category.id}
                    onClick={() => handleCategoryClick(category)}
                    label={category.name}
                    count={category.count}
                  />
                ))}
              </div>
            </aside>

            <section>
              <div className="mb-5 flex flex-col gap-3 text-sm font-bold text-white/50 sm:flex-row sm:items-center sm:justify-between">
                <p>
                  {loading
                    ? "Cargando productos..."
                    : `${filteredProducts.length} productos encontrados`}
                </p>

                <p>
                  {activeCategory.name === "Todos"
                    ? "Catálogo completo"
                    : `Categoría: ${activeCategory.name}`}
                </p>
              </div>

              {loading ? (
                <div className="grid gap-7 sm:grid-cols-2 xl:grid-cols-3">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <ProductSkeleton key={index} />
                  ))}
                </div>
              ) : (
                <>
                  {filteredProducts.length > 0 ? (
                    <motion.div
                      layout
                      className="grid gap-7 sm:grid-cols-2 xl:grid-cols-3"
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
                    <div className="rounded-[2rem] border border-[#D4AF37]/20 bg-[#24201a] p-10 text-center shadow-sm">
                      <h2 className="text-2xl font-black text-white">
                        No encontramos productos
                      </h2>

                      <p className="mt-3 text-white/55">
                        Prueba con otro nombre o cambia de categoría.
                      </p>
                    </div>
                  )}

                  {hasMore && search.trim() === "" && (
                    <div className="mt-12 text-center">
                      <button
                        onClick={loadMoreProducts}
                        disabled={loadingMore}
                        className={goldButton}
                      >
                        {loadingMore ? "Cargando..." : "Cargar más productos"}
                      </button>
                    </div>
                  )}
                </>
              )}
            </section>
          </div>
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
          ? "bg-gradient-to-r from-[#8C6A2A] via-[#D4AF37] to-[#F4E6C3] text-[#181511] shadow-[0_0_18px_rgba(212,175,55,0.35)]"
          : "bg-[#24201a] text-white/80 ring-1 ring-[#D4AF37]/15 hover:text-white"
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

function SidebarCategoryButton({ active, onClick, label, count }) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-black transition ${
        active
          ? "bg-gradient-to-r from-[#8C6A2A] via-[#D4AF37] to-[#F4E6C3] text-[#181511] shadow-[0_0_18px_rgba(212,175,55,0.28)]"
          : "bg-[#24201a] text-white/70 hover:bg-[#2f2a22] hover:text-white"
      }`}
    >
      <span className="line-clamp-1">{label}</span>

      {typeof count === "number" && (
        <span
          className={`ml-3 rounded-md px-2 py-1 text-[10px] ${
            active ? "bg-black/10 text-[#181511]" : "bg-white/10 text-white/60"
          }`}
        >
          {count}
        </span>
      )}
    </button>
  );
}

function ProductSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-[2rem] border border-[#D4AF37]/10 bg-[#24201a] shadow-sm">
      <div className="h-80 bg-white/5" />
      <div className="space-y-4 p-6">
        <div className="h-5 w-3/4 rounded-full bg-white/10" />
        <div className="h-4 w-full rounded-full bg-white/10" />
        <div className="h-4 w-2/3 rounded-full bg-white/10" />
        <div className="flex items-center justify-between pt-4">
          <div className="h-7 w-24 rounded-full bg-white/10" />
          <div className="h-11 w-24 rounded-xl bg-white/10" />
        </div>
      </div>
    </div>
  );
}