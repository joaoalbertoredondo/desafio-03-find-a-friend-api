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

  const org_id = "12" // fix me!

  try {
    const createPetUseCase = makeCreatePetUseCase()

    const { pet } = await createPetUseCase.execute({
      ...body,
      org_id,
    })

    return reply.status(201).send(pet)
  } catch (error) {}
}
