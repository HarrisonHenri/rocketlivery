import { prisma } from "../../../../database/prismaClient";
import { hash } from "bcrypt";

interface IRequest {
  username: string;
  password: string;
}

export class CreateDeliverymanUseCase {
  async execute({ username, password: unHashedPassword }: IRequest) {
    const deliverymanExists = await prisma.deliveryman.findFirst({
      where: {
        username: {
          equals: username,
          mode: 'insensitive'
        }
      }
    });

    if (deliverymanExists) {
      throw new Error("Deliveryman already exists");
    }

    const password = await hash(unHashedPassword, 10);

    return prisma.deliveryman.create({
      data: {
        username,
        password
      }
    });
  }
}