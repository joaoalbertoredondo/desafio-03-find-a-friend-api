import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets.repository"
import { CreatePetUseCase } from "../create-pet.use-case"
import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs.repository"

export function makeCreatePetUseCase() {
  const prismaPetsRepository = new PrismaPetsRepository()
  const prismaOrgsRepository = new PrismaOrgsRepository()

  const createPetUseCase = new CreatePetUseCase(
    prismaOrgsRepository,
    prismaPetsRepository
  )

  return createPetUseCase
}
