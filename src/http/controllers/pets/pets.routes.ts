import { FastifyInstance } from "fastify"
import { createPetController } from "./create-pet.controller"

export async function petsRoutes(app: FastifyInstance) {
  app.post("/pets", createPetController)
}
