import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PillNav } from "./components/watermelon/pill-nav.jsx";
import "./tailwind.css";

const el = document.getElementById("wm-nav");
if (el) createRoot(el).render(
  <StrictMode>
    <PillNav />
  </StrictMode>
);
