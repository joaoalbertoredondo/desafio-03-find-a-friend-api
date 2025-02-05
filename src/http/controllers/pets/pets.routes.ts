import { FastifyInstance } from "fastify"

import { verifyJWT } from "@/http/middlewares/verify-jwt"

import { createPetController } from "./create-pet.controller"
import { searchPetsController } from "./search-pets.controller"
import { getPetController } from "./get-pet.controller"

export async function petsRoutes(app: FastifyInstance) {
  app.get("/orgs/pets/:id", getPetController)
  app.get("/orgs/pets", searchPetsController)

  app.post("/orgs/pets", { onRequest: [verifyJWT] }, createPetController)
}
