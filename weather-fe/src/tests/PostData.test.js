import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import PostData from "../components/PostData";

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
  })
);

describe("PostData Component", () => {
  test("submits sensor data successfully", async () => {
    render(<PostData />);

    fireEvent.change(screen.getByLabelText(/sensor id/i), {
      target: { value: "123" },
    });
    fireEvent.change(screen.getByLabelText(/temperature/i), {
      target: { value: "25" },
    });
    fireEvent.change(screen.getByLabelText(/humidity/i), {
      target: { value: "50" },
    });
    fireEvent.change(screen.getByLabelText(/windspeed/i), {
      target: { value: "10" },
    });
    fireEvent.click(screen.getByText(/submit/i));

    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:8000/api/sensor-data",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sensorId: "123",
          temperature: "25",
          humidity: "50",
          windSpeed: "10",
        }),
      }
    );
  });
});
