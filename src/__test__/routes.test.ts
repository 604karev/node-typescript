import app from "../server";
import supertest from "supertest";

describe("GET /", () => {
  it("should return some data", async () => {
    const res = await supertest(app).get("/");
    expect(res.body.message).toBe("hello world");
  });
});

describe("POST /signin", function () {
  it("responds with json", async () => {
    const res = await supertest(app)
      .post("/signin")
      .send({ username: "hellodrsdaddd", password: "holad" })
      .set("Accept", "application/json");

    expect(res.headers["content-type"]).toEqual("application/json; charset=utf-8");
    expect(res.status).toEqual(200);
  });
});
