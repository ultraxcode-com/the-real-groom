import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  CheckCircle,
  Globe2,
  Heart,
  Scissors,
  Sparkles,
  Star,
  Users,
  Zap,
} from "lucide-react";

import franManuel from "../assets/historia/fran-manuel.png";
import cristinaPerez from "../assets/historia/cristina-perez.png";
import equipoRealGroom from "../assets/historia/equipo-realgroom.png";
import standRealGroom from "../assets/historia/stand-realgroom.png";

const goldText =
  "bg-gradient-to-r from-[#A67C2E] via-[#D4AF37] to-[#F4E6C3] bg-clip-text text-transparent";

const card =
  "rounded-[1.6rem] border border-white/10 bg-white/[0.035] shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur";

const goldButton =
  "inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#8C6A2A] via-[#D4AF37] to-[#F4E6C3] px-6 py-3 font-black text-[#181511] shadow-[0_0_24px_rgba(212,175,55,0.35)] transition hover:-translate-y-1 hover:shadow-[0_0_38px_rgba(212,175,55,0.55)]";

export function About() {
  const [tab, setTab] = useState("historia");

  return (
    <main className="min-h-screen overflow-hidden bg-[#090908] text-white">
      <section className="relative px-4 py-16 md:px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#d4af3720,transparent_34%),radial-gradient(circle_at_bottom_right,#8c6a2a18,transparent_35%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mx-auto mb-12 max-w-5xl text-center">
            <p className={`mb-5 text-sm font-black uppercase tracking-[0.45em] ${goldText}`}>
              The Real Groom
            </p>

            <h1 className="text-5xl font-black leading-[0.9] tracking-tight md:text-7xl">
              Nuestra historia.
              <span className={`block italic ${goldText}`}>Nuestra pasión.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/70 md:text-xl">
              Herramientas profesionales diseñadas por groomers, para groomers.
            </p>

            <div className="mt-8 flex justify-center">
              <div className="grid grid-cols-2 rounded-2xl border border-white/10 bg-black/30 p-1.5 backdrop-blur md:min-w-[430px]">
                <TabButton active={tab === "historia"} onClick={() => setTab("historia")}>
                  Historia
                </TabButton>
                <TabButton active={tab === "sobre"} onClick={() => setTab("sobre")}>
                  Sobre nosotros
                </TabButton>
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {tab === "historia" ? <Historia key="historia" /> : <SobreNosotros key="sobre" />}
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}

function TabButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`relative rounded-xl px-6 py-3 text-sm font-black uppercase tracking-wide transition ${
        active ? "text-[#181511]" : "text-white/65 hover:text-white"
      }`}
    >
      {active && (
        <motion.span
          layoutId="aboutTab"
          className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#8C6A2A] via-[#D4AF37] to-[#F4E6C3]"
          transition={{ type: "spring", stiffness: 420, damping: 34 }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </button>
  );
}

function Historia() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.45 }}
      className="space-y-7"
    >
      <section className="grid gap-7 lg:grid-cols-[1fr_1fr]">
        <article className={`${card} p-7 md:p-9`}>
          <p className={`mb-4 text-sm font-black uppercase tracking-[0.3em] ${goldText}`}>
            Historia Real Groom
          </p>

          <h2 className="max-w-2xl text-4xl font-black leading-tight md:text-5xl">
            RealGroom nace del corazón de una peluquería canina.
          </h2>

          <p className="mt-6 text-lg leading-8 text-white/70">
            Hace más de cinco años, dos personas unidas por el amor a los animales
            decidieron abrir una pequeña peluquería canina. Lo que empezó como una
            pasión, pronto se convirtió en una forma de vida.
          </p>

          <p className="mt-5 leading-8 text-white/60">
            Día a día fueron conociendo las necesidades reales de los perros, los
            groomers y los centros de estética canina. Probaron herramientas,
            accesorios y materiales, pero siempre faltaba algo: herramientas
            realmente pensadas por y para groomers.
          </p>

          <p className="mt-5 font-bold leading-8 text-[#D4AF37]">
            Entonces lo tuvieron claro: si no existían las herramientas perfectas
            para grooming, las crearían ellos mismos.
          </p>

          <div className="mt-7 grid gap-4 sm:grid-cols-3">
            <Mini icon={<Scissors />} title="Técnica" text="Experiencia real" />
            <Mini icon={<Star />} title="Innovación" text="Herramientas pro" />
            <Mini icon={<Award />} title="Calidad" text="Materiales premium" />
          </div>
        </article>

        <ImageClean src={equipoRealGroom} alt="Equipo RealGroom" />
      </section>

      <section className="grid gap-7 lg:grid-cols-2">
        <article className={`${card} p-7 md:p-8`}>
          <p className={`mb-4 text-sm font-black uppercase tracking-[0.3em] ${goldText}`}>
            Nacimiento de la marca
          </p>

          <h3 className="text-4xl font-black leading-tight md:text-5xl">
            En 2024 nació oficialmente RealGroom.
          </h3>

          <p className="mt-5 leading-8 text-white/65">
            Tras probar infinidad de tijeras, peines, cardas, toallas, cuerdas de mesa
            y accesorios esenciales, detectaron que faltaban herramientas realmente
            pensadas por y para groomers.
          </p>

          <p className="mt-5 font-bold leading-8 text-[#D4AF37]">
            Una marca creada desde la práctica real, con productos analizados,
            rediseñados y probados para el día a día profesional.
          </p>
        </article>

        <article className={`${card} p-7 md:p-8`}>
          <p className={`mb-5 text-sm font-black uppercase tracking-[0.3em] ${goldText}`}>
            Desarrollo profesional
          </p>

          <div className="space-y-5">
            <Line text="Hemos probado cientos de prototipos." />
            <Line text="Hemos trabajado mano a mano con fabricantes especializados." />
            <Line text="Hemos desarrollado nuestras propias líneas de tijeras profesionales." />
            <Line text="Hemos innovado con acero japonés, cobalto y PVC de alta resistencia." />
          </div>
        </article>
      </section>

      <section className="grid gap-7 md:grid-cols-2">
        <TextIcon icon={<Zap />} title="Innovación constante">
          Cada lanzamiento es fruto de meses de trabajo, pruebas y ajustes. No
          introducimos nada a la ligera: todo pasa por manos profesionales.
        </TextIcon>

        <TextIcon icon={<Users />} title="Una familia de profesionales">
          RealGroom no es solo una marca: es una comunidad de groomers unidos por
          una misma pasión, con asesoramiento y servicio postventa.
        </TextIcon>
      </section>

      <section className={`${card} grid gap-6 p-7 text-center md:grid-cols-3`}>
        <Stat number="2024" text="Nacimiento oficial" />
        <Stat number="100%" text="Creada por groomers" />
        <Stat number="PRO" text="Herramientas profesionales" />
      </section>

      <section className={`${card} grid items-center gap-7 overflow-hidden p-0 lg:grid-cols-[1.15fr_.85fr]`}>
        <img
          src={standRealGroom}
          alt="Stand RealGroom"
          className="h-[360px] w-full object-cover object-center lg:h-[430px]"
        />

        <div className="p-7 md:p-10">
          <p className={`mb-3 text-sm font-black uppercase tracking-[0.3em] ${goldText}`}>
            Bienvenido a RealGroom
          </p>

          <h3 className="text-4xl font-black leading-tight md:text-5xl">
            Una nueva forma de trabajar.
          </h3>

          <p className="mt-5 leading-8 text-white/65">
            Todo con un único objetivo: ofrecer herramientas que realmente marquen
            la diferencia en peluquería canina profesional.
          </p>

          <p className={`mt-6 text-3xl font-black italic ${goldText}`}>
            Pasión. Técnica. Innovación.
          </p>
        </div>
      </section>
    </motion.div>
  );
}

function SobreNosotros() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.45 }}
      className="space-y-7"
    >
      <section className="grid gap-7 lg:grid-cols-2">
      <ImageClean src={franManuel} alt="Fran Manuel" position="center 22%" />

        <article className={`${card} p-7 md:p-9`}>
          <p className={`mb-4 text-sm font-black uppercase tracking-[0.3em] ${goldText}`}>
            Fran Manuel
          </p>

          <h2 className="text-4xl font-black leading-tight md:text-5xl">
            Fundador y alma creativa de RealGroom.
          </h2>

          <p className="mt-6 text-lg leading-8 text-white/70">
            Desde pequeño, Fran Manuel sintió una profunda pasión por la peluquería,
            tanto humana como animal. Hace más de cinco años se unió a Cristina
            Pérez para formarse juntos en grooming profesional.
          </p>

          <p className="mt-5 leading-8 text-white/60">
            Fue pionero en introducir el estilo asiático en su zona, se especializó
            en Asian Fusion y comenzó a destacar por su técnica, precisión y visión
            artística.
          </p>

          <p className="mt-5 leading-8 text-white/60">
            Ha impartido seminarios en México, Ucrania, Rumanía, Bulgaria,
            Tailandia, Brasil, Italia, Puerto Rico, Polonia, Perú y Colombia. En
            2024 comenzó su carrera como juez internacional.
          </p>
        </article>
      </section>

      <section className="grid gap-7 lg:grid-cols-2">
        <article className={`${card} p-7 md:p-9`}>
          <p className={`mb-4 text-sm font-black uppercase tracking-[0.3em] ${goldText}`}>
            Cristina Pérez
          </p>

          <h2 className="text-4xl font-black leading-tight md:text-5xl">
            CEO y visión estratégica de RealGroom.
          </h2>

          <p className="mt-6 text-lg leading-8 text-white/70">
            Cristina ha sido el apoyo fundamental en toda la trayectoria de Fran.
            Juntos decidieron lanzar RealGroom, una marca que une talento,
            experiencia y herramientas diseñadas desde dentro de la peluquería
            canina.
          </p>

          <p className="mt-5 leading-8 text-white/60">
            Lidera gestión, contabilidad, marketing, publicidad y área comercial,
            mientras Fran dirige imagen, diseño y desarrollo técnico de productos.
          </p>

          <p className="mt-5 leading-8 text-white/60">
            También se especializa en peluquería felina profesional, trabajando
            corte de gatos a tijera, sin sedación y sin estrés.
          </p>
        </article>

   <ImageClean src={cristinaPerez} alt="Cristina Pérez" position="center 25%" />
      </section>

      <section className="grid gap-7 md:grid-cols-3">
        <Value icon={<Scissors />} title="Técnica profesional" text="Marca desarrollada desde la experiencia real en salón." />
        <Value icon={<Globe2 />} title="Visión internacional" text="Trayectoria conectada con groomers de todo el mundo." />
        <Value icon={<Heart />} title="Respeto animal" text="Cuidado, estética, bienestar y trabajo sin estrés." />
      </section>

      <section className={`${card} p-7 md:p-9`}>
        <p className={`mb-5 text-sm font-black uppercase tracking-[0.3em] ${goldText}`}>
          Lo que representa RealGroom
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          <Line text="Pasión por el grooming profesional." />
          <Line text="Herramientas creadas desde necesidades reales." />
          <Line text="Formación basada en experiencia y técnica." />
          <Line text="Comunidad profesional que se apoya y crece junta." />
        </div>

        <Link to="/contacto" className={`${goldButton} mt-8`}>
          Contactar
        </Link>
      </section>
    </motion.div>
  );
}

function ImageClean({ src, alt, position = "center 15%" }) {
  return (
    <motion.div
      whileHover={{ scale: 1.015 }}
      className="overflow-hidden rounded-[1.8rem]"
    >
      <img
        src={src}
        alt={alt}
        style={{ objectPosition: position }}
        className="h-[430px] w-full rounded-[1.8rem] object-cover shadow-[0_30px_90px_rgba(0,0,0,0.45)] md:h-[560px]"
      />
    </motion.div>
  );
}

function Mini({ icon, title, text }) {
  return (
    <motion.div whileHover={{ y: -6 }} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
      <div className="mb-3 text-[#D4AF37]">{icon}</div>
      <p className="font-black">{title}</p>
      <p className="mt-1 text-sm text-white/50">{text}</p>
    </motion.div>
  );
}

function TextIcon({ icon, title, children }) {
  return (
    <motion.article whileHover={{ y: -6 }} className={`${card} p-7 md:p-8`}>
      <div className="mb-5 grid h-14 w-14 place-items-center rounded-full border border-[#D4AF37]/40 text-[#D4AF37]">
        {icon}
      </div>
      <h3 className="text-2xl font-black">{title}</h3>
      <p className="mt-4 leading-8 text-white/60">{children}</p>
    </motion.article>
  );
}

function Value({ icon, title, text }) {
  return (
    <motion.article whileHover={{ y: -7 }} className={`${card} p-7`}>
      <div className="mb-4 text-[#D4AF37]">{icon}</div>
      <h3 className="text-2xl font-black">{title}</h3>
      <p className="mt-3 leading-7 text-white/55">{text}</p>
    </motion.article>
  );
}

function Stat({ number, text }) {
  return (
    <div>
      <p className={`text-5xl font-black md:text-6xl ${goldText}`}>{number}</p>
      <p className="mt-2 text-xs font-black uppercase tracking-[0.2em] text-white/70">{text}</p>
    </div>
  );
}

function Line({ text }) {
  return (
    <p className="flex gap-3 text-white/70">
      <CheckCircle className="mt-1 shrink-0 text-[#D4AF37]" size={19} />
      <span>{text}</span>
    </p>
  );
}