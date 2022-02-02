import "express-async-errors";
import express, { NextFunction, Request, Response } from "express";
import { routes } from "./routes";

const app = express();

app.use(express.json());
app.use(routes);

app.use((err: Error, _: Request, response: Response, __: NextFunction) => {
  if (err instanceof Error) {
    return response.status(400).json({ message: err.message });
  }

  return response
    .status(500)
    .json({ message: "Internal server error" });
});

app.listen(3000)