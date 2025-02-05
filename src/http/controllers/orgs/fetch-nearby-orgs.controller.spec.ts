import request from "supertest"
import { afterAll, beforeAll, describe, expect, it } from "vitest"

import { app } from "@/app"

describe("Fetch Nearby Orgs Controller (e2e)", () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it("should be able to fetch nearby orgs", async () => {
    await request(app.server).post("/orgs").send({
      name: "Random Org1",
      author_name: "John Doe",
      email: "org@example.com",
      whatsapp: "12990908767",
      password: "123456",
      cep: "12345-345",
      state: "Any State",
      city: "Random Town",
      neighborhood: "Any Neighborhood",
      street: "Any Street",
      latitude: -23.3111552,
      longitude: -45.9964416,
    })

    await request(app.server).post("/orgs").send({
      name: "Random Org2",
      author_name: "John Doe",
      email: "org@example.com",
      whatsapp: "12990908767",
      password: "123456",
      cep: "12345-345",
      state: "Any State",
      city: "Random Town",
      neighborhood: "Any Neighborhood",
      street: "Any Street",
      latitude: -21.3111552,
      longitude: -41.9964416,
    })

    const response = await request(app.server)
      .get("/orgs/nearby")
      .query({
        latitude: -23.3111552,
        longitude: -45.9964416,
      })
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.orgs).toHaveLength(1)
    expect(response.body.orgs).toEqual([
      expect.objectContaining({
        name: "Random Org1",
      }),
    ])
  })
})
