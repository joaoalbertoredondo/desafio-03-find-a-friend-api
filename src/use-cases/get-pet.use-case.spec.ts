import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets.repository"
import { beforeEach, describe, expect, it } from "vitest"
import { GetPetUseCase } from "./get-pet.use-case"
import { PetNotFoundError } from "./errors/pet-not-found.error"

let petsRepository: InMemoryPetsRepository
let sut: GetPetUseCase

describe("Get Pet Use Case", () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetUseCase(petsRepository)
  })

  it("should be able to get a pet", async () => {
    const createdPet = await petsRepository.create({
      name: "Bilú",
      about: "Muito fofo",
      age: "4",
      size: "médio",
      energy_level: "medium",
      environment: "outdoor",
      org_id: crypto.randomUUID(),
    })

    const { pet } = await sut.execute({
      id: createdPet.id,
    })

    expect(pet.id).toEqual(expect.any(String))
    expect(pet.name).toEqual("Bilú")
  })

  it("should not be able to get a non-existing pet", async () => {
    await expect(() => 
      sut.execute({
        id: "non-existing-id",
      })
    ).rejects.toBeInstanceOf(PetNotFoundError)
  })
})
