import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MorphingButton } from "./components/watermelon/morphing-button.jsx";
import { WorkGallery } from "./components/watermelon/work-bento.jsx";
import { ProcessFlow } from "./components/watermelon/process-flow.jsx";
import { StatsGrid } from "./components/watermelon/stats-grid.jsx";
import { FeatureGrid } from "./components/watermelon/feature-grid.jsx";
import { CtaBlock } from "./components/watermelon/cta-block.jsx";
import { StudioFooter } from "./components/watermelon/studio-footer.jsx";
import { ContactSection } from "./components/watermelon/contact-section.jsx";
import { StudioHero } from "./components/watermelon/studio-hero.jsx";
import { FeaturedCase } from "./components/watermelon/featured-case.jsx";
import "./tailwind.css";

function mount(id, node) {
  const el = document.getElementById(id);
  if (!el) return;
  createRoot(el).render(<StrictMode>{node}</StrictMode>);
}

mount("wm-hero", <StudioHero />);
mount("wm-featured", <FeaturedCase />);

mount(
  "wm-morph",
  <MorphingButton
    onSubmit={(email) => {
      window.location.href = `mailto:decentralizedmicheal@gmail.com?subject=${encodeURIComponent("Project")}&body=${encodeURIComponent(email)}`;
    }}
  />
);

mount("wm-process", <ProcessFlow />);
mount("wm-work", <WorkGallery />);
mount("wm-stats", <StatsGrid />);
mount("wm-features", <FeatureGrid />);
mount("wm-cta", <CtaBlock />);
mount("wm-footer", <StudioFooter />);
mount("wm-contact", <ContactSection />);
