import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { App } from "./App";
import { Home } from "./pages/Home";
import { Location } from "./pages/Location";
import { FishClub } from "./pages/FishClub";
import { Contact } from "./pages/Contact";
import { NotFound } from "./pages/NotFound";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "location", element: <Location /> },
      { path: "club/:id", element: <FishClub /> },
      { path: "contact", element: <Contact /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

const root = document.getElementById("root");

if (!root) {
  throw new Error("Harbour 2 Home could not start. Please refresh the page.");
}

createRoot(root).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

if ("serviceWorker" in navigator && import.meta.env.PROD) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {
      // Offline support is optional; ignore registration failures.
    });
  });
}
