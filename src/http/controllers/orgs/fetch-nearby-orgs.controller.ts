import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

import { makeFetchNearbyOrgsUseCase } from "@/use-cases/factories/make-fetch-nearby-orgs.use-case"

const nearbyOrgsQuerySchema = z.object({
  latitude: z.coerce.number().refine((value) => {
    return Math.abs(value) <= 90
  }),
  longitude: z.coerce.number().refine((value) => {
    return Math.abs(value) <= 180
  }),
})

export async function fetchNearbyOrgsController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { latitude, longitude } = nearbyOrgsQuerySchema.parse(request.query)

  const fetchNearbyOrgsUseCase = makeFetchNearbyOrgsUseCase()

  const { orgs } = await fetchNearbyOrgsUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(200).send({
    orgs,
  })
}
