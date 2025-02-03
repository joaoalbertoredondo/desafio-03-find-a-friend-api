import { FastifyInstance } from "fastify"
import { createPetController } from "./create-pet.controller"
import { getPetController } from "./get-get.controller"

export async function petsRoutes(app: FastifyInstance) {
  app.get("/orgs/pets", getPetController)

  app.post("/orgs/pets", createPetController)
}
