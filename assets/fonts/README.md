# Fuentes

## La de la web: `Archivo-web.woff2`

La carga `lib/fonts.js` con `next/font/local` (R-M14 de la re-auditoría). Es Archivo
variable recortada a lo que usa el sitio: pesos de 400 a 800 y anchos de 68% a 100%
(docs/DISENO.md, sección 3), con el mismo rango de caracteres y las mismas funciones
tipográficas que el archivo "latin" de Google Fonts. Pesa 57 KB; el de Google pesaba
88 KB, porque trae todos los pesos y anchos aunque se pidan menos.

Si algún día hace falta un peso fuera de 400–800 o un ancho fuera de 68%–100%, hay que
generarla de nuevo con otros límites (y cambiar `weight` y `font-stretch` en
`lib/fonts.js`). Desde `Archivo[wdth,wght].ttf` de
[google/fonts](https://github.com/google/fonts/tree/main/ofl/archivo) y con
`pip install fonttools brotli`:

```bash
fonttools varLib.instancer "Archivo[wdth,wght].ttf" wght=400:800 wdth=68:100 -o tmp.ttf
pyftsubset tmp.ttf --output-file=Archivo-web.woff2 --flavor=woff2 \
  --unicodes="U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD" \
  --layout-features="ccmp,dnom,frac,liga,locl,numr,pnum,rvrn,tnum,kern,mark,mkmk" \
  --no-hinting --desubroutinize
```

## Las de la imagen OG

`app/[lang]/opengraph-image.js` las lee del disco, así que el build no necesita red.
Son instancias estáticas de [Archivo](https://github.com/Omnibus-Type/Archivo)
(licencia OFL 1.1, en `OFL.txt`, sin nombre reservado), la misma fuente que carga
`next/font` en la web. next/og (Satori) no aplica los ejes de una fuente variable:
usaría siempre la instancia por defecto (peso 400, ancho 100). Por eso cada peso y
ancho que usa la imagen es un archivo aparte.

| Archivo                      | wdth | wght | Uso                              |
| ---------------------------- | ---- | ---- | -------------------------------- |
| `Archivo-Display-68-800.ttf` | 68   | 800  | El nombre (igual que `.display`) |
| `Archivo-SemiBold.ttf`       | 100  | 600  | El cargo                         |
| `Archivo-Regular.ttf`        | 100  | 400  | La línea de `meta.ogTagline`     |

Solo tienen latín básico, Latin-1 y la puntuación tipográfica común (unos 29 KB cada
una). Para regenerarlas, desde `Archivo[wdth,wght].ttf` de
[google/fonts](https://github.com/google/fonts/tree/main/ofl/archivo) y con
`pip install fonttools`:

```bash
fonttools varLib.instancer "Archivo[wdth,wght].ttf" wdth=68 wght=800 -o tmp.ttf
pyftsubset tmp.ttf --output-file=Archivo-Display-68-800.ttf \
  --unicodes="U+0020-007E,U+00A0-00FF,U+2013-2014,U+2018-201A,U+201C-201E,U+2022,U+2026,U+2039-203A,U+20AC" \
  --layout-features="kern,liga,tnum,lnum" --no-hinting --desubroutinize --drop-tables+=DSIG
```

Lo mismo con `wdth=100 wght=600` (SemiBold) y `wdth=100 wght=400` (Regular).
