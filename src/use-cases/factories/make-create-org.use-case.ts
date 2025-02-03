import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs.repository"
import { CreateOrgUseCase } from "../create-org.use-case"

export function makeCreateOrgUseCase() {
  const prismaOrgsRepository = new PrismaOrgsRepository()
  const createOrgUseCase = new CreateOrgUseCase(prismaOrgsRepository)

  return createOrgUseCase
}
