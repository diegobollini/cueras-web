# Cueras

Sitio institucional de **Cueras | Gestoras Culturales**, un equipo dedicado a la
gestión, producción y comunicación de proyectos culturales.

El sitio nació en WordPress y luego fue exportado como un sitio estático. Esta
versión conserva el diseño y los contenidos originales sin depender de una base
de datos, un servidor de aplicaciones ni un CMS en producción.

## Sitio

[cueras.com.ar](https://cueras.com.ar)

## Tecnologías

- HTML5 y CSS3.
- JavaScript mínimo para la navegación accesible en pantallas pequeñas.
- Fuentes e imágenes servidas desde el propio repositorio.
- Despliegue continuo en Vercel desde la rama `main`.

No hay dependencias, gestor de paquetes ni proceso de compilación.

## Estructura

```text
.
├── index.html                         # Inicio
├── hacemos/index.html                 # Qué hacemos
├── nosotras/index.html                # Equipo
├── proyectos/index.html               # Índice de proyectos
├── proyectos/
│   ├── provocaciones-escenicas/
│   ├── subversion-feminista/
│   └── teatro-insurrecto/
├── category/                          # Listados por categoría
└── wp-content/
    ├── themes/fewer/                  # Estilos y fuentes locales
    └── uploads/                       # Imágenes del sitio
```

Las carpetas `wp-content` y las clases con prefijo `wp-` se mantienen por
compatibilidad con el diseño exportado; el sitio no ejecuta WordPress.

## Desarrollo local

Al usar rutas relativas, conviene servir el repositorio por HTTP en vez de abrir
los archivos directamente desde el explorador:

```bash
python3 -m http.server 8000
```

Luego se puede visitar [http://localhost:8000](http://localhost:8000).

## Actualización de contenidos

1. Editar el `index.html` de la página correspondiente.
2. Guardar las imágenes nuevas dentro de `wp-content/uploads/` y enlazarlas con
   rutas relativas.
3. Revisar la navegación y la visualización en escritorio y dispositivos
   móviles con un servidor local.
4. Crear un commit y subirlo a `main`.

## Despliegue

Vercel publica directamente los archivos estáticos del repositorio. Cada `push`
a `main` genera un nuevo despliegue; no es necesario configurar comandos de
instalación ni de build.

## Licencia

El código se distribuye bajo los términos de la [GNU GPL v3](LICENSE). Los
textos, marcas e imágenes pertenecen a sus respectivos titulares.
