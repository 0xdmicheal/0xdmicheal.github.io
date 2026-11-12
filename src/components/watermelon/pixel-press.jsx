import { useEffect, useRef } from "react";
import { mountPixelPress } from "../../iso/pixel-press.js";
import "../../iso/iso.css";
import "../../iso/press.css";

export function PixelPress({ bare = false }) {
  const ref = useRef(null);
  useEffect(() => (ref.current ? mountPixelPress(ref.current, { bare }) : undefined), [bare]);
  return <div ref={ref} className="iso iso-site" data-theme="light" />;
}
