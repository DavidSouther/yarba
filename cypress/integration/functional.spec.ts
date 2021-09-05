describe("Recipe Functional Tests", () => {
  it("connects to the recipe app", () => {
    cy.visit("http://recipe:8080/");

    cy.title().should("contain.text", "Recipes");
  });
});
