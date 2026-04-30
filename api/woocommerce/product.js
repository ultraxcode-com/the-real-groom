export default async function handler(req, res) {
  const { WC_URL, WC_KEY, WC_SECRET } = process.env;
  const { id } = req.query;

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
  const data = await response.json();

  return res.status(response.status).json(data);
}