## Cambios en `MentorSection.tsx`

### 1. Más partículas, 25% más pequeñas

- Subir el conteo de partículas de **60 → 90**.
- Reducir tamaño actual `1.5 + (i % 5) * 0.6` (rango 1.5–4px) en 25%
  → nuevo rango aproximado **1.1–3px** (`size = 1.1 + (i % 5) * 0.45`).
- Mantener proporción 80% dorado / 20% verde y los glows existentes
  (`box-shadow` con triple capa para que sigan luciendo brillantes pese al menor tamaño).

### 2. Eliminar las "aureolas" superior/inferior al final

Actualmente, al terminar la convergencia, el destello visible es un óvalo
desenfocado posicionado **arriba** (diadema) y **abajo** (collar) del avatar,
flotando como halos externos al cuerpo de Keiko. Cambios:

- **Quitar** el bloque `diadem-violet` (aureola superior).
- **Quitar** el bloque `collar-glow` actual (aureola inferior).
- **Quitar** también el `aura ring` dorado expansivo de fondo (200×200) que
  refuerza la sensación de aureola.

### 3. Reemplazo: brillo dentro del cuerpo de Keiko (corazón / collar)

Añadir un único punto de luz **interior**, centrado en el pecho de Keiko
(donde lleva el collar / corazón), confinado al cuerpo:

- Posición relativa dentro del `<motion.div>` que envuelve la imagen:
  aproximadamente `top: 58%`, `left: 50%`, tamaño compacto (~36×36 px).
- Forma: pequeño círculo radial con `mix-blend-mode: screen` para que se
  funda con los píxeles del avatar y parezca brillar **desde dentro**.
- Color: dorado cálido (`hsla(43,100%,70%,…)`) con un núcleo blanco para
  simular un latido luminoso del corazón/collar.
- Duración total: **3 segundos**, con un pulso doble (latido) tipo
  `opacity: [0, 1, 0.75, 1, 0.7, 0]` y leve `scale` 0.8 → 1.15 → 1.
- Delay: arranca cuando las partículas comienzan a aterrizar (~1.0s).
- Sin `boxShadow` exterior amplio que vuelva a parecer aureola; solo un
  `filter: blur(3px)` controlado para mantenerlo dentro del contorno.

### Resultado visual

- Lluvia más densa de chispas doradas finísimas llegando a múltiples puntos
  del cuerpo de Keiko.
- Al converger, **no** aparecen halos arriba ni abajo: en su lugar, el
  pecho/collar de Keiko late con un brillo dorado cálido durante 3 segundos,
  como si su corazón se encendiera.

### Archivos modificados

- `src/components/brinpal/MentorSection.tsx` (único archivo afectado).
