# SPEC 02 — Feed principal en la ruta `/` (fiel a `Referencias/feed_familiar_actividades_del_aula`)

> **Estado:** Borrador
> **Depende de:** —
> **Sustituye a:** SPEC 01
> **Fecha:** 2026-11-03
> **Objetivo:** Reproducir en `/` el prototipo `Referencias/feed_familiar_actividades_del_aula/code.html` con estilo fiel, textos estáticos e interacciones en memoria, sin autenticación, backend ni persistencia.

## Alcance

**Dentro:**

- Sustituir el contenido de `app/page.tsx` por el feed del prototipo familiar.
- Reproducir header fijo, drawer lateral, tarjeta de perfil, tabs, 4 publicaciones, loader visual y bottom nav.
- Definir en `app/globals.css` los tokens visuales del prototipo: colores, tipografías, tamaños, radios, espaciados y sombras.
- Cargar Plus Jakarta Sans y Nunito Sans con `next/font/google` y Material Symbols Outlined con el stylesheet de Google.
- Verificar y reutilizar las 6 imágenes ya descargadas en `public/images/feed/` en los 10 slots visuales.
- Implementar las interacciones del prototipo: abrir/cerrar drawer, cambio visual de tabs, like, guardar, enfocar comentario, insertar emoji, contador 0/180 y enviar comentario.
- Adaptación responsive: móvil con hamburguesa, drawer y bottom nav; escritorio desde 1024px con sidebar fija, contenido centrado y bottom nav oculta.
- Textos, nombres, horas, reacciones y comentarios exactamente como en la referencia.
- Implementar en una rama distinta de `main` (`spec-02-feed-home`), creada por `/spec-impl`.

**Fuera de alcance:**

- Autenticación, base de datos, APIs, route handlers, server actions, `localStorage` o cualquier persistencia.
- Rutas adicionales para “Resumen del Día”, “Mi Cuenta”, “Avisos y Alertas” o enlaces del feed; quedan inertes con `href="#"`.
- Contenido alternativo al pulsar “Momentos de Mateo”; el tab solo cambia el estado visual.
- Scroll infinito real o carga de más publicaciones; el loader es solo visual.
- Subida real de imágenes, comentarios persistentes o notificaciones.
- Dark mode.
- Dependencias nuevas, incluida cualquier librería de iconos.
- Cambios en `next.config.ts`, ESLint, TypeScript o el flujo de build.
- Completar `.gitignore`: es una tarea aparte, no forma parte de esta spec.

## Modelo de datos

Todo el contenido vive en `lib/feed-data.ts`. No hay datos remotos ni estado persistente.

```ts
export type FeedTab = "aula" | "mateo";

export type MediaItem = {
  src: string;
  alt: string;
  overlay?: string;
  badge?: string;
};

export type FeedComment = {
  id: string;
  author: string;
  time: string;
  body: string;
  avatarIcon: string;
  tone: "family" | "teacher" | "other";
};

export type ActivityPost = {
  kind: "activity";
  id: string;
  author: { name: string; role: string; avatar: string; verified: boolean };
  time: string;
  badges: { icon: string; text: string }[];
  title: string;
  body: string;
  media: MediaItem[];
  tags: string[];
  reactions: {
    emojis: string[];
    summary: string;
    comments: number;
    saves: number;
    liked: boolean;
    saved: boolean;
  };
  comments?: FeedComment[];
};

export type MealPost = {
  kind: "meal";
  id: string;
  icon: string;
  time: string;
  title: string;
  subtitle: string;
  status: string;
  dish: { name: string; note: string; image: string };
};

export type WorkshopPost = {
  kind: "workshop";
  id: string;
  icon: string;
  time: string;
  title: string;
  subtitle: string;
  body: string;
  albumLabel: string;
};

export type FeedEntry = ActivityPost | MealPost | WorkshopPost;

export type FeedData = {
  school: { name: string; room: string };
  viewer: { name: string; role: string; child: string; age: string; avatar: string };
  tabs: { id: FeedTab; label: string; icon: string }[];
  navigation: { id: string; label: string; icon: string }[];
  entries: FeedEntry[];
};
```

Archivos:

```txt
app/page.tsx
app/layout.tsx
app/globals.css
components/feed/*
components/ui/MaterialIcon.tsx
lib/feed-data.ts
public/images/feed/mateo-avatar.jpg
public/images/feed/claudia-avatar.jpg
public/images/feed/paint-main.jpg
public/images/feed/sensory-dough.jpg
public/images/feed/spinach-paint.jpg
public/images/feed/papaya-snack.jpg
```

Las 6 imágenes se reutilizan igual que en el prototipo: `claudia-avatar.jpg` también se usa para la maestra Andrea; `paint-main.jpg` para la sonaja; `sensory-dough.jpg` para el círculo musical; `spinach-paint.jpg` para los juguetes sensoriales.

## Sistema visual y tokens

Colores principales, idénticos al `tailwind.config` del prototipo:

```txt
primary #00685f            primary-container #008378
on-primary #ffffff         on-primary-container #f4fffc
primary-fixed #89f5e7      primary-fixed-dim #6bd8cb
on-primary-fixed #00201d   on-primary-fixed-variant #005049
secondary #855300          secondary-container #fea619
secondary-fixed #ffddb8    on-secondary-fixed #2a1700
tertiary #b90538           tertiary-container #dc2c4f
tertiary-fixed #ffdadb     on-tertiary #ffffff
surface #f8f9ff            surface-container-lowest #ffffff
surface-container-low #eff4ff
surface-container #e5eeff  surface-container-high #dce9ff
surface-container-highest #d3e4fe
on-surface #0b1c30         on-surface-variant #3d4947
outline #6d7a77            outline-variant #bcc9c6
inverse-surface #213145    error #ba1a1a
```

Tipografías:

- Títulos, labels y tabs: **Plus Jakarta Sans** (600, 700, 800).
- Cuerpo y comentarios: **Nunito Sans** (400, 600, 700).
- Iconos: **Material Symbols Outlined** con `font-variation-settings` para `FILL`.
- Tamaños: `headline-md` 1.375rem/1.875rem 700 -0.01em; `title-sm` 1.125rem/1.625rem 600; `body-md` 1rem/1.5rem 400; `body-sm` 0.875rem/1.25rem 400; `label-md` 0.75rem/1rem 700 0.04em; `label-sm` 0.6875rem/0.875rem 600 0.05em; `label-lg` 0.875rem/1.25rem 700 0.02em.

Radios y espaciados:

- `rounded` = 1rem; `rounded-lg` = 2rem; `rounded-xl` = 3rem; `rounded-full` = 9999px.
- `gutter` 1rem; `space-xs` 0.25rem; `space-sm` 0.5rem; `space-md` 1rem; `space-lg` 1.5rem; `space-xl` 2rem.
- `w-13`/`h-13` del avatar de perfil equivalen a 3.25rem.

Sombras exactas:

```txt
Tarjetas: 0 4px 20px -2px rgba(13,148,136,0.06), 0 2px 6px -1px rgba(0,0,0,0.04)
Sidebar:  0 16px 36px -4px rgba(15,23,42,0.08)
Header:   0 4px 20px -2px rgba(13,148,136,0.06)
Bottom:   0 -4px 20px -2px rgba(13,148,136,0.06)
```

Utilidades:

- Definir `.pt-safe` y `.pb-safe` con `env(safe-area-inset-*)`.
- Definir `.material-symbols-outlined` en `globals.css`.
- Definir una animación `fade-in` breve para comentarios nuevos.
- No agregar sombras, bordes, gradientes ni elementos que no aparezcan en el prototipo.

## Plan de implementación

1. Confirmar que existen `Referencias/feed_familiar_actividades_del_aula/code.html` y las 6 imágenes de `public/images/feed/`. Si falta una imagen, descargarla con el mismo nombre antes de continuar.
2. Configurar `app/layout.tsx`: `lang="es"`, metadata en español, Plus Jakarta Sans y Nunito Sans con `next/font/google`, y link de Material Symbols en `<head>`. Mantener el bloque gestionado de Next.js.
3. Completar en `app/globals.css` los tokens de color, fuente, tamaño, radio, espaciado, sombras y utilidades safe-area. Verificar que la página actual sigue compilando.
4. Crear `lib/feed-data.ts` con `school`, `viewer`, `tabs`, `navigation` y los 4 entries en el orden del prototipo: actividad de pintura, colación, música y taller de jardín.
5. Crear `components/ui/MaterialIcon.tsx` y los componentes de shell: `AppHeader`, `SidebarNav`, `BottomNav`. Implementar apertura/cierre del drawer con estado de React y backdrop.
6. Crear `ProfileSummary` y `FeedTabs`. El tab activo cambia solo estilos; no cambia el contenido.
7. Crear `ActivityPost` con badges, título, cuerpo, grid de medios, tags y bloque de reacciones. Implementar like y guardar con estado local.
8. Crear `CommentsThread` con comentarios existentes, reacciones rápidas, textarea, contador 0/180, inserción de emojis y envío de comentario. El nuevo comentario se agrega solo en memoria.
9. Crear `MealCard`, reutilizar `ActivityPost` para la publicación de música y crear `WorkshopCard` y el loader visual.
10. Ensamblar `app/page.tsx` con el shell y los entries. Eliminar el contenido del scaffold.
11. Aplicar la adaptación de escritorio: desde 1024px sidebar fija visible, hamburguesa y backdrop ocultos, contenido centrado con ancho máximo de 720px, header desplazado a la derecha de la sidebar y bottom nav oculta. En móvil se mantiene el layout del prototipo.
12. Revisar accesibilidad sin alterar el diseño: `alt` en imágenes, `aria-label` en botones solo-icono, `aria-current` en navegación activa.
13. Ejecutar `npm run lint`, `npx tsc --noEmit` y `npm run build`. Corregir cualquier error antes de cerrar.

## Criterios de aceptación

- [ ] `/` renderiza el feed sin errores en consola.
- [ ] El orden visual es header, tarjeta de perfil, tabs, publicación de pintura, colación, publicación de música, taller, loader y bottom nav.
- [ ] A 390px de ancho se ven hamburguesa, bottom nav y contenido a ancho completo con `1rem` de margen lateral.
- [ ] A 1280px se ve sidebar fija, no se ve hamburguesa ni bottom nav, y el feed está centrado con ancho máximo de 720px.
- [ ] Los colores principales coinciden con los hex listados, incluidos `#00685f`, `#f8f9ff`, `#e5eeff`, `#b90538` y `#fea619`.
- [ ] Los textos y títulos usan Plus Jakarta Sans; cuerpo, comentarios y labels usan Nunito Sans.
- [ ] Los iconos se renderizan como Material Symbols, no como texto literal.
- [ ] Se muestran las 10 imágenes en sus posiciones originales usando solo los 6 archivos locales de `public/images/feed/`.
- [ ] En runtime no se hacen peticiones a `lh3.googleusercontent.com`.
- [ ] El drawer móvil abre con el botón de menú y cierra con la X o el backdrop.
- [ ] Los tabs cambian el estado activo y el contenido del feed no cambia.
- [ ] El botón de like alterna entre “¡Me encanta!” y “Me gusta”, cambia el icono y el resumen de reacciones.
- [ ] El botón de guardar alterna icono y fondo.
- [ ] El textarea actualiza el contador `n/180`; los emojis se insertan; enviar agrega el comentario y limpia el campo.
- [ ] Recargar la página restaura el estado inicial; no hay persistencia.
- [ ] Todos los enlaces del prototipo permanecen inertes y no navegan a otras rutas.
- [ ] No existe ningún flujo de login, sesión, API ni base de datos.
- [ ] `npm run lint` pasa sin errores.
- [ ] `npx tsc --noEmit` pasa sin errores.
- [ ] `npm run build` termina correctamente.
- [ ] `package.json` no incorpora dependencias nuevas.

## Decisiones

- **Sí:** `Referencias/feed_familiar_actividades_del_aula/code.html` como referencia. La ruta `stitch_opencare/` de SPEC 01 ya no existe; la carpeta actual es `Referencias/`.
- **Sí:** esta SPEC 02 sustituye a SPEC 01. SPEC 01 quedará marcada como Obsoleta para no dejar dos contratos vigentes.
- **Sí:** implementar en la rama `spec-02-feed-home`, distinta de `main`; la crea `/spec-impl` porque `AutoCreateBranch` está en `true`.
- **Sí:** imágenes locales de `public/images/feed/`. Evita depender de URLs de Google y mantiene la página estable.
- **Sí:** `next/font/google` y stylesheet de Material Symbols. Reproduce las fuentes y los iconos sin dependencias nuevas.
- **Sí:** componentes separados y datos en `lib/feed-data.ts`. Facilita mantener la fidelidad y evita un `page.tsx` monolítico.
- **Sí:** escritorio con sidebar fija y contenido centrado. El prototipo es una columna móvil; estirarla a todo el ancho rompe la composición.
- **Sí:** bottom nav solo en móvil. En escritorio la navegación equivalente es la sidebar.
- **Sí:** tabs solo visuales. El prototipo no define contenido alternativo para “Momentos de Mateo”.
- **Sí:** loader estático. El prototipo no implementa scroll infinito.
- **Sí:** estado de like, guardar y comentarios solo en memoria. No hay backend ni persistencia.
- **No:** dark mode. El prototipo no aplica estilos `dark:`.
- **No:** librería de iconos. Material Symbols ya está en la referencia.
- **No:** rutas adicionales, autenticación, APIs o base de datos.
- **No:** completar `.gitignore` dentro de esta spec. Se hará como tarea aparte.

## Riesgos

| Riesgo | Mitigación |
| --- | --- |
| Las imágenes locales falten o estén corruptas | Verificarlas en el paso 1; si falta alguna, descargarla de la referencia o usar un placeholder local con las mismas dimensiones y documentarlo. |
| `next/font` necesite red durante el build | Ejecutar el build con red; si falla la descarga, usar la fuente de respaldo del sistema y reportarlo. |
| El CDN de Material Symbols no cargue en runtime | Mantener el link exacto del prototipo; si el entorno lo bloquea, self-hostear la fuente en `public/fonts/` sin agregar dependencias. |
| Los tokens de Tailwind v4 no generen exactamente las utilidades del prototipo | Comparar clases generadas y usar valores arbitrarios (`[...]`) donde sea necesario, sin cambiar el resultado visual. |
| Diferencias de píxeles entre el prototipo y React | Comparar manualmente a 390px y 1280px contra `screen.png` y ajustar espaciados. |
| Header y sidebar se solapen en escritorio | Verificar offsets y `z-index` en ambos breakpoints. |

## Qué **no** entra en esta spec

- Autenticación, base de datos, APIs, backend y persistencia.
- Rutas distintas de `/`.
- Contenido real para “Momentos de Mateo”, “Resumen del Día”, “Mi Cuenta” o “Avisos y Alertas”.
- Scroll infinito real, subida de imágenes o notificaciones.
- Dark mode.
- Dependencias nuevas.
- Completar `.gitignore`.

Cada uno de esos, si entra, va en su propia spec.
