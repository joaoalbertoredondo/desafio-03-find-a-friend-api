import { FastifyInstance } from "fastify"
import { createOrgController } from "./create-org.controller"
import { authenticateOrgController } from "./authenticate-org.controller"
import { fetchNearbyOrgsController } from "./fetch-nearby-orgs.controller"

export async function orgsRoutes(app: FastifyInstance) {
  app.get("/orgs/nearby", fetchNearbyOrgsController)
  
  app.post("/orgs", createOrgController)
  app.post("/sessions", authenticateOrgController)
}
