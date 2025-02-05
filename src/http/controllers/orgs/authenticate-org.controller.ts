import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials.error"
import { makeAuthenticateOrgUseCase } from "@/use-cases/factories/make-authenticate-org.use-case"

const authenticateOrgBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export async function authenticateOrgController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { email, password } = authenticateOrgBodySchema.parse(request.body)

  const authenticateOrgUseCase = makeAuthenticateOrgUseCase()

  try {
    const { org } = await authenticateOrgUseCase.execute({
      email,
      password,
    })

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: org.id,
        },
      }
    )

    return reply.status(200).send({ token })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
