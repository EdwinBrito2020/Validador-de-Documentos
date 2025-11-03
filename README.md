# Panel de Administración – Configurador de Tipos de Documentos

Esta es la **primera parte** de un microservicio para validación de documentos mediante una API de IA. Aquí construimos un **panel web** (Next.js 14, React, TypeScript) y una **API local** (App Router) para crear/editar/listar/eliminar **tipos de documentos** y sus configuraciones (campos, validaciones, template de prompt), persistiendo en **archivos JSON** (sin BD).

> **Estado:** listo para desarrollo en local (Windows, macOS, Linux). Probado con Node.js 20+.

## 🚀 Puesta en marcha

1. **Instala Node.js 20+** (recomendado LTS). En Windows, descarga desde https://nodejs.org
2. **Clona o descomprime** este proyecto y abre la carpeta `panel-admin-documentos/` en **VS Code**.
3. **Instala dependencias**:

```bash
npm install
```

4. **Arranca en desarrollo**:

```bash
npm run dev
```

Luego abre http://localhost:3000 y entra a **/admin/tipos-documento**.

> Puedes cambiar el puerto editando `PORT` en `.env.local`.

## 📁 Estructura principal

```
panel-admin-documentos/
├─ app/
│  ├─ api/document-types/              # Endpoints REST
│  ├─ admin/                           # Panel de administración
│  │  ├─ components/                   # Form, builders, editor
│  │  └─ tipos-documento/
│  │     ├─ nuevo/
│  │     └─ [id]/editar/
│  ├─ layout.tsx
│  └─ page.tsx
├─ components/ui/                      # UI mínima tipo shadcn
├─ data/document-types.json            # “BD” local
├─ lib/                                # Schemas Zod, storage, utils
├─ types/                              # Tipos TS
├─ tailwind.config.ts, postcss.config.js, next.config.js
├─ package.json, tsconfig.json, .env.local
└─ README.md
```

## 🔌 API REST (App Router)

- `GET /api/document-types` – Lista todos
- `POST /api/document-types` – Crea (valida con Zod)
- `GET /api/document-types/[id]` – Obtiene uno
- `PUT /api/document-types/[id]` – Actualiza (valida identificador único)
- `DELETE /api/document-types/[id]` – Elimina
- `POST /api/document-types/[id]?action=duplicate` – Duplica ítem

## 🧩 Características

- **CRUD completo** de tipos de documentos
- **Almacenamiento local JSON** (`DATA_FILE_PATH` configurable)
- **Validación con Zod** (schemas en `lib/schemas`)
- **Panel UI** con tabs:
  - Información básica
  - Configuración de archivos
  - Campos a extraer (constructor visual con drag-simplificado ↑↓)
  - Validaciones fijas y configurables
  - Template de Prompt con **preview**
  - Configuración adicional (JSON)
- **Búsqueda y filtros** en listado
- **Duplicar** tipo de documento
- **Toasts básicos** y estados de carga

> **Nota:** Los componentes UI están implementados en casa con Tailwind para evitar pasos extra de generación de shadcn. Puedes reemplazarlos por `shadcn/ui` cuando lo desees.

## ⚙️ Configuración

Variables en `.env.local`:

```
PORT=3000
DATA_FILE_PATH=./data/document-types.json
```

## 🧪 Datos iniciales

El archivo `data/document-types.json` comienza así:

```json
{json_data}
```

## 🔮 Próximas fases (sugeridas)

1. **A. Orquestación de IA**: conector a tu proveedor (OpenAI/Azure/otros) y workers.
2. **B. Upload de archivos**: dropzone + validación de tamaño/formato + preprocesamiento.
3. **C. Motor de validaciones**: ejecutar reglas fijas/configurables sobre outputs de IA.
4. **D. Versionado**: historial básico por identificador, diff visual.
5. **E. Exportar/Importar**: endpoints dedicados y UI con validación de estructura.
6. **F. Auth y RBAC**: acceso seguro (NextAuth/Entra ID) y permisos por rol.
7. **G. Observabilidad**: logs estructurados, métricas, auditoría.
8. **H. Contenedorización**: Dockerfile y docker-compose (tu preferencia es dejarlo para esta fase).

## ⚠️ Consideraciones

- Este proyecto escribe en disco. Para despliegues serverless, usa un storage compartido (S3, Blob, etc.) o BD.
- La “concurrencia” se maneja con escritura atómica (archivo `.tmp` + `rename`). Para alta concurrencia, añade lockfile.

---

Hecho con ❤️ para iniciar rápido tu microservicio de validación documental.
