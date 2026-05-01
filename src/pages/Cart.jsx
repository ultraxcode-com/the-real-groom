import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";

const goldText =
  "bg-gradient-to-r from-[#8C6A2A] via-[#D4AF37] to-[#F4E6C3] bg-clip-text text-transparent drop-shadow-[0_0_14px_rgba(212,175,55,0.25)]";

const goldButton =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#8C6A2A] via-[#D4AF37] to-[#F4E6C3] px-6 py-3 font-black text-[#181511] shadow-[0_0_24px_rgba(212,175,55,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_0_34px_rgba(212,175,55,0.55)]";

export function Cart() {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    subtotal,
    clearCart,
  } = useCart();

  return (
    <main className="min-h-screen bg-[#181511] px-4 py-16 text-white md:px-6">
      <div className="mx-auto max-w-7xl">
        <p className={`mb-3 text-sm font-black uppercase tracking-[0.25em] ${goldText}`}>
          Carrito
        </p>

        <h1 className="text-5xl font-black md:text-7xl">
          Tu selección profesional.
        </h1>

        {cartItems.length === 0 ? (
          <div className="mt-10 rounded-[2.5rem] border border-[#D4AF37]/20 bg-[#24201a] p-10 text-center">
            <ShoppingBag className="mx-auto mb-5 text-[#D4AF37]" size={42} />

            <h2 className="text-3xl font-black">Tu carrito está vacío</h2>

            <p className="mt-3 text-white/55">
              Añade productos profesionales desde la tienda.
            </p>

            <Link to="/tienda" className={`${goldButton} mt-8`}>
              Ir a la tienda
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px]">
            <section className="space-y-5">
              {cartItems.map((item) => (
                <article
                  key={item.id}
                  className="grid gap-5 rounded-[2rem] border border-[#D4AF37]/15 bg-[#24201a] p-5 shadow-xl sm:grid-cols-[130px_1fr_auto]"
                >
                  <div className="rounded-2xl bg-[#100e0b] p-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-28 w-full object-contain"
                    />
                  </div>

                  <div>
                    <h2 className="text-xl font-black">{item.name}</h2>

                    <p className="mt-2 text-white/50">
                      {item.category || "Producto profesional"}
                    </p>

                    <p className={`mt-4 text-xl font-black ${goldText}`}>
                      {item.priceLabel || `${item.price} €`}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 sm:flex-col sm:items-end sm:justify-between">
                    <div className="flex items-center rounded-xl border border-[#D4AF37]/20 bg-[#100e0b]">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="grid h-10 w-10 place-items-center text-white/70 hover:text-white"
                      >
                        <Minus size={16} />
                      </button>

                      <span className="grid h-10 min-w-10 place-items-center font-black">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="grid h-10 w-10 place-items-center text-white/70 hover:text-white"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="grid h-10 w-10 place-items-center rounded-xl border border-red-500/20 bg-red-500/10 text-red-300 hover:bg-red-500/20"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </article>
              ))}
            </section>

            <aside className="h-fit rounded-[2.5rem] border border-[#D4AF37]/20 bg-[#100e0b] p-7 shadow-2xl">
              <h2 className="text-3xl font-black">Resumen</h2>

              <div className="mt-6 space-y-4 border-y border-[#D4AF37]/15 py-6">
                <div className="flex justify-between text-white/60">
                  <span>Subtotal</span>
                  <span className="font-black text-white">
                    {subtotal.toFixed(2)} €
                  </span>
                </div>

                <div className="flex justify-between text-white/60">
                  <span>Envío</span>
                  <span>Calculado en checkout</span>
                </div>
              </div>

              <div className="mt-6 flex justify-between text-xl font-black">
                <span>Total estimado</span>
                <span className={goldText}>{subtotal.toFixed(2)} €</span>
              </div>

              <button className="trg-gold-btn mt-8 w-full">
                Finalizar compra
              </button>

              <button
                onClick={clearCart}
                className="trg-dark-btn mt-5 w-full "
              >
                Vaciar carrito
              </button>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}