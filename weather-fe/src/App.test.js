import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders WeatherApp title", () => {
  render(<App />);
  const title = screen.getByText(/Weather App/i);
  expect(title).toBeInTheDocument();
});
