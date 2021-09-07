describe("Recipe UI Tests", () => {
  beforeEach(() => {
    cy.visit("http://recipes:3000/");
  });

  it("connects to the recipe app", () => {
    cy.title().should("contain", "Recipes");
  });

  it("creates recipes", () => {
    cy.get(".nav").contains("New Recipe").click();
    cy.location("pathname").should("be", "/recipes/new");
    cy.get("input[name=recipe-name]").type("Chicken");
    cy.get("form[action=#create]").submit();
    cy.location("pathname").should("be", "/");
    cy.get(".recipe-list").contains("Chicken");
  });

  it("shows recipes");
  it("scales a recipe");
  it("selects recipes for a meal");
  it("creates a shopping list for a meal");
  it("searches for recipes by ingredient");
});

describe("Recipe API Tests", () => {
  it("LISTs ingredients");
  it("POSTs recipes");
  it("LISTs recipes");
  it("LISTs recipes by ingredient");
  it("GETs a recipe with a servings query parameter");
  it("PUTs recipes for a meal");
  it("GETs a shopping list for a meal with a servigs query parameter");
});
