import { hash } from "bcryptjs"
import { prisma } from "../lib/prisma"
import { OrgsRepository } from "../repositories/orgs.repository"
import { OrgAlreadyExistsError } from "./errors/org-already-exists.error"

interface CreateOrgUseCaseRequest {
  name: string
  author_name: string
  email: string
  whatsapp: string
  password: string
  cep: string
  state: string
  city: string
  neighborhood: string
  street: string
  latitude: number
  longitude: number
}

interface CreateOrgUseCaseResponse {}

export class CreateOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    name,
    author_name,
    email,
    whatsapp,
    password,
    cep,
    state,
    city,
    neighborhood,
    street,
    latitude,
    longitude,
  }: CreateOrgUseCaseRequest) {
    const password_hash = await hash(password, 6)

    const orgWithSameEmail = await this.orgsRepository.findByEmail(email)

    if (orgWithSameEmail) {
      throw new OrgAlreadyExistsError()
    }

    await this.orgsRepository.create({
      name,
      author_name,
      email,
      whatsapp,
      password_hash,
      cep,
      state,
      city,
      neighborhood,
      street,
      latitude,
      longitude,
    })
  }
}
