# Backend Testing Guide

## ⚠️ Current Status

The backend uses **Convex** functions which require the Convex runtime to test properly. The current test files are **reference implementations** showing what SHOULD be tested, but they need the Convex runtime or code refactoring to work.

## Why Tests Are Failing

Convex wraps queries/mutations/actions in a way that makes direct testing difficult:

```typescript
export const createSearch = mutation({
  args: { query: v.string() },
  handler: async (ctx, args) => {
    /* logic */
  },
});
```

The `handler` is not directly accessible without the Convex runtime.

## Solutions

### Option 1: Use Convex Test Environment (Recommended)

Wait for Convex to release official testing utilities, or use their dev environment for integration tests.

### Option 2: Refactor for Testability

Extract business logic from handlers:

```typescript
// Testable logic
export async function createSearchLogic(db, userId, query) {
  return await db.insert("searches", { query, userId });
}

// Convex wrapper
export const createSearch = mutation({
  args: { query: v.string() },
  handler: async (ctx, args) => {
    const userId = await getCurrentUserIdOrThrow(ctx);
    return await createSearchLogic(ctx.db, userId, args.query);
  },
});
```

### Option 3: Manual Testing

Test in Convex dev dashboard or via API calls.

## What's Provided

- ✅ **Test structure** - Shows what should be tested
- ✅ **Mock utilities** - `setup.ts` with helpers
- ✅ **Schema tests** - These work! (no Convex runtime needed)
- ✅ **Credits tests** - These work! (just constants)
- ⚠️ **Function tests** - Need Convex runtime or refactoring

## Running Working Tests Only

```bash
# Run only schema and credits tests
pnpm test schema.test.ts credits.test.ts
```

## Next Steps

1. **For Launch:** Manual testing + integration tests in staging
2. **Long-term:** Refactor to extract testable logic OR wait for Convex testing tools
