import { Link } from "react-router-dom";
import { Award, CalendarDays, CheckCircle, Scissors, Users } from "lucide-react";

const courses = [
  {
    title: "Curso Básico de Grooming",
    level: "Inicial",
    text: "Ideal para quienes quieren empezar en peluquería canina profesional.",
  },
  {
    title: "Técnicas Avanzadas de Corte",
    level: "Avanzado",
    text: "Perfecciona acabados, simetría, volumen y trabajo con tijera.",
  },
  {
    title: "Grooming por Raza",
    level: "Especialización",
    text: "Aprende técnicas adaptadas a diferentes mantos y necesidades.",
  },
];

export function Courses() {
  return (
    <main className="bg-[#f6f0e7]">
      <section className="relative overflow-hidden px-6 py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#b8874630,transparent_35%)]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="mb-3 text-sm font-black uppercase tracking-[0.25em] text-black/40">
                Formación profesional
              </p>

              <h1 className="text-4xl font-black leading-tight md:text-6xl">
                Cursos para groomers que quieren mejorar su técnica y vender más.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-black/60">
                Además de productos profesionales, The Real Groom puede potenciar
                su marca con formación, contenido educativo y cursos
                especializados para peluquería canina.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <Mini icon={<Scissors />} title="Técnica" />
                <Mini icon={<Users />} title="Comunidad" />
                <Mini icon={<Award />} title="Certificación" />
              </div>
            </div>

            <div className="rounded-[2rem] bg-[#181511] p-4 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=1200&q=80"
                alt="Curso de grooming profesional"
                className="h-[420px] w-full rounded-[1.5rem] object-cover opacity-90 md:h-[520px]"
              />
            </div>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {courses.map((course) => (
              <article
                key={course.title}
                className="rounded-[2rem] bg-white p-7 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-2xl"
              >
                <span className="rounded-full bg-[#f6f0e7] px-4 py-2 text-xs font-black uppercase tracking-wide text-black/50">
                  {course.level}
                </span>

                <h2 className="mt-6 text-2xl font-black">{course.title}</h2>

                <p className="mt-4 leading-7 text-black/55">{course.text}</p>

                <div className="mt-6 space-y-3">
                  <Line text="Contenido práctico" />
                  <Line text="Enfoque profesional" />
                  <Line text="Orientado a resultados" />
                </div>

                <Link
                  to="/contacto"
                  className="mt-7 inline-block rounded-full bg-[#181511] px-6 py-3 text-sm font-black text-white"
                >
                  Solicitar información
                </Link>
              </article>
            ))}
          </div>

          <div className="mt-16 rounded-[2rem] bg-[#181511] p-8 text-white md:p-10">
            <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <p className="mb-3 text-sm font-black uppercase tracking-[0.25em] text-white/40">
                  Próxima evolución
                </p>
                <h2 className="text-3xl font-black md:text-5xl">
                  Cursos, productos y contenido en una misma experiencia.
                </h2>
                <p className="mt-4 max-w-2xl text-white/60">
                  Esta sección puede integrarse con WooCommerce para vender
                  cursos, packs profesionales o formación especializada.
                </p>
              </div>

              <div className="rounded-3xl bg-white/10 p-6">
                <CalendarDays className="mb-4" />
                <p className="text-2xl font-black">Agenda formativa</p>
                <p className="mt-2 text-sm text-white/60">
                  Próximos cursos, plazas y reservas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Mini({ icon, title }) {
  return (
    <div className="rounded-3xl bg-white p-5 text-center shadow-sm ring-1 ring-black/5">
      <div className="mx-auto mb-3 grid h-10 w-10 place-items-center rounded-full bg-[#181511] text-white">
        {icon}
      </div>
      <p className="font-black">{title}</p>
    </div>
  );
}

function Line({ text }) {
  return (
    <p className="flex items-center gap-3 text-sm font-bold text-black/55">
      <CheckCircle size={17} className="text-[#b88746]" />
      {text}
    </p>
  );
}