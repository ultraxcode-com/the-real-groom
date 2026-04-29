const WC_URL = import.meta.env.VITE_WC_URL;
const WC_KEY = import.meta.env.VITE_WC_KEY;
const WC_SECRET = import.meta.env.VITE_WC_SECRET;

function cleanHTML(text = "") {
  return text.replace(/<[^>]*>/g, "").trim();
}

function formatPrice(price) {
  if (!price) return "Consultar precio";

  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  }).format(Number(price));
}

function formatProduct(item) {
  return {
    id: item.id,
    name: item.name,
    category: item.categories?.[0]?.name || "Sin categoría",
    price: Number(item.price || 0),
    priceLabel: formatPrice(item.price),
    image:
      item.images?.[0]?.src ||
      "https://placehold.co/800x800?text=Producto",
    images: item.images?.map((img) => img.src) || [],
    description:
      cleanHTML(item.short_description) ||
      cleanHTML(item.description) ||
      "Producto profesional para grooming.",
    stockStatus: item.stock_status,
    permalink: item.permalink,
  };
}

export async function getProducts({ perPage = 24 } = {}) {
  if (!WC_URL || !WC_KEY || !WC_SECRET) {
    throw new Error("Faltan variables del .env");
  }

  const url = `${WC_URL}/wp-json/wc/v3/products?consumer_key=${WC_KEY}&consumer_secret=${WC_SECRET}&per_page=${perPage}&status=publish`;

  const response = await fetch(url);

  const contentType = response.headers.get("content-type");

  if (!contentType?.includes("application/json")) {
    const text = await response.text();
    console.error("Respuesta NO JSON:", text.slice(0, 500));
    throw new Error("WooCommerce no devolvió JSON");
  }

  if (!response.ok) {
    throw new Error("Error al cargar productos de WooCommerce");
  }

  const data = await response.json();

  return data.map(formatProduct);
}

export async function getProductById(id) {
  if (!WC_URL || !WC_KEY || !WC_SECRET) {
    throw new Error("Faltan variables del .env");
  }

  const url = `${WC_URL}/wp-json/wc/v3/products/${id}?consumer_key=${WC_KEY}&consumer_secret=${WC_SECRET}`;

  const response = await fetch(url);

  const contentType = response.headers.get("content-type");

  if (!contentType?.includes("application/json")) {
    const text = await response.text();
    console.error("Respuesta NO JSON:", text.slice(0, 500));
    throw new Error("WooCommerce no devolvió JSON");
  }

  if (!response.ok) {
    throw new Error("Error al cargar el producto");
  }

  const data = await response.json();

  return formatProduct(data);
}