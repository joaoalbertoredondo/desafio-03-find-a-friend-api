import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs.repository"
import { AuthenticateOrgUseCase } from "@/use-cases/authenticate-org.use-case"
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials.error"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function authenticateOrgController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authenticateOrgBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateOrgBodySchema.parse(request.body)

  try {
    const orgsRepository = new PrismaOrgsRepository()
    const authenticateOrgUseCase = new AuthenticateOrgUseCase(orgsRepository)

    await authenticateOrgUseCase.execute({
      email,
      password,
    })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }

  return reply.status(200).send()
}
