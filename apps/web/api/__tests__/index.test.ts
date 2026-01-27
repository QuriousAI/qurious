import { expect, test, describe } from "vitest";
import app from "../src/index";

describe("API Routes", () => {
  test("GET / returns 401 without authentication", async () => {
    const req = new Request("http://localhost/");
    const res = await app.request(req);

    expect(res.status).toBe(401);
    const json = await res.json();
    expect(json.error).toBeDefined();
  });

  test("API responds with JSON content type for errors", async () => {
    const req = new Request("http://localhost/");
    const res = await app.request(req);

    const contentType = res.headers.get("content-type");
    expect(contentType).toContain("json");
  });
});
