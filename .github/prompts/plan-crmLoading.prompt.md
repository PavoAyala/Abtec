## Plan: Investigar carga de CRM en desarrollo

TL;DR: El CRM usa variables de Firebase desde `apps/CRM/.env.local`, pero ese archivo no existe en el repo actual. Esto puede provocar que el auth listener no inicialice y la app quede en el spinner de `AuthProvider`.

**Pasos**
1. Verificar que el comando de desarrollo se está ejecutando desde la raíz del monorepo y que arranca el paquete correcto: `pnpm dev` debe ejecutar `turbo run dev --filter=web --filter=abtec-crm`.
2. Confirmar el entorno de Firebase para `apps/CRM`:
   - Revisar si existe `apps/CRM/.env.local`.
   - Si no existe, crear `apps/CRM/.env.local` con las variables `NEXT_PUBLIC_FIREBASE_*` que están en la raíz `.env`.
3. Ejecutar `pnpm --filter abtec-crm dev` directamente y capturar la salida del terminal.
4. Revisar la consola del navegador y la red en `localhost:3001` al cargar CRM, buscando errores de Firebase Auth o de inicialización.
5. Si el spinner se mantiene, agregar logs temporales en `apps/CRM/components/AuthProvider.tsx` para comprobar si `onAuthStateChanged` recibe callback y si el redirect a `/login` se dispara.

**Archivos relevantes**
- `apps/CRM/package.json` — script `dev` y nombre del paquete `abtec-crm`.
- `apps/CRM/lib/firebase.ts` — depende de env vars `NEXT_PUBLIC_FIREBASE_*` y del emulador.
- `apps/CRM/components/AuthProvider.tsx` — muestra spinner hasta que `onAuthStateChanged` termine.
- `README.md` — dice explícitamente que CRM usa `CRM/.env.local`.

**Verificación**
1. Confirmar existencia de `apps/CRM/.env.local`.
2. Si se crea el archivo, reiniciar `pnpm dev` y comprobar que `localhost:3001` carga.
3. Verificar en la consola del navegador si hay errores de Firebase o de rutas.
4. Si el problema persiste, revisar si `onAuthStateChanged` queda pendiente y ajustar la inicialización.

**Decisiones**
- No modificar `AuthProvider` antes de confirmar que la falta de env vars es la causa; primero validar el entorno de Firebase.
- Usar `apps/CRM/.env.local` para alinear el comportamiento con la documentación del repositorio.

**Siguientes acciones**
1. Si quieres, puedo guiarte para crear `apps/CRM/.env.local` a partir de `.env` y luego revisar la carga nuevamente.
2. También puedo ayudar a añadir un manejo de timeout en `AuthProvider` para evitar que la app quede atrapada en un spinner indefinido.
