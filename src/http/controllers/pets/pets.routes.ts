import { FastifyInstance } from "fastify"
import { createPetController } from "./create-pet.controller"
import { getPetController } from "./get-pet.controller"
import { verifyJWT } from "@/http/middlewares/verify-jwt"

export async function petsRoutes(app: FastifyInstance) {
  app.get("/orgs/pets/:id", getPetController)

  app.post("/orgs/pets", { onRequest: [verifyJWT] }, createPetController)
}
