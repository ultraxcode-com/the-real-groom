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
      item.images?.[0]?.src || "https://placehold.co/800x800?text=Producto",
    images: item.images?.map((img) => img.src) || [],
    description:
      cleanHTML(item.short_description) ||
      cleanHTML(item.description) ||
      "Producto profesional para grooming.",
    stockStatus: item.stock_status,
    permalink: item.permalink,
  };
}

function saveProductCache(product) {
  localStorage.setItem(`trg_product_${product.id}`, JSON.stringify(product));
}

export async function getProducts({
  perPage = 12,
  page = 1,
  categoryId = null,
} = {}) {
  const cacheKey = `trg_products_page_${page}_${perPage}_${
    categoryId || "all"
  }`;

  const cached = localStorage.getItem(cacheKey);

  if (cached) {
    const products = JSON.parse(cached);

    products.forEach((product) => {
      saveProductCache(product);
    });

    return products;
  }

  const fields = [
    "id",
    "name",
    "price",
    "images",
    "categories",
    "short_description",
    "description",
    "stock_status",
    "permalink",
  ].join(",");

  const categoryParam = categoryId ? `&category=${categoryId}` : "";

  const url = `${WC_URL}/wp-json/wc/v3/products?consumer_key=${WC_KEY}&consumer_secret=${WC_SECRET}&per_page=${perPage}&page=${page}&status=publish${categoryParam}&_fields=${fields}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Error al cargar productos de WooCommerce");
  }

  const data = await response.json();
  const products = data.map(formatProduct);

  products.forEach((product) => {
    saveProductCache(product);
  });

  localStorage.setItem(cacheKey, JSON.stringify(products));

  return products;
}

export async function getProductById(id) {
  const cacheKey = `trg_product_${id}`;
  const cached = localStorage.getItem(cacheKey);

  if (cached) {
    return JSON.parse(cached);
  }

  const fields = [
    "id",
    "name",
    "price",
    "images",
    "categories",
    "short_description",
    "description",
    "stock_status",
    "permalink",
  ].join(",");

  const url = `${WC_URL}/wp-json/wc/v3/products/${id}?consumer_key=${WC_KEY}&consumer_secret=${WC_SECRET}&_fields=${fields}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Error al cargar el producto");
  }

  const data = await response.json();
  const product = formatProduct(data);

  saveProductCache(product);

  return product;
}

export async function getCategories() {
  const cacheKey = "trg_categories_cache";
  const cached = localStorage.getItem(cacheKey);

  if (cached) {
    return JSON.parse(cached);
  }

  const url = `${WC_URL}/wp-json/wc/v3/products/categories?consumer_key=${WC_KEY}&consumer_secret=${WC_SECRET}&per_page=100&hide_empty=true`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Error al cargar categorías");
  }

  const data = await response.json();

  const categories = data
    .filter((category) => category.count > 0)
    .map((category) => ({
      id: category.id,
      name: category.name,
      count: category.count,
    }));

  localStorage.setItem(cacheKey, JSON.stringify(categories));

  return categories;
}