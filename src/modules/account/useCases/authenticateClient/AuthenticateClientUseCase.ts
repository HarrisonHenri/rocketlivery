import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { prisma } from "../../../../database/prismaClient";

interface IRequest {
  password: string;
  username: string;
}

export class AuthenticateClientUseCase {
  async execute({ username, password }: IRequest) {
    const client = await prisma.clients.findFirst({
      where: {
        username
      }
    });

    if (!client) throw new Error("Username or password incorrects");

    const passwordMatch = await compare(password, client.password);

    if (!passwordMatch) throw new Error("Username or password incorrects");

    const token = sign({}, "de63cda6c5c140cf28eec1d0ba20e2e7", {
      subject: client.id,
      expiresIn: "1d",
    });

    return {
      token,
    };
  }
}
