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
      <main className="bg-[#f7f1e8] px-6 py-20">
        <section className="mx-auto max-w-4xl rounded-[2rem] bg-white p-10 text-center shadow-xl">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#1f1b16] text-white">
            <ShoppingBag size={26} />
          </div>

          <h1 className="mt-6 text-4xl font-black">Tu carrito está vacío</h1>

          <p className="mt-4 text-black/60">
            Añade productos desde la tienda para verlos aquí.
          </p>

          <Link
            to="/tienda"
            className="mt-8 inline-block rounded-full bg-[#1f1b16] px-8 py-4 font-black text-white"
          >
            Ir a la tienda
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="bg-[#f7f1e8] px-6 py-16">
      <section className="mx-auto max-w-7xl">
        <Link
          to="/tienda"
          className="mb-8 inline-flex items-center gap-2 text-sm font-black text-black/55 hover:text-black"
        >
          <ArrowLeft size={18} />
          Seguir comprando
        </Link>

        <h1 className="mb-10 text-5xl font-black">Carrito</h1>

        <div className="grid gap-8 lg:grid-cols-[1.4fr_.6fr]">
          <div className="space-y-5">
            {cartItems.map((item) => (
              <article
                key={item.id}
                className="grid gap-5 rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-black/5 md:grid-cols-[140px_1fr_auto]"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-36 w-full rounded-2xl object-cover md:w-36"
                />

                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-black/35">
                    {item.category}
                  </p>

                  <h2 className="mt-2 text-xl font-black">{item.name}</h2>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="mt-4 flex items-center gap-2 text-sm font-bold text-red-600"
                  >
                    <Trash2 size={16} />
                    Eliminar
                  </button>
                </div>

                <div className="flex flex-col items-end justify-between gap-4">
                  <p className="text-xl font-black">
                    {formatPrice(item.price * item.quantity)}
                  </p>

                  <div className="flex items-center gap-3 rounded-full bg-[#f7f1e8] p-2">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="grid h-9 w-9 place-items-center rounded-full bg-white"
                    >
                      <Minus size={15} />
                    </button>

                    <span className="font-black">{item.quantity}</span>

                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="grid h-9 w-9 place-items-center rounded-full bg-white"
                    >
                      <Plus size={15} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <aside className="h-fit rounded-[2rem] bg-white p-6 shadow-xl ring-1 ring-black/5">
            <h2 className="text-2xl font-black">Resumen</h2>

            <div className="mt-6 space-y-4 border-y border-black/10 py-5">
              <Row label="Subtotal" value={formatPrice(subtotal)} />
              <Row
                label="Envío"
                value={shipping === 0 ? "Gratis" : formatPrice(shipping)}
              />
              <Row label="Impuestos" value="Calculado en checkout" />
            </div>

            <div className="mt-5 flex justify-between">
              <p className="font-bold">Total</p>
              <p className="text-2xl font-black">{formatPrice(total)}</p>
            </div>

           <Link
  to="/checkout-demo"
  className="mt-6 block w-full rounded-full bg-[#181511] py-4 text-center font-black text-white shadow-xl transition hover:scale-[1.02]"
>
  Finalizar compra demo
</Link>
          </aside>
        </div>
      </section>
    </main>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between text-sm">
      <p className="text-black/50">{label}</p>
      <p className="font-bold">{value}</p>
    </div>
  );
}