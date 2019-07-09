import React from "react";
import { render, fireEvent, waitForDomChange } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("should allow signing in", async () => {
    const { debug, getByTestId, getByText } = render(<App />);

    const signInButton = await getByTestId("btn-sign-in");

    fireEvent.click(signInButton);

    await getByText("Harry Potter");

    const signOutButton = await getByTestId("btn-sign-out");

    fireEvent.click(signOutButton);

    await getByText("Login");

    debug();
  });
});
