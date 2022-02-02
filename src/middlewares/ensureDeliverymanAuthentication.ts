import { Response, Request, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { prisma } from "../database/prismaClient";


export async function ensureDeliverymanAuthentication(
  request: Request,
  _: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) throw new Error("Token missing");

  const [, token] = authHeader.split(" ");

  try {
    const { sub: id_deliveryman } = verify(token, "cf28eec1d0ba20e2e7de63cda6c5c140");

    const client = await prisma.deliveryman.findFirst({
      where: {
        id: id_deliveryman as string
      }
    });

    if (!client) throw new Error("Deliveryman does not exists");

    request.id_deliveryman = id_deliveryman as string;

    next();
  } catch {
    throw new Error("Invalid token");
  }
}
