import Content from "components/content";
import NewRecipeForm from "views/forms/recipe_new";
import { NextPage } from "next";

const NewRecipe: NextPage = () => (
  <Content title="New Recipe">
    <NewRecipeForm />
  </Content>
);

export default NewRecipe;
