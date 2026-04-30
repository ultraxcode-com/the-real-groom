import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  MapPin,
  Quote,
  Scissors,
  Sparkles,
  Users,
} from "lucide-react";
import { getCategories, getProducts } from "../services/woocommerce";
import { ProductCard } from "../components/ProductCard";
import { Hero } from "../components/Hero";

export function Home() {
  const [featured, setFeatured] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getProducts({ perPage: 6, page: 1 })
      .then(setFeatured)
      .catch(console.error);

    getCategories().then(setCategories).catch(console.error);

    setTimeout(async () => {
      try {
        const categoriesData = await getCategories();

        categoriesData.forEach((category, index) => {
          setTimeout(() => {
            getProducts({
              perPage: 12,
              page: 1,
              categoryId: category.id,
            }).catch(console.error);
          }, index * 1200);
        });
      } catch (error) {
        console.error(error);
      }
    }, 1000);

    setTimeout(
      () => getProducts({ perPage: 12, page: 1 }).catch(console.error),
      1200
    );
    setTimeout(
      () => getProducts({ perPage: 12, page: 2 }).catch(console.error),
      2500
    );
    setTimeout(
      () => getProducts({ perPage: 12, page: 3 }).catch(console.error),
      4000
    );
  }, []);

  return (
    <main className="overflow-hidden bg-[#f6f0e7]">
      <Hero product={featured} />

      <section className="bg-[#181511] px-4 py-5 text-white md:px-6">
        <div className="mx-auto grid max-w-7xl gap-4 text-sm font-black uppercase tracking-wide text-white/70 md:grid-cols-3">
          <p>Envío gratis en España desde 75€</p>
          <p className="text-[#d6a84f]">Productos creados por y para groomers</p>
          <p>Distribución profesional disponible</p>
        </div>
      </section>

      <section className="px-4 py-16 md:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="mb-2 text-sm font-black uppercase tracking-[0.25em] text-[#b8872f]">
                Categorías
              </p>
              <h2 className="text-4xl font-black text-[#181511] md:text-6xl">
                Todo para el grooming profesional
              </h2>
            </div>

            <Link to="/tienda" className="trg-btn">
              Ver todas
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {(categories.length > 0
              ? categories.slice(0, 8)
              : [
                  { id: 1, name: "Tijeras", count: 0 },
                  { id: 2, name: "Cosmética", count: 0 },
                  { id: 3, name: "Peines", count: 0 },
                  { id: 4, name: "Accesorios", count: 0 },
                  { id: 5, name: "Cardas", count: 0 },
                  { id: 6, name: "Máquinas", count: 0 },
                  { id: 7, name: "Cuchillas", count: 0 },
                  { id: 8, name: "Secadores", count: 0 },
                ]).map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:px-6">
        <div className="mx-auto grid max-w-7xl gap-10 rounded-[2.5rem] bg-white p-8 shadow-xl ring-1 ring-black/5 lg:grid-cols-[1fr_.8fr] lg:items-center md:p-12">
          <div>
            <p className="mb-3 text-sm font-black uppercase tracking-[0.25em] text-[#b8872f]">
              Petfume
            </p>

            <h2 className="text-4xl font-black leading-tight text-[#181511] md:text-6xl">
              Alta perfumería natural para mascotas.
            </h2>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-black/55">
              Una línea pensada para elevar el acabado, la imagen y la
              experiencia del grooming profesional, presentada de forma más
              clara, elegante y orientada a la conversión.
            </p>

            <Link to="/tienda" className="trg-btn mt-8">
              Ver productos Petfume
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="rounded-[2rem] bg-[#181511] p-8 text-white">
            <Sparkles className="mb-5 text-[#d6a84f]" size={34} />
            <h3 className="text-3xl font-black">
              Calidad, aroma y presentación profesional.
            </h3>
            <p className="mt-4 leading-8 text-white/60">
              El objetivo visual es mantener la esencia premium de la marca,
              pero mejorar la organización de la información y reducir tiempos
              de espera.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="mb-2 text-sm font-black uppercase tracking-[0.25em] text-[#b8872f]">
                Selección 2025
              </p>
              <h2 className="text-4xl font-black text-[#181511] md:text-6xl">
                Productos destacados reales
              </h2>
            </div>

            <Link to="/tienda" className="trg-btn">
              Ver catálogo completo
            </Link>
          </div>

          {featured.length === 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-96 animate-pulse rounded-[2rem] bg-white"
                />
              ))}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="px-4 py-16 md:px-6">
        <div className="mx-auto grid max-w-7xl gap-8 rounded-[2.5rem] bg-[#181511] p-8 text-white shadow-2xl ring-1 ring-[#d6a84f]/20 lg:grid-cols-[1fr_auto] lg:items-center md:p-12">
          <div>
            <p className="mb-3 text-sm font-black uppercase tracking-[0.25em] text-[#d6a84f]">
              Hazte distribuidor
            </p>

            <h2 className="text-3xl font-black md:text-5xl">
              Haz crecer tu negocio con The Real Groom.
            </h2>

            <p className="mt-4 max-w-2xl text-white/60">
              Una sección pensada para profesionales que quieran distribuir
              productos de la marca, con información clara, contacto directo y
              una presentación más comercial.
            </p>
          </div>

          <Link to="/contacto" className="trg-btn">
            Solicitar información
          </Link>
        </div>
      </section>

      <section className="px-4 py-16 md:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10">
            <p className="mb-3 text-sm font-black uppercase tracking-[0.25em] text-[#b8872f]">
              Nuestros valores
            </p>
            <h2 className="text-4xl font-black text-[#181511] md:text-6xl">
              ¿Qué hace únicos a The Real Groom?
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-4">
            <ValueCard
              title="Calidad"
              text="Materiales y productos pensados para un uso profesional."
            />
            <ValueCard
              title="Innovación"
              text="Una marca en constante evolución para mejorar el servicio."
            />
            <ValueCard
              title="Excelencia"
              text="Cuidado en cada detalle, desde el producto hasta la experiencia."
            />
            <ValueCard
              title="Orgullo profesional"
              text="Herramientas creadas por y para groomers."
            />
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:px-6">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[.8fr_1fr]">
          <div className="rounded-[2.5rem] bg-[#181511] p-8 text-white shadow-xl ring-1 ring-[#d6a84f]/20 md:p-12">
            <Users className="mb-5 text-[#d6a84f]" size={36} />
            <p className="mb-3 text-sm font-black uppercase tracking-[0.25em] text-[#d6a84f]">
              Historia
            </p>
            <h2 className="text-4xl font-black md:text-5xl">
              Una marca con visión profesional.
            </h2>
            <p className="mt-5 leading-8 text-white/60">
              La nueva versión debe mantener la historia, personalidad y
              confianza de la marca, pero con una presentación más limpia,
              rápida y fácil de navegar.
            </p>
          </div>

          <div className="rounded-[2.5rem] bg-white p-8 shadow-xl ring-1 ring-black/5 md:p-12">
            <p className="mb-3 text-sm font-black uppercase tracking-[0.25em] text-[#b8872f]">
              Peluquería canina y felina en Córdoba
            </p>

            <h2 className="text-4xl font-black text-[#181511] md:text-5xl">
              Atención profesional, tienda física y asesoramiento.
            </h2>

            <p className="mt-5 leading-8 text-black/55">
              The Real Groom cuenta con presencia física para ofrecer productos,
              asesoramiento y servicios especializados de peluquería canina y
              felina.
            </p>

            <div className="mt-6 space-y-3 text-sm font-bold text-black/60">
              <p className="flex items-center gap-3">
                <MapPin className="text-[#b8872f]" size={18} />
                Fernando Amor y Mayor, 1, Noroeste, 14011 Córdoba
              </p>
              <p>Horario: 10:00h - 14:00h / 17:00h - 20:00h</p>
              <p>Teléfono tienda: 621 33 25 37</p>
              <p>Reservas peluquería: 722 593 888</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10">
            <p className="mb-3 text-sm font-black uppercase tracking-[0.25em] text-[#b8872f]">
              Testimonios
            </p>
            <h2 className="text-4xl font-black text-[#181511] md:text-6xl">
              Confianza profesional
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <Testimonial text="Productos de gran calidad y atención muy profesional." />
            <Testimonial text="Una tienda especializada con herramientas para groomers exigentes." />
            <Testimonial text="Buena experiencia, asesoramiento y productos muy cuidados." />
          </div>
        </div>
      </section>
    </main>
  );
}

function CategoryCard({ category }) {
  return (
    <Link
      to="/tienda"
      className="group rounded-[2rem] bg-[#181511] p-7 text-white shadow-xl ring-1 ring-[#d6a84f]/20 transition hover:-translate-y-1 hover:shadow-2xl"
    >
      <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-[#d6a84f] text-[#181511]">
        <Scissors size={22} />
      </div>

      <h3 className="text-2xl font-black">{category.name}</h3>

      <p className="mt-2 text-white/55">
        {category.count > 0
          ? `${category.count} productos disponibles`
          : "Productos profesionales"}
      </p>

      <p className="mt-5 font-black text-[#d6a84f]">Ver categoría →</p>
    </Link>
  );
}

function ValueCard({ title, text }) {
  return (
    <article className="rounded-[2rem] bg-white p-7 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-2xl">
      <p className="mb-4 text-sm font-black uppercase tracking-[0.25em] text-[#b8872f]">
        Valor
      </p>
      <h3 className="text-2xl font-black text-[#181511]">{title}</h3>
      <p className="mt-3 leading-7 text-black/55">{text}</p>
    </article>
  );
}

function Testimonial({ text }) {
  return (
    <article className="rounded-[2rem] bg-white p-7 shadow-sm ring-1 ring-black/5">
      <Quote className="mb-5 text-[#d6a84f]" />
      <p className="leading-7 text-black/60">“{text}”</p>
    </article>
  );
}