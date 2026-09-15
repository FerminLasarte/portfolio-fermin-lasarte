// Datos estructurados (JSON-LD). El `<` se escapa para que un texto nunca pueda cerrar
// el <script> (node_modules/next/dist/docs/01-app/02-guides/json-ld.md).
export default function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
