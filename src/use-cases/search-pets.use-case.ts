import { Pet } from "@prisma/client"

import { PetsRepository } from "@/repositories/pets.repository"

interface SearchPetsUseCaseRequest {
  city: string
  age?: string
  size?: string
  energy_level?: string
  environment?: string
}

interface SearchPetsUseCaseResponse {
  pets: Pet[]
}

export class SearchPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    age,
    energy_level,
    environment,
    size,
  }: SearchPetsUseCaseRequest): Promise<SearchPetsUseCaseResponse> {
    const pets = await this.petsRepository.findAll({
      city,
      age,
      size,
      energy_level,
      environment,
    })

    return { pets }
  }
}
