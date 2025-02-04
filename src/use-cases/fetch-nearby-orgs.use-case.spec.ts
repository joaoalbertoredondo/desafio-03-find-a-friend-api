import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs.repository"
import { beforeEach, describe, expect, it } from "vitest"
import { FetchNearbyOrgsUseCase } from "./fetch-nearby-orgs.use-case"
import { hash } from "bcryptjs"

let orgsRepository: InMemoryOrgsRepository
let sut: FetchNearbyOrgsUseCase

describe("Fetch Nearby Orgs Use Case", () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new FetchNearbyOrgsUseCase(orgsRepository)
  })

  it("should be able to fetch nearby orgs", async () => {
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
      latitude: -233111552,
      longitude: -459964416,
    })

    await orgsRepository.create({
      name: "Random Org2",
      author_name: "John Doe",
      email: "random.organization@example.com",
      whatsapp: "12990908767",
      password_hash: await hash("123456", 6),
      cep: "12345-345",
      state: "Any State",
      city: "Random Town",
      neighborhood: "Any Neighborhood",
      street: "Any Street",
      latitude: -234754888,
      longitude: -46499924,
    })

    const nearbyOrgs = await sut.execute({
      userLatitude: org.latitude.toNumber(),
      userLongitude: org.longitude.toNumber(),
    })

    expect(nearbyOrgs.orgs).toHaveLength(1)
  })
})
