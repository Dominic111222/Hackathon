import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";

jest.setTimeout(10000);

beforeEach(() => {
  window.alert = jest.fn();

  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: async () => [
        { id: "1", text: "What is your pet name?" },
        { id: "2", text: "What is your first school?" }
      ]
    })
  );
});

afterEach(() => {
  jest.resetAllMocks();
});

test("renders questions from API", async () => {
  render(<App />);

  expect(
    await screen.findByText(/pet name/i)
  ).toBeInTheDocument();
});

test("updates answer input", async () => {
  render(<App />);

  const inputs = await screen.findAllByPlaceholderText(/answer/i);

  fireEvent.change(inputs[0], { target: { value: "hello123" } });

  expect(inputs[0].value).toBe("hello123");
});

test("shows alert when no question selected", async () => {
  render(<App />);

  const btn = await screen.findByText(/save answers/i);

  fireEvent.click(btn);

  expect(window.alert).toHaveBeenCalledWith(
    "Please select a question for Row 1"
  );
});

test("shows alert for short answer", async () => {
  render(<App />);

  const dropdowns = await screen.findAllByRole("combobox");
  const answers = await screen.findAllByPlaceholderText(/answer/i);

  fireEvent.change(dropdowns[0], { target: { value: "1" } });
  fireEvent.change(answers[0], { target: { value: "123" } });

  fireEvent.click(screen.getByText(/save answers/i));

  await waitFor(() => {
    expect(window.alert).toHaveBeenCalledWith(
      "Answer 1 must be at least 5 characters long."
    );
  });
});

test("shows mismatch alert", async () => {
  render(<App />);

  const dropdowns = await screen.findAllByRole("combobox");
  const answers = await screen.findAllByPlaceholderText(/answer/i);
  const confirm = await screen.findAllByPlaceholderText(/confirm/i);

  fireEvent.change(dropdowns[0], { target: { value: "1" } });
  fireEvent.change(answers[0], { target: { value: "hello123" } });
  fireEvent.change(confirm[0], { target: { value: "wrong123" } });

  fireEvent.click(screen.getByText(/save answers/i));

  await waitFor(() => {
    expect(window.alert).toHaveBeenCalledWith(
      "Row 1 Error: Answer and Confirm Answer do not match!"
    );
  });
});