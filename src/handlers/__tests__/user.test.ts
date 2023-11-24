import { Request, Response } from "../../types";
import * as user from "../users";

describe("user handlers", () => {
  it("should create a new user", async () => {
    const req = { body: { username: "hello", password: "world" } };
    const res = {
      JSON({ token }: any) {
        expect(token).toBeTruthy();
      },
    };
    await user.createNewUser(req as Request, res as any, () => {});
  });
});
