import { PERSON } from "@/lib/site";

// Pie (docs/DISENO.md, 5): va después de la pista, con el © y los derechos. Las redes
// están en el nav y en Contacto.
export default function Footer({ t }) {
  return (
    <footer className="footer">
      <p className="meta">
        © {new Date().getFullYear()} {PERSON.name}. {t("footer.rights")}
      </p>
    </footer>
  );
}
