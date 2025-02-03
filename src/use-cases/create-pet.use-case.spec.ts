import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets.repository"
import { beforeEach, describe, expect, it } from "vitest"
import { CreatePetUseCase } from "./create-pet.use-case"
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs.repository"
import { hash } from "bcryptjs"

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let sut: CreatePetUseCase

describe("Create Pet Use Case", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository()
    sut = new CreatePetUseCase(orgsRepository, petsRepository)
  })

  it("should be able to create a pet", async () => {
    const org = await orgsRepository.create({
      name: "Random Org",
      author_name: "John Doe",
      email: "random.organization@example.com",
      whatsapp: "12990908767",
      password_hash: await hash("123456", 6),
      cep: "12345-345",
      state: "Any State",
      city: "Random Town",
      neighborhood: "Any Neighborhood",
      street: "Any Street",
      latitude: 233111552,
      longitude: 459964416,
    })

    const { pet } = await sut.execute({
      name: "Bilú",
      about: "Muito fofo",
      age: "4",
      size: "médio",
      energy_level: "medium",
      environment: "outdoor",
      org_id: org.id,
    })

    expect(petsRepository.items).toHaveLength(1)
    expect(pet.id).toEqual(expect.any(String))
  })
})
