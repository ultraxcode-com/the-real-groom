import {
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  ShoppingBag,
  GraduationCap,
  Scissors,
} from "lucide-react";
import { motion } from "framer-motion";

const goldText =
  "bg-gradient-to-r from-[#8C6A2A] via-[#D4AF37] to-[#F4E6C3] bg-clip-text text-transparent";

const goldButton =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#8C6A2A] via-[#D4AF37] to-[#F4E6C3] px-6 py-4 font-black text-[#181511] shadow-[0_0_24px_rgba(212,175,55,0.35)] transition hover:-translate-y-1 hover:shadow-[0_0_38px_rgba(212,175,55,0.55)]";

export function Contact() {
  const whatsappUrl =
    "https://wa.me/34621332537?text=Hola%20The%20Real%20Groom%2C%20quiero%20informaci%C3%B3n";

  return (
    <main className="min-h-screen overflow-hidden bg-[#090908] text-white">
      <section className="relative px-4 py-16 md:px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.22),transparent_35%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:80px_80px]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className={`mb-4 text-sm font-black uppercase tracking-[0.35em] ${goldText}`}>
              Contacto
            </p>

            <h1 className="mx-auto max-w-5xl text-5xl font-black leading-[0.95] md:text-7xl">
              Hablemos sobre productos, formación o reservas.
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/65 md:text-xl">
              Escríbenos para resolver dudas, recibir asesoramiento profesional
              o consultar disponibilidad de servicios y cursos.
            </p>
          </div>

          <div className="grid gap-7 lg:grid-cols-[0.9fr_1.1fr]">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55 }}
              className="space-y-5"
            >
              <ContactCard
                icon={<Phone />}
                title="Teléfono tienda"
                text="+34 621 33 25 37"
              />

              <ContactCard
                icon={<MessageCircle />}
                title="Reservas peluquería"
                text="+34 722 593 888"
              />

              <ContactCard
                icon={<Mail />}
                title="Email"
                text="info@therealgroom.com"
              />

              <ContactCard
                icon={<MapPin />}
                title="Ubicación"
                text="Fernando Amor y Mayor, 1, Noroeste, 14011 Córdoba"
              />

              <ContactCard
                icon={<Clock />}
                title="Horario"
                text="10:00h - 14:00h / 17:00h - 20:00h"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55 }}
              className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur md:p-8"
            >
              <p className={`mb-3 text-sm font-black uppercase tracking-[0.3em] ${goldText}`}>
                Escríbenos
              </p>

              <h2 className="text-3xl font-black md:text-5xl">
                Solicita información
              </h2>

              <form className="mt-7 space-y-4">
                <input
                  type="text"
                  placeholder="Nombre"
                  className="w-full rounded-xl border border-white/10 bg-[#181511] px-5 py-4 font-semibold text-white outline-none placeholder:text-white/35 focus:border-[#D4AF37]/60 focus:ring-2 focus:ring-[#D4AF37]/20"
                />

                <input
                  type="email"
                  placeholder="Email"
                  className="w-full rounded-xl border border-white/10 bg-[#181511] px-5 py-4 font-semibold text-white outline-none placeholder:text-white/35 focus:border-[#D4AF37]/60 focus:ring-2 focus:ring-[#D4AF37]/20"
                />

                <input
                  type="text"
                  placeholder="Asunto"
                  className="w-full rounded-xl border border-white/10 bg-[#181511] px-5 py-4 font-semibold text-white outline-none placeholder:text-white/35 focus:border-[#D4AF37]/60 focus:ring-2 focus:ring-[#D4AF37]/20"
                />

                <textarea
                  placeholder="Mensaje"
                  rows="5"
                  className="w-full resize-none rounded-xl border border-white/10 bg-[#181511] px-5 py-4 font-semibold text-white outline-none placeholder:text-white/35 focus:border-[#D4AF37]/60 focus:ring-2 focus:ring-[#D4AF37]/20"
                />

                <div className="grid gap-3 sm:grid-cols-2">
                  <button type="button" className={goldButton}>
                    <Send size={18} />
                    Enviar mensaje
                  </button>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#D4AF37]/25 bg-[#181511] px-6 py-4 font-black text-white/80 transition hover:border-[#F4E6C3]/60 hover:text-white"
                  >
                    <MessageCircle size={18} />
                    WhatsApp
                  </a>
                </div>
              </form>
            </motion.div>
          </div>

          <section className="mt-14 grid gap-6 md:grid-cols-3">
            <InfoBox
              icon={<ShoppingBag />}
              title="Productos"
              text="Asesoramiento para elegir herramientas, cosmética y accesorios profesionales."
            />
            <InfoBox
              icon={<GraduationCap />}
              title="Formación"
              text="Consulta cursos, plazas, especializaciones y programas para groomers."
            />
            <InfoBox
              icon={<Scissors />}
              title="Peluquería"
              text="Reservas y consultas para peluquería canina y felina profesional."
            />
          </section>
        </div>
      </section>
    </main>
  );
}

function ContactCard({ icon, title, text }) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      className="rounded-[1.6rem] border border-white/10 bg-white/[0.035] p-5 shadow-[0_18px_60px_rgba(0,0,0,0.25)] backdrop-blur"
    >
      <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-r from-[#8C6A2A] via-[#D4AF37] to-[#F4E6C3] text-[#181511] shadow-[0_0_18px_rgba(212,175,55,0.35)]">
        {icon}
      </div>

      <p className="font-black text-white">{title}</p>
      <p className="mt-1 leading-6 text-white/55">{text}</p>
    </motion.article>
  );
}

function InfoBox({ icon, title, text }) {
  return (
    <motion.article
      whileHover={{ y: -7 }}
      className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-7 shadow-[0_24px_80px_rgba(0,0,0,0.3)] backdrop-blur"
    >
      <div className="mb-5 text-[#D4AF37]">{icon}</div>
      <h3 className="text-2xl font-black">{title}</h3>
      <p className="mt-3 leading-7 text-white/55">{text}</p>
    </motion.article>
  );
}