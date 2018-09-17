# Markdown Links

## Descripción

Esta libreria permite analizar archivos con extensión MD.Analiza el contenido y extrae los links que contiene el archivo, además muestra el estado y estadísticas de los links.

## Instalación


## Versión


## Uso de CLI (Línea de Comando)

`md-links <path-to-file> [options]`

`<path-to-file>:` Ruta de un archivo o directorio.

Por ejemplo:

```sh
$ md-links ./some/example.md
./some/example.md http://algo.com/2/3/ Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html algún doc
./some/example.md http://google.com/ Google
```

`[options]`

--validate : Si ingresamos la opción `--validate` muestra el link, mensaje de estado y estado del link.

Por ejemplo:

```sh
$ md-links ./some/example.md --validate
./some/example.md http://algo.com/2/3/ ok 200 Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html fail 404 algún doc
./some/example.md http://google.com/ ok 301 Google
```

--stats : Si pasamos la opción `--stats` el output (salida) será un texto con estadísticas básicas sobre los links como el total y los links únicos.

Por ejemplo:

```sh
$ md-links ./some/example.md --stats
Total: 3
Unique: 3
```

--stats --validate / --validate --stats : para obtener estadísticas que necesiten de los resultados de la validación como total, únicos y links rotos.

Por ejemplo:

```sh
$ md-links ./some/example.md --stats --validate
Total: 3
Unique: 3
Broken: 1
```

