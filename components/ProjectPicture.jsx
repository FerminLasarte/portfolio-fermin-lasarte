import { getImageProps } from "@/lib/image";

// La captura de un trabajo en un tamaño: la clara y, si hay, la oscura, que se muestra
// con el tema oscuro del sitio (styles/projects.css). Decorativa: el nombre ya está en
// el texto de al lado, y la descripción de cada captura en la página del trabajo. La
// usan el índice de Trabajos y la tarjeta del último trabajo en el hero.
export default function ProjectPicture({ media, sizes }) {
  const img = (src, cls) => (
    // eslint-disable-next-line @next/next/no-img-element -- los atributos salen de getImageProps (R-M15)
    <img
      {...getImageProps({ src, width: media.width, height: media.height, sizes, alt: "" }).props}
      alt=""
      className={cls}
    />
  );
  return media.imageDark ? (
    <>
      {img(media.image, "plate__img--light")}
      {img(media.imageDark, "plate__img--dark")}
    </>
  ) : (
    img(media.image)
  );
}
