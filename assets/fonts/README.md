# Fuentes de la imagen OG

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
