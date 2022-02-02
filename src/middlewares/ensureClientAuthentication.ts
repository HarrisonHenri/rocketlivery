import { Response, Request, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { prisma } from "../database/prismaClient";


export async function ensureClientAuthentication(
  request: Request,
  _: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) throw new Error("Token missing");

  const [, token] = authHeader.split(" ");

  try {
    const { sub: id_client } = verify(token, "de63cda6c5c140cf28eec1d0ba20e2e7");

    const client = await prisma.clients.findFirst({
      where: {
        id: id_client as string
      }
    });

    if (!client) throw new Error("Client does not exists");

    request.id_client = id_client as string;

    next();
  } catch {
    throw new Error("Invalid token");
  }
}
