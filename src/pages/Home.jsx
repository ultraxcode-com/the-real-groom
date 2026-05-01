import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Quote, Scissors, Users } from "lucide-react";
import { getCategories, getProducts } from "../services/woocommerce";
import { Hero } from "../components/Hero";
import { Promociones } from "../components/Promociones";
import { PetfumeSection } from "../components/PetfumeSection";

const goldText =
  "bg-gradient-to-r from-[#8C6A2A] via-[#D4AF37] to-[#F4E6C3] bg-clip-text text-transparent drop-shadow-[0_0_14px_rgba(212,175,55,0.25)]";

const goldButton =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#8C6A2A] via-[#D4AF37] to-[#F4E6C3] px-6 py-3 font-black text-[#181511] shadow-[0_0_24px_rgba(212,175,55,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_0_34px_rgba(212,175,55,0.55)]";

export function Home() {
  const [featured, setFeatured] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getProducts({ perPage: 6, page: 1 })
      .then((data) => setFeatured(Array.isArray(data) ? data : []))
      .catch(console.error);

    getCategories()
      .then((data) => setCategories(Array.isArray(data) ? data : []))
      .catch(console.error);
  }, []);

  return (
    <main className="overflow-hidden bg-[#181511] text-white">
      <Hero product={featured} />

      <section className="border-y border-[#D4AF37]/15 bg-[#100e0b] px-4 py-5 md:px-6">
        <div className="mx-auto grid max-w-7xl gap-4 text-sm font-black uppercase tracking-wide text-white/70 md:grid-cols-3">
          <p>Envío gratis en España desde 75€</p>
          <p className={goldText}>Productos y cursos para groomers</p>
          <p>Distribución profesional disponible</p>
        </div>
      </section>

      <Promociones />

      <section className="px-4 py-16 md:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className={`mb-2 text-sm font-black uppercase tracking-[0.25em] ${goldText}`}>
                Categorías
              </p>

              <h2 className="text-4xl font-black text-white md:text-6xl">
                Todo para el grooming profesional
              </h2>
            </div>

            <Link to="/tienda" className={goldButton}>
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
                ]).map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      <PetfumeSection />

      <section className="px-4 py-16 md:px-6">
        <div className="mx-auto grid max-w-7xl gap-8 rounded-[2.5rem] border border-[#D4AF37]/20 bg-[#100e0b] p-8 shadow-2xl lg:grid-cols-[1fr_auto] lg:items-center md:p-12">
          <div>
            <p className={`mb-3 text-sm font-black uppercase tracking-[0.25em] ${goldText}`}>
              Hazte distribuidor
            </p>

            <h2 className="text-3xl font-black md:text-5xl">
              Haz crecer tu negocio con The Real Groom.
            </h2>

            <p className="mt-4 max-w-2xl text-white/60">
              Productos profesionales, cosmética, herramientas y formación para
              groomers que quieren elevar la calidad de su salón.
            </p>
          </div>

          <Link to="/contacto" className={goldButton}>
            Solicitar información
          </Link>
        </div>
      </section>

      <section className="px-4 py-16 md:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10">
            <p className={`mb-3 text-sm font-black uppercase tracking-[0.25em] ${goldText}`}>
              Nuestros valores
            </p>

            <h2 className="text-4xl font-black text-white md:text-6xl">
              ¿Qué hace únicos a The Real Groom?
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-4">
            <ValueCard
              title="Calidad"
              text="Productos y herramientas pensadas para uso profesional."
            />
            <ValueCard
              title="Formación"
              text="Cursos y recursos para expertos en grooming."
            />
            <ValueCard
              title="Experiencia"
              text="Más de 5 años de experiencia en estilismo canino."
            />
            <ValueCard
              title="Orgullo profesional"
              text="Una marca creada para groomers exigentes."
            />
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:px-6">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[.8fr_1fr]">
          <div className="rounded-[2.5rem] border border-[#D4AF37]/20 bg-[#100e0b] p-8 shadow-xl md:p-12">
            <Users className="mb-5 text-[#D4AF37] drop-shadow-[0_0_14px_rgba(212,175,55,0.35)]" size={36} />

            <p className={`mb-3 text-sm font-black uppercase tracking-[0.25em] ${goldText}`}>
              Historia
            </p>

            <h2 className="text-4xl font-black md:text-5xl">
              Una marca con visión profesional.
            </h2>

            <p className="mt-5 leading-8 text-white/60">
              The Real Groom nace desde la experiencia en estilismo canino y la
              formación de profesionales del grooming.
            </p>
          </div>

          <div className="rounded-[2.5rem] border border-[#D4AF37]/20 bg-[#24201a] p-8 shadow-xl md:p-12">
            <p className={`mb-3 text-sm font-black uppercase tracking-[0.25em] ${goldText}`}>
              Peluquería canina y felina en Córdoba
            </p>

            <h2 className="text-4xl font-black text-white md:text-5xl">
              Tienda física, asesoramiento y atención profesional.
            </h2>

            <p className="mt-5 leading-8 text-white/60">
              Presencia física para ofrecer productos, servicios especializados
              y atención directa a profesionales y clientes.
            </p>

            <div className="mt-6 space-y-3 text-sm font-bold text-white/65">
              <p className="flex items-center gap-3">
                <MapPin className="text-[#D4AF37] drop-shadow-[0_0_12px_rgba(212,175,55,0.35)]" size={18} />
                Fernando Amor y Mayor, 1, Noroeste, 14011 Córdoba
              </p>
              <p>Teléfono tienda: 621 33 25 37</p>
              <p>Reservas peluquería: 722 593 888</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10">
            <p className={`mb-3 text-sm font-black uppercase tracking-[0.25em] ${goldText}`}>
              Testimonios
            </p>

            <h2 className="text-4xl font-black text-white md:text-6xl">
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
      to={`/tienda?category=${category.id}`}
      className="group rounded-[2rem] border border-[#D4AF37]/20 bg-[#24201a] p-7 text-white shadow-xl transition hover:-translate-y-1 hover:border-[#F4E6C3]/50 hover:shadow-[0_0_30px_rgba(212,175,55,0.2)]"
    >
      <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-r from-[#8C6A2A] via-[#D4AF37] to-[#F4E6C3] text-[#181511] shadow-[0_0_20px_rgba(212,175,55,0.35)]">
        <Scissors size={22} />
      </div>

      <h3 className="text-2xl font-black">{category.name}</h3>

      <p className="mt-2 text-white/55">
        {category.count > 0
          ? `${category.count} productos disponibles`
          : "Productos profesionales"}
      </p>

      <p className={`mt-5 font-black ${goldText}`}>Ver categoría →</p>
    </Link>
  );
}

function ValueCard({ title, text }) {
  return (
    <article className="rounded-[2rem] border border-[#D4AF37]/15 bg-[#24201a] p-7 shadow-sm transition hover:-translate-y-1 hover:border-[#F4E6C3]/45 hover:shadow-[0_0_30px_rgba(212,175,55,0.16)]">
      <p className={`mb-4 text-sm font-black uppercase tracking-[0.25em] ${goldText}`}>
        Valor
      </p>

      <h3 className="text-2xl font-black text-white">{title}</h3>

      <p className="mt-3 leading-7 text-white/55">{text}</p>
    </article>
  );
}

function Testimonial({ text }) {
  return (
    <article className="rounded-[2rem] border border-[#D4AF37]/15 bg-[#24201a] p-7 shadow-sm">
      <Quote className="mb-5 text-[#D4AF37] drop-shadow-[0_0_12px_rgba(212,175,55,0.35)]" />
      <p className="leading-7 text-white/60">“{text}”</p>
    </article>
  );
}