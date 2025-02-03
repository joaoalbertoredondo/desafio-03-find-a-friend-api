import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials.error"
import { makeAuthenticateOrgUseCase } from "@/use-cases/factories/make-authenticate-org-use-case"
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
    const authenticateOrgUseCase = makeAuthenticateOrgUseCase()

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
