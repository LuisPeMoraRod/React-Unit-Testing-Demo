import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import App from "./App";

const timeout = 30000;
jest.setTimeout(timeout);

test("renders loading page", () => {
  render(<App />);
  // Checks that SW logo appears and also loading spinner
  expect(screen.getByRole("img")).toBeInTheDocument();
  expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
});

test("waits until loading spinner dissapears", async () => {
  render(<App />);
  // Waits for the loading spinner to disappear
  await waitForElementToBeRemoved(
    () => screen.queryByTestId("loading-spinner"),
    { timeout: timeout }
  );
});

test("waits until text, dropdown and info card appears", async () => {
  render(<App />);
  // elements not visible
  const introText = screen.queryByTestId("header-text");
  expect(introText).toBeNull(); // it doesn't exist
  const dropdown = screen.queryByText("Luke Skywalker");
  expect(dropdown).toBeNull();

  // dissappearance of spinner
  await waitForElementToBeRemoved(
    () => screen.queryByTestId("loading-spinner"),
    { timeout: timeout }
  );
  expect(screen.getByTestId("header-text")).toBeInTheDocument();
  expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();

});
