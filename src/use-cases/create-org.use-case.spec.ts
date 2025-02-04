import { beforeEach, describe, expect, it } from "vitest"
import { CreateOrgUseCase } from "./create-org.use-case"
import { compare } from "bcryptjs"
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs.repository"
import { OrgAlreadyExistsError } from "./errors/org-already-exists.error"

let orgsRepository: InMemoryOrgsRepository
let sut: CreateOrgUseCase

describe("Create Org Use Case", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new CreateOrgUseCase(orgsRepository)
  })

  it("should be able to create an org", async () => {
    const { org } = await sut.execute({
      name: "Random Org",
      author_name: "John Doe",
      email: "random.organization@example.com",
      whatsapp: "12990908767",
      password: "123456",
      cep: "12345-345",
      state: "Any State",
      city: "Random Town",
      neighborhood: "Any Neighborhood",
      street: "Any Street",
      latitude: -233111552,
      longitude: -459964416,
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it("should hash org password upon registration", async () => {
    const { org } = await sut.execute({
      name: "Random Org",
      author_name: "John Doe",
      email: "random.organization@example.com",
      whatsapp: "12990908767",
      password: "123456",
      cep: "12345-345",
      state: "Any State",
      city: "Random Town",
      neighborhood: "Any Neighborhood",
      street: "Any Street",
      latitude: -233111552,
      longitude: -459964416,
    })

    const isPasswordCorrectlyHashed = await compare("123456", org.password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it("should not be able to register with same email twice", async () => {
    const email = "random.organization@example.com"

    await sut.execute({
      name: "Random Org",
      author_name: "John Doe",
      email,
      whatsapp: "12990908767",
      password: "123456",
      cep: "12345-345",
      state: "Any State",
      city: "Random Town",
      neighborhood: "Any Neighborhood",
      street: "Any Street",
      latitude: -233111552,
      longitude: -459964416,
    })

    await expect(() =>
      sut.execute({
        name: "Random Org",
        author_name: "John Doe",
        email,
        whatsapp: "12990908767",
        password: "123456",
        cep: "12345-345",
        state: "Any State",
        city: "Random Town",
        neighborhood: "Any Neighborhood",
        street: "Any Street",
        latitude: -233111552,
        longitude: -459964416,
      })
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })
})
