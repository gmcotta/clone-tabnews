const { default: orchestrator } = require("tests/orchestrator");

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("/status", () => {
  it("should return 200 when GET to /api/v1/status", async () => {
    const response = await fetch("http://localhost:3000/api/v1/status");
    expect(response.status).toBe(200);

    const responseBody = await response.json();
    expect(responseBody).toBeDefined();

    // timestamp
    const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
    expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

    // versao do postgres
    expect(responseBody.dependencies.database.version).toEqual("16.0");

    // conexoes maximas
    expect(responseBody.dependencies.database.max_connections).toEqual(100);

    // conexoes usadas
    expect(responseBody.dependencies.database.current_connections).toEqual(1);
  });
});
