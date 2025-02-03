import { OrgsRepository } from "@/repositories/orgs.repository"
import { PetsRepository } from "@/repositories/pets.repository"
import { Pet } from "@prisma/client"

interface CreatePetUseCaseRequest {
  name: string
  about: string
  age: string
  size: string
  energy_level: string
  environment: string
  org_id: string
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(
    private orgsRepository: OrgsRepository,
    private petsRepository: PetsRepository
  ) {}

  async execute({
    name,
    about,
    age,
    size,
    energy_level,
    environment,
    org_id,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const org = await this.orgsRepository.findByEmail(org_id)

    if (!org) {
      throw new Error() // fix me!
    }

    const pet = await this.petsRepository.create({
      name,
      about,
      age,
      size,
      energy_level,
      environment,
      org_id,
    })

    return {
      pet,
    }
  }
}
