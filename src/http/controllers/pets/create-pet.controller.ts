import { OrgNotFoundError } from "@/use-cases/errors/org-not-found.error"
import { makeCreatePetUseCase } from "@/use-cases/factories/make-create-pet-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function createPetController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createPetBodySchema = z.object({
    name: z.string(),
    about: z.string(),
    age: z.string(),
    size: z.string(),
    energy_level: z.string(),
    environment: z.string(),
  })

  const body = createPetBodySchema.parse(request.body)

  const org_id = "229d42c1-a082-411c-848b-5337bd5d8132" // fix me!

  try {
    const createPetUseCase = makeCreatePetUseCase()

    await createPetUseCase.execute({
      ...body,
      org_id,
    })
  } catch (error) {
    if (error instanceof OrgNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    console.error(error)

    return reply.status(500).send({ message: "Internal server error" })
  }

  return reply.status(201).send()
}
