export function Contact() {
  return (
    <section className="bg-[#f6f0e7] px-6 py-20">
      <div className="mx-auto max-w-7xl grid gap-16 lg:grid-cols-2">

        {/* INFO */}
        <div>
          <p className="mb-3 text-sm font-black uppercase tracking-[0.25em] text-black/40">
            Contacto
          </p>

          <h1 className="text-4xl md:text-5xl font-black leading-tight">
            Hablemos sobre tu proyecto o pedido
          </h1>

          <p className="mt-6 text-lg text-black/60 leading-8">
            Si tienes dudas sobre productos, pedidos o quieres asesoramiento
            profesional, estamos aquí para ayudarte.
          </p>

          <div className="mt-8 space-y-4 text-black/70">
            <p>📍 Córdoba, España</p>
            <p>📞 +34 621 33 25 37</p>
            <p>📧 info@therealgroom.com</p>
          </div>
        </div>

        {/* FORM */}
        <form className="bg-white p-8 rounded-3xl shadow-lg space-y-6">
          <div>
            <label className="block text-sm font-bold mb-2">
              Nombre
            </label>
            <input
              type="text"
              placeholder="Tu nombre"
              className="w-full border border-black/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black/20"
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="tu@email.com"
              className="w-full border border-black/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black/20"
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">
              Mensaje
            </label>
            <textarea
              rows="4"
              placeholder="Escribe tu mensaje..."
              className="w-full border border-black/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black/20"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-[#1f1b16] text-white font-black py-3 rounded-xl hover:scale-[1.02] transition"
          >
            Enviar mensaje
          </button>
        </form>
      </div>
    </section>
  );
}