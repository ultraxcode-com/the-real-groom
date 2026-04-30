export default async function handler(req, res) {
  const { WC_URL, WC_KEY, WC_SECRET } = process.env;

  const url = `${WC_URL}/wp-json/wc/v3/products/categories?consumer_key=${WC_KEY}&consumer_secret=${WC_SECRET}&per_page=100&hide_empty=true`;

  const response = await fetch(url);
  const data = await response.json();

  return res.status(response.status).json(data);
}