import request from "supertest"
import { afterAll, beforeAll, describe, expect, it } from "vitest"

import { createAndAuthenticateOrg } from "@/utils/test/create-and-authenticate-org"
import { app } from "@/app"

describe("Search Pets Controller (e2e)", () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it("should be able to search pets", async () => {
    const { token } = await createAndAuthenticateOrg(app)

    await request(app.server)
      .post("/orgs/pets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Pet",
        about: "relaxed",
        age: "4",
        size: "small",
        energy_level: "medium",
        environment: "outdoor",
      })

    await request(app.server)
      .post("/orgs/pets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Pet2",
        about: "relaxed",
        age: "4",
        size: "small",
        energy_level: "medium",
        environment: "outdoor",
      })

    const response = await request(app.server)
      .get("/orgs/pets")
      .query({ city: "Random Town" })
      .set("Authorization", `Bearer ${token}`)
      .send()

    expect(response.status).toBe(200)
    expect(response.body.pets).toHaveLength(2)
  })
})
