import { useEffect, useMemo, useState } from "react";
import { Search, ShieldCheck, SlidersHorizontal, Truck } from "lucide-react";
import { ProductCard } from "../components/ProductCard";
import { getProducts } from "../services/woocommerce";

export function Shop() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadInitialProducts() {
      try {
        const firstPage = await getProducts({ perPage: 12, page: 1 });

        setProducts(firstPage);
        setHasMore(firstPage.length === 12);
        setLoading(false);

        const secondPage = await getProducts({ perPage: 12, page: 2 });

        if (secondPage.length > 0) {
          setProducts((prev) => {
            const ids = new Set(prev.map((p) => p.id));
            const unique = secondPage.filter((p) => !ids.has(p.id));
            return [...prev, ...unique];
          });

          setPage(2);
          setHasMore(secondPage.length === 12);
        }
      } catch (error) {
        console.error(error);
        setError("No se pudieron cargar los productos reales.");
        setLoading(false);
      }
    }

    loadInitialProducts();
  }, []);

  const loadMoreProducts = async () => {
    try {
      setLoadingMore(true);

      const nextPage = page + 1;
      const data = await getProducts({ perPage: 12, page: nextPage });

      setProducts((prev) => {
        const ids = new Set(prev.map((p) => p.id));
        const unique = data.filter((p) => !ids.has(p.id));
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

  const categories = useMemo(() => {
    return ["Todos", ...new Set(products.map((product) => product.category))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        activeCategory === "Todos" || product.category === activeCategory;

      const text = `${product.name} ${product.category} ${product.description}`.toLowerCase();

      const matchesSearch = text.includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search, products]);

  const canLoadMore =
    hasMore && activeCategory === "Todos" && search.trim() === "";

  return (
    <main className="bg-[#f6f0e7]">
      <section className="relative overflow-hidden px-4 py-10 md:px-6 md:py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#b8874630,transparent_35%)]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
            <div>
              <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-black/40 md:text-sm">
                Catálogo real
              </p>

              <h1 className="text-4xl font-black leading-tight tracking-tight md:text-7xl">
                Tienda profesional
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-black/60 md:text-lg md:leading-8">
                Productos conectados desde WooCommerce con imágenes, precios y
                categorías reales.
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
                text="WooCommerce"
              />
            </div>
          </div>

          <div className="mt-8 rounded-[2rem] bg-white p-4 shadow-sm ring-1 ring-black/5 md:p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="relative w-full lg:max-w-md">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-black/35"
                  size={18}
                />

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar producto, categoría o descripción..."
                  className="w-full rounded-full border border-black/10 bg-[#f6f0e7] py-4 pl-11 pr-5 font-semibold outline-none transition focus:ring-2 focus:ring-black/10"
                />
              </div>

              <button className="flex items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-5 py-4 text-sm font-black shadow-sm transition hover:bg-[#181511] hover:text-white">
                <SlidersHorizontal size={18} />
                Filtros avanzados
              </button>
            </div>

            <div className="mt-5 flex gap-3 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`whitespace-nowrap rounded-full px-5 py-3 text-sm font-black transition ${
                    activeCategory === category
                      ? "bg-[#181511] text-white shadow-lg"
                      : "bg-[#f6f0e7] text-black/65 hover:bg-[#eadfce]"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between text-sm font-bold text-black/45">
            <p>
              {loading
                ? "Cargando productos reales..."
                : `${filteredProducts.length} productos encontrados`}
            </p>

            <p>{products.length > 0 ? "WooCommerce conectado" : ""}</p>
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
              <div className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {canLoadMore && (
                <div className="mt-12 text-center">
                  <button
                    onClick={loadMoreProducts}
                    disabled={loadingMore}
                    className="rounded-full bg-[#181511] px-8 py-4 font-black text-white shadow-xl transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
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

function MiniBenefit({ icon, title, text }) {
  return (
    <div className="rounded-3xl bg-white/80 p-5 shadow-sm ring-1 ring-black/5">
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