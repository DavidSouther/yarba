describe("Recipe Functional Tests", () => {
  it("connects to the recipe app", () => {
    cy.visit("http://recipes:3000/");

    cy.title().should("contain", "Recipes");
  });
});
