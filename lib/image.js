// getImageProps de next/image, sin next/image (R-M15 de la re-auditoría). Los <img>
// del sitio son server components y no usan placeholder ni onLoad, así que alcanzan los
// atributos (srcset, sizes, loading...) armados en el servidor. Pero next/image
// (dist/shared/lib/image-external.js) importa siempre su componente de cliente, y con él
// cada página bajaba 5,6 KB gz de JS que no hacían nada, aunque solo se usara
// getImageProps. Esto es lo mismo que hace ese getImageProps, con las mismas piezas.
// Son rutas internas de Next: si una versión las mueve, el build falla al importarlas.
import { getImgProps } from "next/dist/shared/lib/get-img-props";
import defaultLoader from "next/dist/shared/lib/image-loader";

export function getImageProps(imgProps) {
  const { props } = getImgProps(imgProps, {
    defaultLoader,
    // Next lo reemplaza en el build con la configuración de `images` (next.config).
    imgConf: process.env.__NEXT_IMAGE_OPTS,
  });
  for (const [key, value] of Object.entries(props)) {
    if (value === undefined) delete props[key];
  }
  return { props };
}
