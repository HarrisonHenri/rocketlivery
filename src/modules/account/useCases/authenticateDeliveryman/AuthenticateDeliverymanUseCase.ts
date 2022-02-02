import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { prisma } from "../../../../database/prismaClient";

interface IRequest {
  password: string;
  username: string;
}

export class AuthenticateDeliverymanUseCase {
  async execute({ username, password }: IRequest) {
    const deliveryman = await prisma.deliveryman.findFirst({
      where: {
        username
      }
    });

    if (!deliveryman) throw new Error("Username or password incorrects");

    const passwordMatch = await compare(password, deliveryman.password);

    if (!passwordMatch) throw new Error("Username or password incorrects");

    const token = sign({}, "cf28eec1d0ba20e2e7de63cda6c5c140", {
      subject: deliveryman.id,
      expiresIn: "1d",
    });

    return {
      token,
    };
  }
}
