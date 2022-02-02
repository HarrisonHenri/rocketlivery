import { prisma } from "../../../../database/prismaClient";

interface IRequest {
  id_delivery: string;
  id_deliveryman: string;
}

export class UpdateEndDateUseCase {
  async execute({ id_delivery, id_deliveryman }: IRequest) {
    return prisma.deliveries.updateMany({
      where: {
        id: id_delivery,
        id_deliveryman
      },
      data: {
        id_deliveryman,
        end_at: new Date()
      }
    });
  }
}