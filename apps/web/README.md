# Apps

## Structure

```
/apps
├── /web
│   ├── /app
│   ├── /blog
│   ├── /status
│   ├── /www
|   ├── /help
│   └── README.MD <-- You're here!
├── (planned) /mobile    # (possible future integrations)
└── (planned) /desktop   # (possible future integrations)
```

## Apps

- Www - 3000
- App - 3001
- Blog - 3002
- Help - 3003
- Status - 3004

## Creating A New App

- Create from template.
- Update configs from `/packages`.
  ⚠️ Important: after you add the @workspace dependency, it won't just work out of the box. Like any other package, after you add it your dependency list, you then need to install it. `pnpm install` at root level.

1. Eslint:

```ts
import { nextJsEslintConfig } from "@workspace/eslint-config/next-js";

/** @type {import("eslint").Linter.Config} */
export default nextJsEslintConfig;
```

2. Typescript

Extend the base config from `@workspace/ts-config`.

3. Styles

Import Tailwind CSS Styles.

Import PostCSS config.

```
export { default } from "@workspace/ui/postcss.config";
```
