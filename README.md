# YARBA - Yet Another Recipe Book App

YARBA is a no-nonsense, self service recipe book app.
It's main purpose is as a meal planning tool.
Users select recipes from the list, generating a "meal", and then scale the meal to a number of desired servings.
The app then creates a shopping list of the needed ingredients.

## User Journeys

### Showing recipes
The home page shows a list of recipes.
Clicking a recipe takes the user to the recipe page.
The recipe page shows servings, ingredients, and instructions.

### Creating a recipe
Creating a recipe has a form with the recipe name, number of servings when made as instructed, a repeated list of ingredients, and a free-text instructions field.
The repeated list of ingredients lets users select ingredients from other recipes, or create a new ingredient.
Ingredients have a measurement type and an amount for the recipe as written.

### Scaling a recipe
Viewing a recipe the servings display is editable.
Editing the servings changes the ingredients quantity.
Editing the ingredientes quantity changes the servings and other quantities.
Ingredient scaling has an option to snap some items, like eggs, to nearest whole amount.

### Selecting recipes for the meal
Recipes have an "Add to meal" button in the list and on the page.
Viewing the meal shows the recipes selected.
The meal view has a summary of all ingredients for all recipes.
Recipes can be expanded in the page individually.
Recipes can be removed individually, and a "Clear meal" button removes all recipes.

### Creating a shopping list
Viewing a meal shows a Servings input.
Changing the number of servings scales the ingredients for each recipe.
Clicking "Shopping List" generates a shopping list view.

### Searching by ingredients
An ingredients page shows all ingredients used in any recipe.
This table can be filtered by ingredient name, and rows can be selected.
A second list shows recipes with all ingredients that are selected.
Recipes in this list can be added to the meal.

### Calorie Estimator
Using FDA or Weight Watchers API to pull calories for ingredients, display an estimated calories per serving.

## Developing

Local development can happen entirely with the `dev` docker-compose profile.
Otherwise, run `npm run dev` in the [yarba](./yarba) folder.
Unit tests in `npm run test:watch`.
Integration test run with `docker-compose run cypress`, or can be watched with `docker-compose up --profile ci cypress-open`.