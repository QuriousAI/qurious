# Todo

- `apps/web/app`: Add consistent app layout and spacing with https://craft-ds.com/.

---

# [Research-App] Monorepo

Monorepo for [Research-App].

## Product Architecture

### Apps and Packages

#### Web Applications

- `web/www`: TODO: Complete.
- `web/app`: TODO: Complete.
- `web/blog`: TODO: Complete.
- `web/status`: TODO: Complete.

#### Shared Packages

- `@workspace/shadcn-ui`: TODO: Complete.
- `@workspace/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@workspace/typescript-config`: `tsconfig.json`s used throughout the monorepo

> [!NOTE]
> We use `apps/web` instead of `apps` to accommodate future mobile applications under `apps/mobile`.

### Tech Stack

TODO: Complete.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js
- pnpm
- Git

### Build

To build all apps and packages, run the following command:

```console
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```console
pnpm dev
```
