import { FastifyInstance } from "fastify"
import request from "supertest"

export async function createAndAuthenticateOrg(app: FastifyInstance) {
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
    latitude: -23.3111552,
    longitude: -45.9964416,
  })

  const authResponse = await request(app.server)
    .post("/sessions")
    .send({ email: "org@example.com", password: "123456" })

  const { token } = authResponse.body

  return {
    token,
  }
}
