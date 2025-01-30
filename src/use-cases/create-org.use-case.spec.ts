import { describe, expect, it } from "vitest"
import { CreateOrgUseCase } from "./create-org.use-case"
import { compare } from "bcryptjs"
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs.repository"
import { OrgAlreadyExistsError } from "./errors/org-already-exists.error"

describe("Create Org Use Case", () => {
  it("should be able to register", async () => {
    const orgsRepository = new InMemoryOrgsRepository()
    const createOrgUseCase = new CreateOrgUseCase(orgsRepository)

    const { org } = await createOrgUseCase.execute({
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
      latitude: 233111552,
      longitude: 459964416,
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it("should hash org password upon registration", async () => {
    const orgsRepository = new InMemoryOrgsRepository()
    const createOrgUseCase = new CreateOrgUseCase(orgsRepository)

    const { org } = await createOrgUseCase.execute({
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
      latitude: 233111552,
      longitude: 459964416,
    })

    const isPasswordCorrectlyHashed = await compare("123456", org.password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it("should not be able to register with same email twice", async () => {
    const orgsRepository = new InMemoryOrgsRepository()
    const createOrgUseCase = new CreateOrgUseCase(orgsRepository)

    const email = "random.organization@example.com"

    await createOrgUseCase.execute({
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
      latitude: 233111552,
      longitude: 459964416,
    })

    await expect(() =>
      createOrgUseCase.execute({
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
        latitude: 233111552,
        longitude: 459964416,
      })
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })
})
