import { hashPassword, createJwt, comparePassword } from "../modules/auth";
import { Error, Next, Request, Response } from "../types";
import { prisma } from "../utils";

export const createNewUser = async (
  req: Request,
  res: Response,
  next: Next
) => {
  try {
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: await hashPassword(req.body.password),
      },
    });
    const token = createJwt(user);
    res.json({ token });
  } catch (error) {
    (error as Error).type = "input";
    next(error);
  }
};

export const signin = async (req: Request, res: Response, next: Next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { username: req.body.username },
    });

    if (!user) return;

    const isValid = await comparePassword(req.body.password, user.password);

    if (!isValid) {
      res.status(401);
      res.send("Invalid username or password");
      return;
    }

    const token = createJwt(user);
    res.json({ token });
  } catch (error) {
    (error as Error).type = "input";
    next(error);
  }
};
