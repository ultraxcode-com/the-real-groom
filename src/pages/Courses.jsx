import { Link } from "react-router-dom";
import {
  Award,
  CalendarDays,
  CheckCircle,
  GraduationCap,
  Scissors,
  Sparkles,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";

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
    text: "Técnicas adaptadas a diferentes mantos, estilos y necesidades.",
  },
];

export function Courses() {
  return (
    <main className="bg-[#f6f0e7]">
      <section className="relative overflow-hidden bg-[#181511] px-6 py-20 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#d6a84f33,transparent_35%)]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <p className="mb-3 text-sm font-black uppercase tracking-[0.25em] text-[#d6a84f]">
              Formación profesional
            </p>

            <h1 className="text-4xl font-black leading-tight md:text-6xl">
              Cursos para groomers que quieren mejorar técnica y resultados.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/65">
              Formación especializada para peluquería canina: técnica,
              precisión, acabados profesionales y enfoque práctico para elevar
              el nivel del servicio.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <Mini icon={<Scissors />} title="Técnica" />
              <Mini icon={<Users />} title="Comunidad" />
              <Mini icon={<Award />} title="Nivel pro" />
            </div>

            <Link
              to="/contacto"
              className="mt-8 inline-block rounded-full bg-[#d6a84f] px-8 py-4 font-black text-[#181511] shadow-xl transition hover:scale-[1.02] hover:bg-[#b8872f]"
            >
              Solicitar información
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65 }}
            className="relative"
          >
            <div className="rounded-[2.5rem] bg-[#24201a] p-4 shadow-2xl ring-1 ring-[#d6a84f]/25">
              <div className="grid h-[420px] place-items-center rounded-[2rem] bg-white p-8 md:h-[520px]">
                <div className="text-center">
                  <div className="mx-auto mb-6 grid h-28 w-28 place-items-center rounded-full bg-[#181511] text-[#d6a84f]">
                    <GraduationCap size={48} />
                  </div>

                  <p className="text-xs font-black uppercase tracking-[0.3em] text-black/40">
                    The Real Groom Academy
                  </p>

                  <h2 className="mt-3 text-4xl font-black text-[#181511]">
                    Formación Grooming
                  </h2>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-5 left-6 rounded-3xl bg-[#d6a84f] p-5 text-[#181511] shadow-2xl">
              <Sparkles className="mb-2" />
              <p className="text-sm font-bold text-black/60">Nueva sección</p>
              <p className="text-2xl font-black">Cursos premium</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10">
            <p className="mb-3 text-sm font-black uppercase tracking-[0.25em] text-[#b8872f]">
              Programas
            </p>
            <h2 className="text-4xl font-black text-[#181511] md:text-6xl">
              Formación organizada para distintos niveles
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {courses.map((course, index) => (
              <motion.article
                key={course.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="rounded-[2rem] bg-white p-7 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-2xl"
              >
                <span className="rounded-full bg-[#181511] px-4 py-2 text-xs font-black uppercase tracking-wide text-[#d6a84f]">
                  {course.level}
                </span>

                <h2 className="mt-6 text-2xl font-black text-[#181511]">
                  {course.title}
                </h2>

                <p className="mt-4 leading-7 text-black/55">{course.text}</p>

                <div className="mt-6 space-y-3">
                  <Line text="Contenido práctico" />
                  <Line text="Enfoque profesional" />
                  <Line text="Orientado a resultados" />
                </div>

                <Link
                  to="/contacto"
                  className="mt-7 inline-block rounded-full bg-[#d6a84f] px-6 py-3 text-sm font-black text-[#181511] transition hover:bg-[#b8872f]"
                >
                  Solicitar información
                </Link>
              </motion.article>
            ))}
          </div>

          <div className="mt-16 rounded-[2.5rem] bg-[#181511] p-8 text-white shadow-2xl ring-1 ring-[#d6a84f]/20 md:p-10">
            <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <p className="mb-3 text-sm font-black uppercase tracking-[0.25em] text-[#d6a84f]">
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

              <div className="rounded-3xl bg-[#24201a] p-6 ring-1 ring-[#d6a84f]/20">
                <CalendarDays className="mb-4 text-[#d6a84f]" />
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
    <div className="rounded-3xl bg-[#24201a] p-5 text-center shadow-sm ring-1 ring-[#d6a84f]/20">
      <div className="mx-auto mb-3 grid h-10 w-10 place-items-center rounded-full bg-[#d6a84f] text-[#181511]">
        {icon}
      </div>
      <p className="font-black text-white">{title}</p>
    </div>
  );
}

function Line({ text }) {
  return (
    <p className="flex items-center gap-3 text-sm font-bold text-black/55">
      <CheckCircle size={17} className="text-[#b8872f]" />
      {text}
    </p>
  );
}