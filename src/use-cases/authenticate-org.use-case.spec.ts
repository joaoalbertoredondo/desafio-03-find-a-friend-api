import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs.repository"
import { beforeEach, describe, expect, it } from "vitest"
import { AuthenticateOrgUseCase } from "./authenticate-org.use-case"
import { hash } from "bcryptjs"
import { InvalidCredentialsError } from "./errors/invalid-credentials.error"

let orgsRepository: InMemoryOrgsRepository
let sut: AuthenticateOrgUseCase

describe("Authenticate Org Use Case", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateOrgUseCase(orgsRepository)
  })

  it("should be able to authenticate", async () => {
    await orgsRepository.create({
      name: "Random Org",
      author_name: "John Doe",
      email: "random_org@example.com",
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

    const { org } = await sut.execute({
      email: "random_org@example.com",
      password: "123456",
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it("should not be able to authenticate with wrong email", async () => {
    expect(() =>
      sut.execute({
        email: "random_org@example.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it("should not be able to authenticate with wrong password", async () => {
    await orgsRepository.create({
      name: "Random Org",
      author_name: "John Doe",
      email: "random_org@example.com",
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

    expect(() =>
      sut.execute({
        email: "random_org@example.com",
        password: "123123",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
