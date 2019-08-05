import React from "react";
import { render, fireEvent } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  beforeAll(() => {
    window.getSelection = () => {
      return {
        removeAllRanges: () => {}
      };
    };
  });

  it("should allow signing in", async () => {
    const { debug, getByTestId, getByText } = render(<App />);

    const signInButton = await getByTestId("btn-sign-in");

    fireEvent.click(signInButton);

    await getByText("Harry Potter");

    const signOutButton = await getByTestId("btn-sign-out");

    fireEvent.click(signOutButton);

    await getByText("Login");
  });
});
