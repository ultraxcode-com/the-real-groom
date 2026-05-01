import { Link } from "react-router-dom";
import {
  Award,
  CheckCircle,
  Scissors,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";

// 📸 IMÁGENES
import cursoPrincipal from "../assets/cursos/curso-principal.png";
import desdeCero from "../assets/cursos/curso-desde-cero.png";
import negocioFactura from "../assets/cursos/negocio-factura.png";
import pomerania from "../assets/cursos/pomerania.png";
import bichonMaltes from "../assets/cursos/bichon-maltes.png";
import grupoPrivado from "../assets/cursos/grupo-privado.png";
import canicheTeddy from "../assets/cursos/caniche-teddy.png";
import canicheCarita from "../assets/cursos/caniche-carita.png";
import packCaritas from "../assets/cursos/pack-caritas.png";
import packCortes from "../assets/cursos/pack-cortes.png";
import yorkshire from "../assets/cursos/yorkshire.png";

const goldText =
  "bg-gradient-to-r from-[#8C6A2A] via-[#D4AF37] to-[#F4E6C3] bg-clip-text text-transparent";

const goldButton =
  "inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#8C6A2A] via-[#D4AF37] to-[#F4E6C3] px-6 py-4 font-black text-[#181511] shadow-[0_0_22px_rgba(212,175,55,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_0_34px_rgba(212,175,55,0.55)]";

const courses = [
  { title: "Curso Peluquería canina desde 0", level: "Desde cero", text: "Aprende las bases del grooming profesional.", image: desdeCero },
  { title: "Curso Negocio que Factura", level: "Negocio", text: "Crea un negocio rentable en grooming.", image: negocioFactura },
  { title: "Especialización Pomerania", level: "Especialización", text: "Técnica avanzada para Pomerania.", image: pomerania },
  { title: "Especialización Bichón Maltés", level: "Especialización", text: "Acabados profesionales en Bichón Maltés.", image: bichonMaltes },
  { title: "Grupo privado Grooming", level: "Directos", text: "Formación continua y soporte.", image: grupoPrivado },
  { title: "Curso Caniche Teddy", level: "Online", text: "Corte Teddy paso a paso.", image: canicheTeddy },
  { title: "Caniche Carita", level: "Técnica", text: "Trabajo de expresión facial.", image: canicheCarita },
  { title: "Pack Caritas", level: "Pack", text: "Mejora acabados y detalles.", image: packCaritas },
  { title: "Pack Cortes", level: "Pack", text: "Entrenamiento completo de cortes.", image: packCortes },
  { title: "Yorkshire Terrier", level: "Raza", text: "Técnica profesional Yorkshire.", image: yorkshire },
];

export function Courses() {
  return (
    <main className="bg-[#181511] text-white">
      {/* HERO */}
      <section className="relative overflow-hidden px-4 py-16 md:px-6 md:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.20),transparent_35%)]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div>
            <p className={`mb-3 text-sm font-black uppercase tracking-[0.25em] ${goldText}`}>
              Formación profesional
            </p>

            <h1 className="text-4xl font-black md:text-6xl">
              Cursos de grooming profesional
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-white/70 md:text-xl md:leading-9">
              Formación diseñada desde la experiencia real en grooming profesional,
              pensada para perfeccionar técnica, ampliar conocimientos y desarrollar una carrera sólida.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <Mini icon={<Scissors />} title="Técnica" />
              <Mini icon={<Users />} title="Soporte" />
              <Mini icon={<Award />} title="Nivel pro" />
            </div>

            <Link to="/contacto" className={`${goldButton} mt-8`}>
              Solicitar info
            </Link>
          </div>

          <div className="rounded-[2rem] bg-[#24201a] p-4">
            <div className="overflow-hidden rounded-[2rem] border border-[#D4AF37]/20 bg-[#100e0b] shadow-2xl">
              <img
                src={cursoPrincipal}
                alt="Cursos grooming"
                className="h-[560px] w-full object-cover object-[35%_center] md:h-[660px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CURSOS */}
      <section className="px-4 pb-20 md:px-6">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 xl:grid-cols-3">
          {courses.map((course, index) => (
            <CourseCard key={index} course={course} />
          ))}
        </div>
      </section>
    </main>
  );
}

/* CARD */
function CourseCard({ course }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-[#D4AF37]/10 bg-[#100e0b]"
    >
      {/* IMAGEN (NO TOCADA) */}
      <div className="relative overflow-hidden bg-[#f3f0e8]">
        <img src={course.image} className="w-full h-auto" />
      </div>

      {/* CONTENIDO */}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex-1">
          <span className="text-xs font-black uppercase text-[#D4AF37]">
            {course.level}
          </span>

          <h2 className="mt-2 text-xl font-black">{course.title}</h2>

          <p className="mt-2 text-sm text-white/60">{course.text}</p>

          <div className="mt-4 space-y-2 text-sm">
            <Line text="Contenido práctico" />
            <Line text="Online" />
            <Line text="Resultados reales" />
          </div>
        </div>

        {/* BOTÓN SIEMPRE ABAJO */}
        <Link to="/contacto" className={`${goldButton} mt-6 w-full`}>
          Comprar
        </Link>
      </div>
    </motion.article>
  );
}

/* MINI */
function Mini({ icon, title }) {
  return (
    <div className="rounded-xl bg-[#24201a] p-4 text-center">
      <div className="mb-2 text-[#D4AF37]">{icon}</div>
      <p>{title}</p>
    </div>
  );
}

/* LINE */
function Line({ text }) {
  return (
    <p className="flex items-center gap-2 text-white/60">
      <CheckCircle size={14} className="text-[#D4AF37]" />
      {text}
    </p>
  );
}