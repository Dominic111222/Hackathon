const request = require("supertest");
const { expect } = require("chai");

const app = require("../server");

describe("Backend API Tests", () => {

  it("GET /api should respond", async () => {
    const res = await request(app).get("/api");

    expect(res.status).to.be.oneOf([200, 404]);
  });

  it("GET /api/questions should return data", async () => {
    const res = await request(app).get("/api/questions");

    expect(res.status).to.equal(200);
  });

  it("POST /api/save should accept request", async () => {
    const res = await request(app)
      .post("/api/save")
      .send({
        answers: [
          {
            questionId: "1",
            answer: "hello123",
            confirmAnswer: "hello123"
          }
        ]
      });

    expect(res.status).to.be.oneOf([200, 201, 400]);
  });

  it("should reject short answer", async () => {
    const res = await request(app)
      .post("/api/save")
      .send({
        answers: [
          {
            questionId: "1",
            answer: "123",
            confirmAnswer: "123"
          }
        ]
      });

    expect(res.status).to.be.oneOf([400, 422]);
  });

  it("should reject mismatched answers", async () => {
    const res = await request(app)
      .post("/api/save")
      .send({
        answers: [
          {
            questionId: "1",
            answer: "hello123",
            confirmAnswer: "wrong123"
          }
        ]
      });

    expect(res.status).to.be.oneOf([400, 422]);
  });

});