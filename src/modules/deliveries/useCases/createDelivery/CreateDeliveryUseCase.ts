import { prisma } from "../../../../database/prismaClient";

interface IRequest {
  item_name: string;
  id_client: string;
}

export class CreateDeliveryUseCase {
  async execute({ item_name, id_client }: IRequest) {
    return prisma.deliveries.create({
      data: {
        item_name,
        id_client
      }
    });
  }
}