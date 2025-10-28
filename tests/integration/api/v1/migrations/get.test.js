import { cleanDatabase } from "tests/cleanDatabase";
import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await cleanDatabase();
  await orchestrator.waitForAllServices();
});

describe("/migrations", () => {
  it("should return 200 when GET to /api/v1/migrations", async () => {
    const response = await fetch("http://localhost:3000/api/v1/migrations");
    expect(response.status).toBe(200);

    const responseBody = await response.json();
    expect(Array.isArray(responseBody)).toBe(true);
    expect(responseBody.length).toBeGreaterThan(0);
  });
});
