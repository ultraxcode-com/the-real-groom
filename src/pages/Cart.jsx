import { Link } from "react-router-dom";
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";

export function Cart() {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    subtotal,
  } = useCart();

  const shipping = subtotal >= 75 ? 0 : 5.99;
  const total = subtotal + shipping;

  const formatPrice = (value) =>
    new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
    }).format(value);

  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-[#f6f0e7] px-6 py-20">
        <section className="mx-auto max-w-4xl rounded-[2rem] bg-[#181511] p-10 text-center text-white shadow-2xl ring-1 ring-[#d6a84f]/20">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#d6a84f] text-[#181511]">
            <ShoppingBag size={26} />
          </div>

          <h1 className="mt-6 text-4xl font-black">Tu carrito está vacío</h1>

          <p className="mt-4 text-white/60">
            Añade productos desde la tienda para verlos aquí.
          </p>

          <Link
            to="/tienda"
            className="mt-8 inline-block rounded-full bg-[#d6a84f] px-8 py-4 font-black text-[#181511] shadow-xl transition hover:scale-[1.02] hover:bg-[#b8872f]"
          >
            Ir a la tienda
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f6f0e7]">
      <section className="relative overflow-hidden bg-[#181511] px-6 py-14 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#d6a84f33,transparent_35%)]" />

        <div className="relative mx-auto max-w-7xl">
          <Link
            to="/tienda"
            className="mb-8 inline-flex items-center gap-2 text-sm font-black text-white/60 hover:text-[#d6a84f]"
          >
            <ArrowLeft size={18} />
            Seguir comprando
          </Link>

          <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="mb-3 text-xs font-black uppercase tracking-[0.3em] text-[#d6a84f]">
                Resumen de compra
              </p>
              <h1 className="text-5xl font-black md:text-7xl">Carrito</h1>
            </div>

            <p className="rounded-full bg-[#24201a] px-5 py-3 text-sm font-black text-white/70 ring-1 ring-[#d6a84f]/20">
              {cartItems.length} productos añadidos
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_.6fr]">
          <div className="space-y-5">
            {cartItems.map((item) => (
              <article
                key={item.id}
                className="grid gap-5 rounded-[2rem] bg-white p-5 shadow-[0_24px_70px_rgba(24,21,17,0.08)] ring-1 ring-black/5 md:grid-cols-[140px_1fr_auto]"
              >
                <div className="rounded-2xl bg-gradient-to-br from-[#181511] to-[#3a2f20] p-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-36 w-full rounded-xl bg-white object-contain p-2 md:w-36"
                  />
                </div>

                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-[#b8872f]">
                    {item.category}
                  </p>

                  <h2 className="mt-2 text-xl font-black text-[#181511]">
                    {item.name}
                  </h2>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="mt-4 flex items-center gap-2 text-sm font-bold text-red-600"
                  >
                    <Trash2 size={16} />
                    Eliminar
                  </button>
                </div>

                <div className="flex flex-col items-end justify-between gap-4">
                  <p className="text-xl font-black text-[#181511]">
                    {formatPrice(item.price * item.quantity)}
                  </p>

                  <div className="flex items-center gap-3 rounded-full bg-[#f6f0e7] p-2">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="grid h-9 w-9 place-items-center rounded-full bg-white shadow-sm"
                    >
                      <Minus size={15} />
                    </button>

                    <span className="font-black">{item.quantity}</span>

                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="grid h-9 w-9 place-items-center rounded-full bg-[#d6a84f] text-[#181511]"
                    >
                      <Plus size={15} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <aside className="h-fit rounded-[2rem] bg-[#181511] p-6 text-white shadow-2xl ring-1 ring-[#d6a84f]/20">
            <h2 className="text-2xl font-black">Resumen</h2>

            <div className="mt-6 space-y-4 border-y border-white/10 py-5">
              <Row label="Subtotal" value={formatPrice(subtotal)} />
              <Row
                label="Envío"
                value={shipping === 0 ? "Gratis" : formatPrice(shipping)}
              />
              <Row label="Impuestos" value="Calculado en checkout" />
            </div>

            <div className="mt-5 flex justify-between">
              <p className="font-bold text-white/60">Total</p>
              <p className="text-3xl font-black text-[#d6a84f]">
                {formatPrice(total)}
              </p>
            </div>

            <Link
              to="/checkout-demo"
              className="mt-6 block w-full rounded-full bg-[#d6a84f] py-4 text-center font-black text-[#181511] shadow-xl transition hover:scale-[1.02] hover:bg-[#b8872f]"
            >
              Finalizar compra demo
            </Link>

            <p className="mt-4 text-center text-xs font-semibold text-white/40">
              Checkout final compatible con WooCommerce.
            </p>
          </aside>
        </div>
      </section>
    </main>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between text-sm">
      <p className="text-white/50">{label}</p>
      <p className="font-bold text-white">{value}</p>
    </div>
  );
}