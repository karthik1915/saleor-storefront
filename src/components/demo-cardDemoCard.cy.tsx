import React from "react";
import DemoCard from "./demo-card";

describe("<DemoCard />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<DemoCard data="Testing" />);
  });
});
