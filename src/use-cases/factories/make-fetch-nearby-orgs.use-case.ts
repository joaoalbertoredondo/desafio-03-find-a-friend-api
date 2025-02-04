import { FetchNearbyOrgsUseCase } from "../fetch-nearby-orgs.use-case"
import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs.repository"

export function makeFetchNearbyOrgsUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  const fetchNearbyOrgsUseCase = new FetchNearbyOrgsUseCase(orgsRepository)

  return fetchNearbyOrgsUseCase
}
