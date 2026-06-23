"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Accessible dropdown. The trigger is always a <button> (it controls a menu).
 * Opening one dropdown closes any other that is open, because each open
 * instance listens for outside clicks.
 */
export default function Dropdown({ up = false, triggerClassName, triggerContent, children }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [open]);

  return (
    <div className="dropdown" ref={ref}>
      <button
        type="button"
        className={triggerClassName}
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        {triggerContent}
      </button>
      <div
        className={`dropdown-content${up ? " dropup" : ""}${open ? " show" : ""}`}
        onClick={() => setOpen(false)}
      >
        {children}
      </div>
    </div>
  );
}
