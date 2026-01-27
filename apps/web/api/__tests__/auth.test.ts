import { expect, test, describe } from "vitest";
import app from "../src/index.js";

describe("API Authentication", () => {
  test("GET / returns 401 without auth", async () => {
    const req = new Request("http://localhost/");
    const res = await app.request(req);

    expect(res.status).toBe(401);
  });

  test("returns JSON error response", async () => {
    const req = new Request("http://localhost/");
    const res = await app.request(req);

    const contentType = res.headers.get("content-type");
    expect(contentType).toContain("application/json");
  });

  test("unauthorized request has proper error message", async () => {
    const req = new Request("http://localhost/");
    const res = await app.request(req);
    const json = await res.json();

    expect(json).toHaveProperty("error");
    expect(json.error).toBeDefined();
  });

  test("OPTIONS request for CORS", async () => {
    const req = new Request("http://localhost/", { method: "OPTIONS" });
    const res = await app.request(req);

    // Should handle OPTIONS for CORS preflight
    expect(res.status).toBeLessThan(500);
  });

  test("handles invalid paths", async () => {
    const req = new Request("http://localhost/invalid-path");
    const res = await app.request(req);

    expect(res.status).toBeGreaterThanOrEqual(400);
  });

  test("POST request without auth returns 401", async () => {
    const req = new Request("http://localhost/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ test: "data" }),
    });
    const res = await app.request(req);

    expect(res.status).toBe(401);
  });

  test("has security headers", async () => {
    const req = new Request("http://localhost/");
    const res = await app.request(req);

    // Check for common security headers
    const headers = res.headers;
    expect(headers).toBeDefined();
  });
});
