# Portfolio & Blog de Jesús Vélez

Este proyecto está configurado para funcionar con subdominios usando Netlify como adaptador.

## Estructura del Proyecto

### Dominios

- **Dominio principal** (`jesusvelez.dev`): Portfolio personal
- **Subdominio blog** (`blog.jesusvelez.dev`): Blog técnico y DevBlog

### Arquitectura

El proyecto utiliza:
- **Astro** como framework principal
- **React** para componentes interactivos
- **MDX** para contenido del blog
- **Netlify** como adaptador para SSR
- **TailwindCSS** para estilos

### Configuración de Subdominios

#### Middleware
El archivo `src/middleware.ts` detecta automáticamente el subdominio y:
- Redirige las rutas del blog desde el dominio principal al subdominio
- Controla qué contenido se sirve según el subdominio

#### Páginas
- `index.astro`: Portfolio principal (solo dominio principal)
- `DevBlog.astro`: Página principal del blog (solo subdominio blog)
- `Blog/[slug].astro`: Artículos individuales (solo subdominio blog)
- `Blog/Posts.astro`: Lista de posts (solo subdominio blog)

### Despliegue en Netlify

1. **Configuración DNS**: Configura tu DNS para que `blog.tudominio.com` apunte a Netlify
2. **Netlify Settings**: 
   - Domain: `tudominio.com`
   - Branch deploys: `main`
   - Build command: `npm run build`
   - Publish directory: `dist`

3. **Variables de entorno**: Copia `.env.example` como `.env` y configura las URLs

### Desarrollo Local

```bash
# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Build
npm run build

# Preview
npm run preview
```

### Configuración de Redirecciones

Las redirecciones están configuradas en:
- `netlify.toml`: Configuración principal de Netlify
- `public/_redirects`: Redirecciones adicionales
- `astro.config.mjs`: Redirecciones de Astro

## Funcionalidades

### Portfolio Principal
- Experiencia profesional
- Proyectos destacados
- Skills técnicas
- Navegación responsive

### Blog Técnico
- Posts sobre desarrollo
- Categorías por tecnología
- Navegación entre portfolio y blog
- Sistema de etiquetas

## Tecnologías Utilizadas

- Astro 5.x
- React 19.x
- TypeScript
- TailwindCSS 4.x
- MDX
- Netlify Functions

## Licencia

MIT License