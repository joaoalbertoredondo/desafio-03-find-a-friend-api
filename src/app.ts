import fastify from "fastify"
import { ZodError } from "zod"
import fastifyJwt from "@fastify/jwt"

import { env } from "./env"
import { orgsRoutes } from "./http/controllers/orgs/orgs.routes"
import { petsRoutes } from "./http/controllers/pets/pets.routes"

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(orgsRoutes)
app.register(petsRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation error.", issues: error.format() })
  }

  if (env.NODE_ENV !== "production") {
    console.error(error)
  } else {
    // TODO: Here we should log to an external tool like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: "Internal server error." })
})
