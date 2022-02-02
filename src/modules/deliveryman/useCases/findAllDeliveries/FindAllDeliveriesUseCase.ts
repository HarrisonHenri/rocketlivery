import { prisma } from "../../../../database/prismaClient";

export class FindAllDeliveriesUseCase {
  async execute(id: string) {
    return prisma.deliveryman.findMany({
      where: {
        id
      },
      select: {
        deliveries: true,
        username: true,
        id: true
      }
    });
  }
}