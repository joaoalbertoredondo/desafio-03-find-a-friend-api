import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { prisma } from "../../../lib/prisma"

export async function createOrgController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const bodySchema = z.object({
    name: z.string(),
    author_name: z.string(),
    email: z.string(),
    whatsapp: z.string(),
    password: z.string(),
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
    cep,
    city,
    latitude,
    longitude,
    neighborhood,
    password,
    state,
    street,
    whatsapp,
  } = bodySchema.parse(request.body)

  await prisma.org.create({
    data: {
      author_name,
      cep,
      city,
      email,
      latitude,
      longitude,
      name,
      neighborhood,
      password,
      state,
      street,
      whatsapp,
    },
  })

  return reply.status(201).send()
}
