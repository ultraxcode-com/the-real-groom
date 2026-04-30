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
  const cacheKey = `trg_products_page_${page}_${perPage}_${categoryId || "all"}`;
  const cached = localStorage.getItem(cacheKey);

  if (cached) {
    const products = JSON.parse(cached);
    products.forEach(saveProductCache);
    return products;
  }

  const categoryParam = categoryId ? `&categoryId=${categoryId}` : "";

  const response = await fetch(
    `/api/woocommerce/products?perPage=${perPage}&page=${page}${categoryParam}`
  );

  if (!response.ok) {
    throw new Error("Error al cargar productos de WooCommerce");
  }

  const data = await response.json();
  const products = data.map(formatProduct);

  products.forEach(saveProductCache);
  localStorage.setItem(cacheKey, JSON.stringify(products));

  return products;
}

export async function getProductById(id) {
  const cacheKey = `trg_product_${id}`;
  const cached = localStorage.getItem(cacheKey);

  if (cached) {
    return JSON.parse(cached);
  }

  const response = await fetch(`/api/woocommerce/product?id=${id}`);

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

  const response = await fetch("/api/woocommerce/categories");

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