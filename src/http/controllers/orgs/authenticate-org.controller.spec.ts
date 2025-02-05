import request from "supertest"
import { afterAll, beforeAll, describe, expect, it } from "vitest"

import { app } from "@/app"

describe("Authenticate Org Controller (e2e)", () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it("should be able to authenticate an org", async () => {
    await request(app.server).post("/orgs").send({
      name: "Random Org",
      author_name: "John Doe",
      email: "org@example.com",
      whatsapp: "12990908767",
      password: "123456",
      cep: "12345-345",
      state: "Any State",
      city: "Random Town",
      neighborhood: "Any Neighborhood",
      street: "Any Street",
      latitude: -233111552,
      longitude: -459964416,
    })

    const response = await request(app.server).post("/sessions").send({
      email: "org@example.com",
      password: "123456",
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
