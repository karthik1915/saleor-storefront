import { appData } from "../data";

describe("The Home Page", () => {
  it("successfully loads", () => {
    cy.visit("http://localhost:3000");
  });

  it("should verify the app content", () => {
    cy.visit("http://localhost:3000");
    cy.get("h1").should("contain.text", appData.name);
  });
});
