import { FastifyInstance } from "fastify"
import { createOrgController } from "./controllers/orgs/create-org.controller"
import { authenticateOrgController } from "./controllers/orgs/authenticate-org.controller"

export async function appRoutes(app: FastifyInstance) {
  app.post("/orgs", createOrgController)

  app.post("/sessions", authenticateOrgController)
}
