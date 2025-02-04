import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

import { OrgAlreadyExistsError } from "../../../use-cases/errors/org-already-exists.error"
import { makeCreateOrgUseCase } from "@/use-cases/factories/make-create-org.use-case"

export async function createOrgController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createOrgBodySchema = z.object({
    name: z.string(),
    author_name: z.string(),
    email: z.string(),
    whatsapp: z.string(),
    password: z.string().min(6),
    cep: z.string(),
    state: z.string(),
    city: z.string(),
    neighborhood: z.string(),
    street: z.string(),
    latitude: z.number(),
    longitude: z.number(),
  })

  const {
    name,
    author_name,
    email,
    whatsapp,
    password,
    cep,
    state,
    city,
    neighborhood,
    street,
    latitude,
    longitude,
  } = createOrgBodySchema.parse(request.body)

  try {
    const createOrgUseCase = makeCreateOrgUseCase()

    await createOrgUseCase.execute({
      name,
      author_name,
      email,
      whatsapp,
      password,
      cep,
      state,
      city,
      neighborhood,
      street,
      latitude,
      longitude,
    })
  } catch (error) {
    if (error instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }

  return reply.status(201).send()
}
