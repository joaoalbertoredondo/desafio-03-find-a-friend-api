import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function getPetController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const getPetBodySchema = z.object({
    id: z.string(),
  })

  await request.jwtVerify()

  console.log(request.user.sub)

  return reply.status(200).send()
}
