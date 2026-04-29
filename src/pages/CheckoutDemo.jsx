import { Link } from "react-router-dom";

export function CheckoutDemo() {
  return (
    <main className="bg-[#f6f0e7] px-6 py-16">
      <section className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.2fr_.8fr]">
        <div className="rounded-[2rem] bg-white p-8 shadow-xl ring-1 ring-black/5">
          <p className="mb-3 text-sm font-black uppercase tracking-[0.25em] text-black/40">
            Checkout demo
          </p>

          <h1 className="text-4xl font-black">Finalizar compra</h1>

          <p className="mt-4 text-black/60">
            Esta vista es solo una demostración visual. En la versión final, el
            checkout real se conectaría con WooCommerce para mantener pagos,
            pedidos y envíos CTT.
          </p>

          <form className="mt-8 space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
              <Input label="Nombre" placeholder="Tu nombre" />
              <Input label="Apellido" placeholder="Tu apellido" />
            </div>

            <Input label="Email" placeholder="tu@email.com" />
            <Input label="Teléfono" placeholder="+34 000 000 000" />
            <Input label="Dirección" placeholder="Calle, número, piso..." />

            <div className="grid gap-5 md:grid-cols-2">
              <Input label="Ciudad" placeholder="Córdoba" />
              <Input label="Código postal" placeholder="14000" />
            </div>

            <button
              type="button"
              className="w-full rounded-full bg-[#1f1b16] px-6 py-4 font-black text-white shadow-xl transition hover:scale-[1.02]"
            >
              Confirmar pedido demo
            </button>
          </form>
        </div>

        <aside className="h-fit rounded-[2rem] bg-[#1f1b16] p-8 text-white shadow-xl">
          <h2 className="text-2xl font-black">Resumen del pedido</h2>

          <div className="mt-6 space-y-4 border-y border-white/10 py-6">
            <Row label="Subtotal" value="916,34 €" />
            <Row label="Envío" value="Gratis" />
            <Row label="Impuestos" value="Incluidos" />
          </div>

          <div className="mt-6 flex items-center justify-between">
            <p className="font-bold text-white/70">Total</p>
            <p className="text-3xl font-black">916,34 €</p>
          </div>

          <div className="mt-8 rounded-3xl bg-white/10 p-5">
            <p className="font-black">Versión final</p>
            <p className="mt-2 text-sm leading-6 text-white/60">
              Este paso puede redirigir al checkout real de WooCommerce para
              conservar Redsys, Bizum, WooPayments y CTT Express.
            </p>
          </div>

          <Link
            to="/carrito"
            className="mt-5 block rounded-full bg-white px-6 py-4 text-center font-black text-black"
          >
            Volver al carrito
          </Link>
        </aside>
      </section>
    </main>
  );
}

function Input({ label, placeholder }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-black text-black/70">
        {label}
      </span>

      <input
        placeholder={placeholder}
        className="w-full rounded-2xl border border-black/10 bg-[#f6f0e7] px-5 py-4 font-semibold outline-none transition focus:ring-2 focus:ring-black/10"
      />
    </label>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <p className="font-bold text-white/50">{label}</p>
      <p className="font-black">{value}</p>
    </div>
  );
}