import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs.repository"
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets.repository"
import { beforeEach, describe, expect, it } from "vitest"
import { SearchPetsUseCase } from "./search-pets.use-case"
import { hash } from "bcryptjs"

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let sut: SearchPetsUseCase

describe("Search Pets Use Case", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new SearchPetsUseCase(petsRepository)
  })

  it("should be able to search pets by city", async () => {
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

    await petsRepository.create({
      name: "Bilú",
      about: "Muito fofo",
      age: "4",
      size: "medium",
      energy_level: "medium",
      environment: "outdoor",
      org_id: org.id,
    })

    await petsRepository.create({
      name: "Bala",
      about: "Bonzinho",
      age: "2",
      size: "small",
      energy_level: "high",
      environment: "outdoor",
      org_id: org.id,
    })

    const org2 = await orgsRepository.create({
      name: "Random Org2",
      author_name: "Kyle",
      email: "random.organization2@example.com",
      whatsapp: "12990908767",
      password_hash: await hash("123123", 6),
      cep: "12345-345",
      state: "Any State",
      city: "Random City",
      neighborhood: "Any Neighborhood",
      street: "Any Street",
      latitude: 233111552,
      longitude: 459964416,
    })

    await petsRepository.create({
      name: "Filó",
      about: "calma",
      age: "7",
      size: "small",
      energy_level: "low",
      environment: "outdoor",
      org_id: org2.id,
    })

    const { pets } = await sut.execute({ city: org.city })

    const { pets: pets2 } = await sut.execute({ city: org2.city })

    expect(pets).toHaveLength(2)
    expect(pets2).toHaveLength(1)
  })

  it("should be able to search pets by city and age", async () => {
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

    await petsRepository.create({
      name: "Bilú",
      about: "Muito fofo",
      age: "4",
      size: "medium",
      energy_level: "medium",
      environment: "outdoor",
      org_id: org.id,
    })

    await petsRepository.create({
      name: "Bala",
      about: "Bonzinho",
      age: "2",
      size: "small",
      energy_level: "high",
      environment: "outdoor",
      org_id: org.id,
    })

    const { pets } = await sut.execute({ city: org.city, age: "4" })

    expect(pets).toHaveLength(1)
  })

  it("should be able to search pets by city and size", async () => {
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

    await petsRepository.create({
      name: "Bilú",
      about: "Muito fofo",
      age: "4",
      size: "medium",
      energy_level: "medium",
      environment: "outdoor",
      org_id: org.id,
    })

    await petsRepository.create({
      name: "Bala",
      about: "Bonzinho",
      age: "2",
      size: "small",
      energy_level: "high",
      environment: "outdoor",
      org_id: org.id,
    })

    const { pets } = await sut.execute({ city: org.city, size: "medium" })

    expect(pets).toHaveLength(1)
  })

  it("should be able to search pets by city and energy level", async () => {
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

    await petsRepository.create({
      name: "Bilú",
      about: "Muito fofo",
      age: "4",
      size: "medium",
      energy_level: "medium",
      environment: "outdoor",
      org_id: org.id,
    })

    await petsRepository.create({
      name: "Bala",
      about: "Bonzinho",
      age: "2",
      size: "small",
      energy_level: "high",
      environment: "outdoor",
      org_id: org.id,
    })

    const { pets } = await sut.execute({ city: org.city, energy_level: "high" })

    expect(pets).toHaveLength(1)
  })

  it("should be able to search pets by city and environment", async () => {
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

    await petsRepository.create({
      name: "Bilú",
      about: "Muito fofo",
      age: "4",
      size: "medium",
      energy_level: "medium",
      environment: "outdoor",
      org_id: org.id,
    })

    await petsRepository.create({
      name: "Bala",
      about: "Bonzinho",
      age: "2",
      size: "small",
      energy_level: "high",
      environment: "outdoor",
      org_id: org.id,
    })

    const { pets } = await sut.execute({ city: org.city, environment: "outdoor" })

    expect(pets).toHaveLength(2)
  })
})
