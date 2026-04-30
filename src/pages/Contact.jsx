import { Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { motion } from "framer-motion";

export function Contact() {
  return (
    <main className="bg-[#f6f0e7]">
      <section className="relative overflow-hidden bg-[#181511] px-6 py-20 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#d6a84f33,transparent_35%)]" />

        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_.9fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <p className="mb-3 text-sm font-black uppercase tracking-[0.25em] text-[#d6a84f]">
              Contacto
            </p>

            <h1 className="text-4xl font-black leading-tight md:text-6xl">
              Hablemos sobre productos, formación o pedidos.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/65">
              Contacta con The Real Groom para resolver dudas, solicitar
              información o recibir asesoramiento sobre productos profesionales
              de grooming.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <ContactCard
                icon={<Phone />}
                title="Teléfono"
                text="+34 621 33 25 37"
              />
              <ContactCard
                icon={<Mail />}
                title="Email"
                text="info@therealgroom.com"
              />
              <ContactCard
                icon={<MapPin />}
                title="Ubicación"
                text="Córdoba, España"
              />
              <ContactCard
                icon={<MessageCircle />}
                title="WhatsApp"
                text="Respuesta rápida"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65 }}
            className="rounded-[2.5rem] bg-white p-6 text-[#181511] shadow-2xl"
          >
            <p className="mb-2 text-sm font-black uppercase tracking-[0.25em] text-[#b8872f]">
              Escríbenos
            </p>

            <h2 className="text-3xl font-black">Solicita información</h2>

            <form className="mt-6 space-y-4">
              <input
                type="text"
                placeholder="Nombre"
                className="w-full rounded-2xl border border-black/10 bg-[#f6f0e7] px-5 py-4 font-semibold outline-none focus:ring-2 focus:ring-[#d6a84f]/50"
              />

              <input
                type="email"
                placeholder="Email"
                className="w-full rounded-2xl border border-black/10 bg-[#f6f0e7] px-5 py-4 font-semibold outline-none focus:ring-2 focus:ring-[#d6a84f]/50"
              />

              <input
                type="text"
                placeholder="Asunto"
                className="w-full rounded-2xl border border-black/10 bg-[#f6f0e7] px-5 py-4 font-semibold outline-none focus:ring-2 focus:ring-[#d6a84f]/50"
              />

              <textarea
                placeholder="Mensaje"
                rows="5"
                className="w-full resize-none rounded-2xl border border-black/10 bg-[#f6f0e7] px-5 py-4 font-semibold outline-none focus:ring-2 focus:ring-[#d6a84f]/50"
              />

              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#d6a84f] px-6 py-4 font-black text-[#181511] shadow-xl transition hover:scale-[1.02] hover:bg-[#b8872f]"
              >
                <Send size={18} />
                Enviar mensaje
              </button>
            </form>

            <p className="mt-4 text-center text-xs font-semibold text-black/40">
              Formulario visual de demo. Puede conectarse con email, WhatsApp o
              WordPress.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
          <InfoBox
            title="Asesoramiento"
            text="Ayuda para elegir productos según el tipo de trabajo o necesidad."
          />
          <InfoBox
            title="Pedidos"
            text="Información sobre productos, disponibilidad, precios y envíos."
          />
          <InfoBox
            title="Formación"
            text="Consultas sobre cursos, plazas y programas de grooming."
          />
        </div>
      </section>
    </main>
  );
}

function ContactCard({ icon, title, text }) {
  return (
    <div className="rounded-3xl bg-[#24201a] p-5 ring-1 ring-[#d6a84f]/20">
      <div className="mb-3 grid h-10 w-10 place-items-center rounded-full bg-[#d6a84f] text-[#181511]">
        {icon}
      </div>
      <p className="font-black text-white">{title}</p>
      <p className="text-sm text-white/50">{text}</p>
    </div>
  );
}

function InfoBox({ title, text }) {
  return (
    <article className="rounded-[2rem] bg-white p-7 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-2xl">
      <p className="mb-3 text-sm font-black uppercase tracking-[0.25em] text-[#b8872f]">
        The Real Groom
      </p>
      <h3 className="text-2xl font-black text-[#181511]">{title}</h3>
      <p className="mt-3 leading-7 text-black/55">{text}</p>
    </article>
  );
}