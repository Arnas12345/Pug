import chai from "chai";
import chaiHttp from "chai-http";
import express from "express";
import {
  addSensorDataToDB,
  querySensorDataInDB,
} from "../controllers/sensorController.js";

const app = express();

app.use(express.json());

chai.use(chaiHttp);
const expect = chai.expect;

describe("Controller Tests", () => {
  describe("addSensorDataToDB", () => {
    it("should add sensor data to the database and return a 201 status", (done) => {
      const req = {
        body: {
          sensorId: "1",
          temperature: "18",
          humidity: "10",
          windSpeed: "5",
        },
      };

      const res = {
        status: (statusCode) => {
          expect(statusCode).to.equal(201);
          return res;
        },
        json: (result) => {
          expect(result.message).to.equal("Sensor data added successfully");
          done();
        },
      };

      addSensorDataToDB(req, res);
    });

    describe("throw 400 status code", () => {
      describe("sensorId", () => {
        it("should return a 400 status code if the sensorId param is invalid", (done) => {
          const req = {
            body: {
              sensorId: "acb",
              temperature: "18",
              humidity: "10",
              windSpeed: "5",
            },
          };

          const res = {
            status: (statusCode) => {
              expect(statusCode).to.equal(400);
              return res;
            },
            json: (result) => {
              expect(result.error).to.equal("Sensor body params are invalid");
              done();
            },
          };

          addSensorDataToDB(req, res);
        });

        it("should return a 400 status code if the sensorId param is empty", (done) => {
          const req = {
            body: {
              sensorId: "",
              temperature: "18",
              humidity: "10",
              windSpeed: "5",
            },
          };

          const res = {
            status: (statusCode) => {
              expect(statusCode).to.equal(400);
              return res;
            },
            json: (result) => {
              expect(result.error).to.equal("Sensor body params are invalid");
              done();
            },
          };

          addSensorDataToDB(req, res);
        });
      });

      describe("temperature", () => {
        it("should return a 400 status code if the temperature param is invalid", (done) => {
          const req = {
            body: {
              sensorId: "1",
              temperature: "abc",
              humidity: "10",
              windSpeed: "5",
            },
          };

          const res = {
            status: (statusCode) => {
              expect(statusCode).to.equal(400);
              return res;
            },
            json: (result) => {
              expect(result.error).to.equal("Sensor body params are invalid");
              done();
            },
          };

          addSensorDataToDB(req, res);
        });

        it("should return a 400 status code if the temperature param is empty", (done) => {
          const req = {
            body: {
              sensorId: "1",
              temperature: "",
              humidity: "10",
              windSpeed: "5",
            },
          };

          const res = {
            status: (statusCode) => {
              expect(statusCode).to.equal(400);
              return res;
            },
            json: (result) => {
              expect(result.error).to.equal("Sensor body params are invalid");
              done();
            },
          };

          addSensorDataToDB(req, res);
        });
      });

      describe("humiditiy", () => {
        it("should return a 400 status code if the humidity param is invalid", (done) => {
          const req = {
            body: {
              sensorId: "1",
              temperature: "15",
              humidity: "abc",
              windSpeed: "5",
            },
          };

          const res = {
            status: (statusCode) => {
              expect(statusCode).to.equal(400);
              return res;
            },
            json: (result) => {
              expect(result.error).to.equal("Sensor body params are invalid");
              done();
            },
          };

          addSensorDataToDB(req, res);
        });

        it("should return a 400 status code if the humidity param is empty", (done) => {
          const req = {
            body: {
              sensorId: "1",
              temperature: "20",
              humidity: "",
              windSpeed: "5",
            },
          };

          const res = {
            status: (statusCode) => {
              expect(statusCode).to.equal(400);
              return res;
            },
            json: (result) => {
              expect(result.error).to.equal("Sensor body params are invalid");
              done();
            },
          };

          addSensorDataToDB(req, res);
        });
      });

      describe("windSpeed", () => {
        it("should return a 400 status code if the windSpeed param is invalid", (done) => {
          const req = {
            body: {
              sensorId: "1",
              temperature: "15",
              humidity: "10",
              windSpeed: "abc",
            },
          };

          const res = {
            status: (statusCode) => {
              expect(statusCode).to.equal(400);
              return res;
            },
            json: (result) => {
              expect(result.error).to.equal("Sensor body params are invalid");
              done();
            },
          };

          addSensorDataToDB(req, res);
        });

        it("should return a 400 status code if the windSpeed param is empty", (done) => {
          const req = {
            body: {
              sensorId: "1",
              temperature: "20",
              humidity: "10",
              windSpeed: "",
            },
          };

          const res = {
            status: (statusCode) => {
              expect(statusCode).to.equal(400);
              return res;
            },
            json: (result) => {
              expect(result.error).to.equal("Sensor body params are invalid");
              done();
            },
          };

          addSensorDataToDB(req, res);
        });
      });
    });
  });

  describe("querySensorDataInDB", () => {
    it("should query sensor data from the database", (done) => {
      const req = {
        query: {
          sensorIds: "1,2,3",
          metrics: "temperature,humidity",
          statistic: "average",
          dateRange: "7",
        },
      };

      const res = {
        status: (statusCode) => {
          expect(statusCode).to.equal(200);
          return res;
        },
        json: (result) => {
          expect(result).to.be.an("object");
          done();
        },
      };

      querySensorDataInDB(req, res);
    });

    describe("throw 500 status code", () => {
      const res = {
        status: (statusCode) => {
          expect(statusCode).toEqual(500);
          return res;
        },
        json: (result) => {
          expect(result.error).toEqual("Failed to fetch data");
          done();
        },
      };

      const queryData = (req, errorMessage, done) => {
        try {
          querySensorDataInDB(req, res);
        } catch (error) {
          expect(error.message).to.equal(errorMessage);
          done();
        }
      };

      describe("sensorIds", () => {
        it("should return a 500 status code and throw an error if the sensorIds param is invalid", (done) => {
          const req = {
            query: {
              sensorIds: "1,2,3,abc",
              metrics: "temperature,humidity",
              statistic: "average",
              dateRange: "7",
            },
          };

          queryData(req, "SensorIds should be an array of numbers", done);
        });

        it("should return a 500 status code and throw an error if the sensorIds param is empty", (done) => {
          const req = {
            query: {
              sensorIds: "",
              metrics: "temperature,humidity",
              statistic: "average",
              dateRange: "7",
            },
          };

          queryData(req, "SensorIds should be an array of numbers", done);
        });
      });

      describe("metrics", () => {
        it("should return a 500 status code and throw an error if the metrics param is invalid", (done) => {
          const req = {
            query: {
              sensorIds: "1,2,3",
              metrics: "temperature,humidity,abc",
              statistic: "average",
              dateRange: "7",
            },
          };

          queryData(req, "Invalid metrics provided", done);
        });

        it("should return a 500 status code and throw an error if the metrics param is empty", (done) => {
          const req = {
            query: {
              sensorIds: "1,2",
              metrics: "",
              statistic: "average",
              dateRange: "7",
            },
          };

          queryData(req, "Invalid metrics provided", done);
        });
      });

      describe("statistic", () => {
        it("should return a 500 status code and throw an error if the statistic param is invalid", (done) => {
          const req = {
            query: {
              sensorIds: "1,2,3",
              metrics: "temperature,humidity",
              statistic: "abc",
              dateRange: "7",
            },
          };

          queryData(req, "Invalid statistic provided", done);
        });

        it("should return a 500 status code and throw an error if the statistic param is empty", (done) => {
          const req = {
            query: {
              sensorIds: "1,2",
              metrics: "temperature",
              statistic: "",
              dateRange: "7",
            },
          };

          queryData(req, "Invalid statistic provided", done);
        });
      });

      describe("dateRange", () => {
        it("should return a 500 status code and throw an error if the dateRange param is invalid", (done) => {
          const req = {
            query: {
              sensorIds: "1,2,3",
              metrics: "temperature,humidity",
              statistic: "max",
              dateRange: "abc",
            },
          };

          queryData(req, "Invalid dateRange provided", done);
        });

        it("should return a 500 status code and throw an error if the dateRange param is empty", (done) => {
          const req = {
            query: {
              sensorIds: "1,2",
              metrics: "temperature",
              statistic: "min",
              dateRange: "",
            },
          };

          queryData(req, "Invalid dateRange provided", done);
        });
      });
    });
  });
});
