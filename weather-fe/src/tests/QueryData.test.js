import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import QueryData from "../components/QueryData";

describe("QueryData Component", () => {
  test("renders the component and handles form submission", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ result: "Mocked sensor data" }),
      })
    );

    render(<QueryData />);

    fireEvent.change(screen.getByLabelText(/sensor ids/i), {
      target: { value: "1,2,3" },
    });
    fireEvent.change(screen.getByLabelText(/metrics/i), {
      target: { value: "temperature,humidity" },
    });
    fireEvent.change(screen.getByLabelText(/statistic/i), {
      target: { value: "average" },
    });
    fireEvent.change(screen.getByLabelText(/date range/i), {
      target: { value: "7" },
    });

    fireEvent.click(screen.getByText(/submit/i));
    await screen.findByText(/queried data/i);
    expect(screen.getByText(/result:/i)).toBeInTheDocument();
    expect(screen.getByText(/Mocked sensor data/i)).toBeInTheDocument();
  });
});
