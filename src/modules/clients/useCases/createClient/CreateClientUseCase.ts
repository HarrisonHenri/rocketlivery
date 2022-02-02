import { prisma } from "../../../../database/prismaClient";
import { hash } from "bcrypt";

interface IRequest {
  username: string;
  password: string;
}

export class CreateClientUseCase {
  async execute({ username, password: unHashedPassword }: IRequest) {
    const clientExists = await prisma.clients.findFirst({
      where: {
        username: {
          equals: username,
          mode: 'insensitive'
        }
      }
    });

    if (clientExists) {
      throw new Error("Client already exists");
    }

    const password = await hash(unHashedPassword, 10);

    return prisma.clients.create({
      data: {
        username,
        password
      }
    });
  }
}