import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Home } from "../pages/Home";
import { Shop } from "../pages/Shop";
import { ProductDetail } from "../pages/ProductDetail";
import { Cart } from "../pages/Cart";
import { Courses } from "../pages/Courses";
import { About } from "../pages/About";
import { Contact } from "../pages/Contact";
import { CheckoutDemo } from "../pages/CheckoutDemo";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "tienda", element: <Shop /> },
      { path: "producto/:id", element: <ProductDetail /> },
      { path: "carrito", element: <Cart /> },
      { path: "cursos", element: <Courses /> },
      { path: "sobre-nosotros", element: <About /> },
      { path: "contacto", element: <Contact /> },
      { path: "checkout", element: <CheckoutDemo /> },

    ],
  },
]);