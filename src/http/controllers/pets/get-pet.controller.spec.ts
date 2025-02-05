import request from "supertest"
import { app } from "@/app"
import { afterAll, beforeAll, describe, expect, it } from "vitest"
import { createAndAuthenticateOrg } from "@/utils/test/create-and-authenticate-org"

describe("Get Pet Controller (e2e)", () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it("should be able to get a pet", async () => {
    const { token } = await createAndAuthenticateOrg(app)

    const response = await request(app.server)
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

    const getPetResponse = await request(app.server).get(
      `/orgs/pets/${response.body.id}`
    )

    expect(getPetResponse.status).toBe(200)
  })
})
