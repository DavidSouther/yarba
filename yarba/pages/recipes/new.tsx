import Content from "components/content";
import NewRecipeForm from "components/forms/recipe_new";
import { NextPage } from "next";

const NewRecipe: NextPage = () => (
  <Content title="New Recipe">
    <NewRecipeForm />
  </Content>
);

export default NewRecipe;
