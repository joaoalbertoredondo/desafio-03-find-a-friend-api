import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { CreateOrgUseCase } from "../../../use-cases/create-org.use-case"
import { PrismaOrgsRepository } from "../../../repositories/prisma/prisma-orgs.repository"
import { OrgAlreadyExistsError } from "../../../use-cases/errors/org-already-exists.error"

export async function createOrgController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const bodySchema = z.object({
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
  } = bodySchema.parse(request.body)

  try {
    const prismaOrgsRepository = new PrismaOrgsRepository()
    const createOrgUseCase = new CreateOrgUseCase(prismaOrgsRepository)

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
