import { FastifyInstance } from "fastify"
import { createOrgController } from "./controllers/orgs/create-org.controller"

export async function appRoutes(app: FastifyInstance) {
  app.post("/orgs", createOrgController)
}
